const express = require('express');
const dotenv = require('dotenv');

// Load config
dotenv.config({ path: './config/config.env' });

// Initialize app
const app = express();

const PORT = process.env.PORT || 3000; //using process.env lets you access variables that are in the config.env file

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);