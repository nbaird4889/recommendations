//DEPENDENCIES
const express = require("express");
const app = express()
const morgan = require("morgan")
const methodOverride = require("method-override")
const mongoose = require('mongoose')
require('dotenv').config()
app.set('view engine', 'ejs')

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
app.use(express.urlencoded({ extended: true }));

//ROUTES and CONTROLLERS
app.get("/", (req, res) => {
    res.render("home")
})

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

//LISTENER
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("I'm listening")
})