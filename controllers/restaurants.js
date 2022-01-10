const express = require("express")
const restaurantRouter = express.Router()
const Restaurant = require("../models/restaurant")

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
restaurantRouter.get("/new", (req, res) => {
    res.render("restaurants/new")
})

//DELETE
restaurantRouter.delete("/:id", (req, res) => {
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
    Restaurant.create(req.body, (error, createdRestaurant) => {
        res.redirect("/restaurants")
    })
})

//EDIT
restaurantRouter.get("/:id/edit", (req, res) => {
    Restaurant.findById(req.params.id, (error, foundRestaurant) => {
        res.render("restaurants/edit.ejs", {
            restaurant: foundRestaurant,
        })
    })
})

//SHOW
restaurantRouter.get("/:id", (req, res) => {
    Restaurant.findById(req.params.id, (err, foundRestaurant) => {
        res.render("restaurants/show.ejs", {
            restaurant: foundRestaurant,
        })
    })
})


module.exports = restaurantRouter