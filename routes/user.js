const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const router = express.Router();
const protectAdmin = require("./../middlewares/protectAdminRoute");
const User = require("./../models/User");
const UserModel = require("./../models/User");

router.get("/", protectAdmin, (req, res, next) => { // For the admin to retrieve all the users.
  UserModel.find()
    .then((usersRes) => {
      res.status(200).json({ usersRes });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:id", isLoggedIn, (req, res, next) => { // For a user to retrieve his account page.
  const foundUser = req.params.id;
  const connectedUser = req.session.currentUser._id;

  if (foundUser == connectedUser) {
    UserModel.findById(req.params.id)
      .then((userRes) => {
        res.status(200).json({ userRes });
      })
      .catch((err) => {
        next(err);
      });
  } else {
      res.status(400).json({message: "it's not your account"})
  }
});

router.delete("/delete/:id", isLoggedIn, (req, res, next) => { 
    UserModel.findByIdAndDelete(req.params.id)
    .then(() => {
        res.status(200).json({message: "User Deleted"})
    })
    .catch((err) => {
        next(err)
    })
})

module.exports = router;
