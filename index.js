// Import the modules we need
var express = require ('express')
var session = require('express-session');
var validator = require ('express-validator');
const expressSanitizer = require('express-sanitizer');
var ejs = require('ejs')
var bodyParser= require ('body-parser')
var bcrypt = require('bcrypt');
// Create the express application object
const app = express()
const port = 8000
const mysql = require('mysql');
app.use(bodyParser.urlencoded({ extended: true }))
const db = mysql.createConnection ({
host: 'localhost',
user: 'appuser',
password: 'app2027',
database: 'LondonRatings',
});

db.connect((err) => {
 if (err) {
throw err;
}
console.log('Connected to database');
});
global.db = db;
// Set up css
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }

  }));
  app.use(expressSanitizer());
// Set the directory where Express will pick up HTML files
// __dirname will get the current directory
app.set('views', __dirname + '/views');

// Tell Express that we want to use EJS as the templating engine
app.set('view engine', 'ejs');

// Tells Express how we should process html files
// We want to use EJS's rendering engine
app.engine('html', ejs.renderFile);
app.use(bodyParser.urlencoded({ extended: true }));
// Define our data
var shopData = {shopName: "London ratings forums"}

// Requires the main.js file inside the routes folder passing in the Express app and data as arguments.  All the routes will go in this file
require("./routes/main")(app, shopData);

// Start the web app listening
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
