const express = require("express")
const recipesRouter = express.Router()
const Recipe = require("../models/recipe")
const auth = require("../middleware/auth")
const User = require('../models/user');

//ROUTES
//INDEX
recipesRouter.get('/', (req, res) => {
	Recipe.find({}, (error, allRecipes) => {
		res.render('recipes/index', {
			recipes: allRecipes,  
		});
	});
});

//NEW
recipesRouter.get("/new", auth.isAuthenticated, (req, res) => {
    res.render("recipes/new")
})

//DELETE
recipesRouter.delete("/:id", auth.isAuthenticated, (req, res) => {
    Recipe.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect("/recipes")
    })
})

//UPDATE
recipesRouter.put("/:id", (req, res) => {
    Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true},
      (error, updatedRecipe) => {
        res.redirect(`/recipes/${req.params.id}`)
      }
    )
})

//CREATE
recipesRouter.post("/", (req, res) => {
    req.body.createdBy = req.user._id;
    Recipe.create(req.body, (error, createdBook) => {
        res.redirect("/recipes")
    })
})

//EDIT
recipesRouter.get("/:id/edit", auth.isAuthenticated, (req, res) => {
    Recipe.findById(req.params.id, (error, foundRecipe) => {
        res.render("recipes/edit.ejs", {
            recipe: foundRecipe,
        })
    })
})

//SHOW
recipesRouter.get("/:id", (req, res) => {
    Recipe.findById(req.params.id).populate("createdBy").exec((err, foundRecipe) => {
        res.render("recipes/show", { 
            recipe: foundRecipe,
        });
    })
})

module.exports = recipesRouter