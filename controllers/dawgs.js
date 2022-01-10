const express = require("express")
const dawgsRouter = express.Router()
const Dawg = require("../models/dawg")

//ROUTES
//INDEX
dawgsRouter.get('/', (req, res) => {
	Dawg.find({}, (error, allDawgs) => {
		res.render('dawgs/index', {
			dawgs: allDawgs,  
		});
	});
});

//NEW
dawgsRouter.get("/new", (req, res) => {
    res.render("dawgs/new")
})

//DELETE
dawgsRouter.delete("/:id", (req, res) => {
    Dawg.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect("/dawgs")
    })
})

//UPDATE
dawgsRouter.put("/:id", (req, res) => {
    Dawg.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true},
      (error, updatedBook) => {
        res.redirect(`/dawgs/${req.params.id}`)
      }
    )
})

//CREATE
dawgsRouter.post("/", (req, res) => {
    Dawg.create(req.body, (error, createdDawg) => {
        res.redirect("/dawgs")
    })
})

//EDIT
dawgsRouter.get("/:id/edit", (req, res) => {
    Dawg.findById(req.params.id, (error, foundDawg) => {
        res.render("dawgs/edit.ejs", {
            dawg: foundDawg,
        })
    })
})

//SHOW
dawgsRouter.get("/:id", (req, res) => {
    Dawg.findById(req.params.id, (err, foundDawg) => {
        res.render("dawgs/show.ejs", {
            dawg: foundDawg,
        })
    })
})

module.exports = dawgsRouter