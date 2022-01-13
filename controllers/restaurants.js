const express = require("express")
const restaurantRouter = express.Router()
const Restaurant = require("../models/restaurant")
const auth = require("../middleware/auth")
const User = require('../models/user')

//ROUTES
//INDEX
restaurantRouter.get('/', (req, res) => {
    Restaurant.find({}, (error, allRestaurants) => {
        res.render('restaurants/index', {
            restaurants: allRestaurants,  
		});
	});
});

//NEW
restaurantRouter.get("/new", auth.isAuthenticated, (req, res) => {
    res.render("restaurants/new")
})

//DELETE
restaurantRouter.delete("/:id", auth.isAuthenticated, (req, res) => {
    Restaurant.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect("/restaurants")
    })
})

//UPDATE
restaurantRouter.put("/:id", (req, res) => {
    Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true},
      (error, updatedRestaurant) => {
        res.redirect(`/restaurants/${req.params.id}`)
      }
    )
})

//CREATE
restaurantRouter.post("/", (req, res) => {
    req.body.createdBy = req.user._id;
    Restaurant.create(req.body, (error, createdRestaurant) => {
        res.redirect("/restaurants")
    })
})

//EDIT
restaurantRouter.get("/:id/edit", auth.isAuthenticated, (req, res) => {
    Restaurant.findById(req.params.id, (error, foundRestaurant) => {
        res.render("restaurants/edit.ejs", {
            restaurant: foundRestaurant,
        })
    })
})

//SHOW
restaurantRouter.get("/:id", (req, res) => {
    Restaurant.findById(req.params.id).populate("createdBy").exec((err, foundRestaurant) => {
        res.render("restaurants/show", { 
            restaurant: foundRestaurant,
        });
    })
})


module.exports = restaurantRouter