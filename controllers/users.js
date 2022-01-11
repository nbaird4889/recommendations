const express = require('express');
const usersRouter = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

//LOGIN ROUTES
usersRouter.get("/", (req, res) => {
    res.render("home")
})

usersRouter.get("/login", (req, res) => {
    res.render("users/login")
})

usersRouter.post("/login", (req, res) => {
   User.findOne({email: req.body.email}, (error, user) => {
       if(!user) return res.render("users/login", {error: "invalid credentials"});
       const isMatched = bcrypt.compareSync(req.body.password, user.password);
       if(!isMatched) return res.render("users/login", {error: "invalid credentials"})
       req.session.user = user._id
       res.redirect("/")
   })
})

usersRouter.get("/logout", (req,res) => {
    req.session.destroy(function() {
        res.redirect("/")
    })
})

//SIGN UP ROUTES
usersRouter.get('/signup', (req, res) => {
    res.render('users/signup');
});

usersRouter.post("/signup", (req, res) => {
    User.create(req.body, (err, user) => {
        res.redirect("/login");
    })
})


module.exports = usersRouter;