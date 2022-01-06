const express = require("express")
const booksRouter = express.Router()
const Book = require("../models/book")

//ROUTES
booksRouter.get("/", (req, res) => {
    res.render("home")
})

//INDEX
booksRouter.get('/books', (req, res) => {
	Book.find({}, (error, allBooks) => {
		res.render('book_index', {
			books: allBooks,  
		});
	});
});

//NEW
booksRouter.get("/books/new", (req, res) => {
    res.render("book_new")
})

//CREATE
booksRouter.post("/books", (req, res) => {
    Book.create(req.body, (error, createdBook) => {
        res.redirect("/books")
    })
})


module.exports = booksRouter