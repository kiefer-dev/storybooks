const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      //options to get rid of warnings in the console
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (err) { //if something goes wrong and we can't connect
    console.error(err) //log the error
    process.exit(1) //stop the process and exit with failure
  }
}

module.exports = connectDB //now we can use this in the app.js file