npm i express mongoose connect-mongo express-session express-handlebars dotenv method-override moment morgan passport passport-google-oauth20
npm i -D nodemon cross-env



Add to scripts in package.json:
  "start": "cross-env NODE_ENV=production node app",
  "dev": "cross-env NODE_ENV=development nodemon app"

Add port and mongo connection string to config.env. This lets you use variables from the config.env file using process.env.~

Set up db.js file

Template engine (handlebars): a layout that wraps around everything, the layout has an HTML and body tag and stuff that you don't want to repeat for different views and wraps around those views.