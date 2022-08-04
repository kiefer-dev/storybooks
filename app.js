const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const connectDB = require('./config/db')

// Load config
dotenv.config({ path: './config/config.env' })

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

// Routes
app.use('/', require('./routes/index'))

const PORT = process.env.PORT || 3000 //using process.env lets you access variables that are in the config.env file

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)