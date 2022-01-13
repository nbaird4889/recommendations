const express = require("express")
const dawgsRouter = express.Router()
const Dawg = require("../models/dawg")
const auth = require("../middleware/auth")
const User = require('../models/user');

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
dawgsRouter.get("/new", auth.isAuthenticated, (req, res) => {
    res.render("dawgs/new")
})

//DELETE
dawgsRouter.delete("/:id", auth.isAuthenticated, (req, res) => {
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
    req.body.createdBy = req.user._id;
    Dawg.create(req.body, (error, createdDawg) => {
        res.redirect("/dawgs")
    })
})

//EDIT
dawgsRouter.get("/:id/edit", auth.isAuthenticated, (req, res) => {
    Dawg.findById(req.params.id, (error, foundDawg) => {
        res.render("dawgs/edit.ejs", {
            dawg: foundDawg,
        })
    })
})

//SHOW
dawgsRouter.get("/:id", (req, res) => {
    Dawg.findById(req.params.id).populate("createdBy").exec((err, foundDawg) => {
        res.render("dawgs/show", { 
            dawg: foundDawg,
        });
    })
})

module.exports = dawgsRouter