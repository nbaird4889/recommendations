//DEPENDENCIES
const express = require("express");
const app = express()
const morgan = require("morgan")
const methodOverride = require("method-override")
const mongoose = require('mongoose')
const expressSession = require('express-session');
require('dotenv').config()
app.set('view engine', 'ejs')
const auth = require("./middleware/auth")

//DATABASE CONNECTION
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// Middleware
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(expressSession({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(express.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.locals.error = '';
    next();
});

app.use(auth.handleLoggedInUser);

//ROUTES and CONTROLLERS
const booksController = require("./controllers/books");
app.use("/books", booksController)

const showsController = require("./controllers/shows");
app.use("/shows", showsController)

const restaurantsController = require("./controllers/restaurants");
app.use("/restaurants", restaurantsController)

const recipesController = require("./controllers/recipes");
app.use("/recipes", recipesController)

const dawgsController = require("./controllers/dawgs");
app.use("/dawgs", dawgsController)

const usersController = require('./controllers/users');
app.use('/', usersController);

//LISTENER
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("I'm listening")
})