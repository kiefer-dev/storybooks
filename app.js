const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const connectDB = require('./config/db')

// Load config
dotenv.config({ path: './config/config.env' })

// Passport config
require('./config/passport')(passport)

// Call the db to connect
connectDB()

// Initialize app
const app = express()

// If you're running in dev mode, log extra info to the console
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Handlebars
app.engine('.hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', '.hbs')

// Sessions middleware
app.use(session({
  secret: 'keyboard cat',
  resave: false, //don't resave if nothing is changed
  saveUninitialized: false, //don't create session until something is stored
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Set path to Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))


const PORT = process.env.PORT || 3000 //using process.env lets you access variables that are in the config.env file

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)