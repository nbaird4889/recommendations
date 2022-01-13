const express = require('express');
const usersRouter = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const auth = require("../middleware/auth")
const Book = require("../models/book")
const Dawg = require("../models/dawg")
const Recipe = require("../models/recipe")
const Restaurant = require("../models/restaurant")
const Show = require("../models/show")

//LOGIN ROUTES
usersRouter.get("/", (req, res) => {
    res.render("home")
})

usersRouter.get("/login", (req, res) => {
    res.render("users/login", {error: ''})
})

usersRouter.post("/login", (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if(!user) return res.render("users/login", {error: "invalid credentials"});

        const isMatched = bcrypt.compareSync(req.body.password, user.password);
        if(!isMatched) return res.render("users/login", {error: "invalid credentials"});

        req.session.user = user._id;
        res.redirect("/dashboard");
    })
})

//SIGN UP ROUTES
usersRouter.get('/signup', (req, res) => {
    res.render('users/signup');
});

usersRouter.post("/signup", (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(12));
    User.create(req.body, (err, user) => {
        res.redirect("/login");
    })
})

//LOGOUT ROUTE
usersRouter.get('/logout', (req, res) => {
    req.session.destroy(function() {
        res.redirect('/login');
    });
});

//DASHBOARD ROUTE
usersRouter.get("/dashboard", auth.isAuthenticated, (req, res) => {
    Book.find({createdBy: req.user._id}, (err, foundBooks) => {
        Dawg.find({createdBy: req.user._id}, (err, foundDawgs) => {
            res.render("dashboard", {
                books: foundBooks,
                dawgs: foundDawgs
            });
        })
    });
});


module.exports = usersRouter;