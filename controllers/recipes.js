const express = require("express")
const recipesRouter = express.Router()
const Recipe = require("../models/recipe")

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
recipesRouter.get("/new", (req, res) => {
    res.render("recipes/new")
})

//DELETE
recipesRouter.delete("/:id", (req, res) => {
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
    Recipe.create(req.body, (error, createdBook) => {
        res.redirect("/recipes")
    })
})

//EDIT
recipesRouter.get("/:id/edit", (req, res) => {
    Recipe.findById(req.params.id, (error, foundRecipe) => {
        res.render("recipes/edit.ejs", {
            recipe: foundRecipe,
        })
    })
})

//SHOW
recipesRouter.get("/:id", (req, res) => {
    Recipe.findById(req.params.id, (err, foundRecipe) => {
        res.render("recipes/show.ejs", {
            recipe: foundRecipe,
        })
    })
})

module.exports = recipesRouter