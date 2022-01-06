//DEPENDENCIES
const express = require("express");
const app = express()

const morgan = require("morgan")

const methodOverride = require("method-override")

const mongoose = require('mongoose')
require('dotenv').config()

app.set('view engine', 'ejs')

//DATABASE CONNECTION
const { PORT = 3000, DATABASE_URL} = process.env;
mongoose.connect(DATABASE_URL);

// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// Middleware
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

//ROUTES and CONTROLLERS
const usersController = require("./controllers/books");
app.use("/", usersController)

//LISTENER
app.listen(PORT, () => {
    console.log("I'm listening")
})