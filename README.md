npm i express mongoose connect-mongo express-session express-handlebars dotenv method-override moment morgan passport passport-google-oauth20
npm i -D nodemon cross-env

Add to scripts in package.json:
  "start": "cross-env NODE_ENV=production node app",
  "dev": "cross-env NODE_ENV=development nodemon app"

Add port and mongo connection string to config.env. This lets you use variables from the config.env file using process.env.~

