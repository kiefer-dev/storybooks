const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/db')


// Load config
dotenv.config({ path: './config/config.env' })

// Passport config
require('./config/passport')(passport)

// Call the db to connect
connectDB()

// Initialize app
const app = express()

// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Method override
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    let method = req.body._method
    delete req.body._method
    return method
  }
}))

// If you're running in dev mode, log extra info to the console
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Handlebars Helpers
const { formatDate, stripTags, truncate, editIcon, select } = require('./helpers/hbs')


// Handlebars
app.engine(
  '.hbs',
  exphbs.engine({
    helpers: { 
      formatDate,
      stripTags,
      truncate,
      editIcon,
      select,
    },
    defaultLayout: 'main',
    extname: '.hbs'
  })
)
app.set('view engine', '.hbs')

// Sessions middleware
app.use(
  session({
    secret: 'keyboard cat',
    resave: false, //don't resave if nothing is changed
    saveUninitialized: false, //don't create session until something is stored
    store: MongoStore.create({ 
      mongoUrl: process.env.MONGO_URI
      // https://stackoverflow.com/questions/66654037/mongo-connect-error-with-mongo-connectsession
    })
  })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Set global variable
app.use(function (req, res, next) {
  res.locals.user = req.user || null
  next()
})

// Set path to Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/stories'))



const PORT = process.env.PORT || 3000 //using process.env lets you access variables that are in the config.env file

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)