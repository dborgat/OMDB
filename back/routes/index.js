const express = require("express");
const passport = require("passport");
const User = require("../models/Users");
const Movie = require("../models/Movies");
const router = express.Router();

/*
  ALL YOUR ROUTES HERE!
*/

router.post("/register", (req, res) => {
  User.create(req.body).then((user) => {
    res.status(201).send(user);
  });
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.send(req.user);
});


router.post("/logout", (req, res) => {
  req.logOut();
  res.sendStatus(200);
});

router.get("/me", (req, res) => {
  if (!req.user) {
    return res.sendStatus(401);
  }

  res.send(req.user);
});

router.post(`/favorites/:id`, (req, res) => {
  console.log('--------->' , req.body);
  req.params.id
  Movie.findOne({where:{title:req.body.title,userId:req.params.id}})
  .then(favorite=>{
    favorite ? res.send('is already in favorites') : Movie.create(req.body,{include:{model:User, as:'user'}}).then(data => res.send(data)); 
  })
});
router.get(`/favorites`, (req, res) => {
  req.user ? Movie.findAll().then((data)=> res.send(data)) :  res.sendStatus(401);
});

// Don´t modify this route, keep it at the bottom.
router.use("/", function (req, res) {
  res.sendStatus(404);
});

module.exports = router;