const express = require("express")
const booksRouter = express.Router()
const Book = require("../models/book")

//ROUTES
booksRouter.get("/", (req, res) => {
    res.render("home")
})

//INDEX
booksRouter.get("/books", (req, res) => {
    res.render("book_index")
})



module.exports = booksRouter