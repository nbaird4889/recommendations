const express = require("express")
const booksRouter = express.Router()
const Book = require("../models/book")

//ROUTES
//INDEX
booksRouter.get('/', (req, res) => {
	Book.find({}, (error, allBooks) => {
		res.render('books/index', {
			books: allBooks,  
		});
	});
});

//NEW
booksRouter.get("/new", (req, res) => {
    res.render("books/new")
})

//DELETE
booksRouter.delete("/:id", (req, res) => {
    Book.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect("/books")
    })
})

//UPDATE
booksRouter.put("/:id", (req, res) => {
    Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true},
      (error, updatedBook) => {
        res.redirect(`/books/${req.params.id}`)
      }
    )
})

//CREATE
booksRouter.post("/", (req, res) => {
    Book.create(req.body, (error, createdBook) => {
        res.redirect("/books")
    })
})

//EDIT
booksRouter.get("/:id/edit", (req, res) => {
    Book.findById(req.params.id, (error, foundBook) => {
        res.render("books/edit.ejs", {
            book: foundBook,
        })
    })
})

//SHOW
booksRouter.get("/:id", (req, res) => {
    Book.findById(req.params.id, (err, foundBook) => {
        res.render("books/show.ejs", {
            book: foundBook,
        })
    })
})

module.exports = booksRouter