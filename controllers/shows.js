const express = require("express")
const showRouter = express.Router()
const Show = require("../models/show")
const auth = require("../middleware/auth")
const User = require('../models/user')


//ROUTES
//INDEX
showRouter.get('/', (req, res) => {
    Show.find({}, (error, allShows) => {
        res.render('shows/index', {
            shows: allShows,  
		});
	});
});

//NEW
showRouter.get("/new", (req, res) => {
    res.render("shows/new")
})

//DELETE
showRouter.delete("/:id", (req, res) => {
    Show.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect("/shows")
    })
})

//UPDATE
showRouter.put("/:id", (req, res) => {
    Show.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true},
      (error, updatedshow) => {
        res.redirect(`/shows/${req.params.id}`)
      }
    )
})

//CREATE
showRouter.post("/", (req, res) => {
    req.body.createdBy = req.user._id;
    Show.create(req.body, (error, createdshow) => {
        res.redirect("/shows")
    })
})

//EDIT
showRouter.get("/:id/edit", (req, res) => {
    Show.findById(req.params.id, (error, foundShow) => {
        res.render("shows/edit.ejs", {
            show: foundShow,
        })
    })
})

//SHOW
showRouter.get("/:id", (req, res) => {
    Show.findById(req.params.id).populate("createdBy").exec((err, foundShow) => {
        res.render("shows/show", { 
            show: foundShow,
        });
    })
})

module.exports = showRouter