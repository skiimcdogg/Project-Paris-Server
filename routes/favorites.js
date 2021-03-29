const express = require("express");
const router = express.Router();
const Favorites = require("./../models/Favorites");
const User = require("./../models/User");
const isLoggedIn = require("./../middlewares/isLoggedIn")

router.get("/", isLoggedIn, (req, res, next) => {
  Favorites.find()
    .populate("favMuseums")
    .populate("favMonuments")
  .then((fav) => {
    res.status(200).json(fav)
    })
    .catch(next);
});

router.post("/add/:id", isLoggedIn, (req, res, next) => {
  const newFav = {
    favMuseums: req.params.id,
    favMonuments: req.params.id
  };
  Favorites.create(newFav)
    .then((createdFav) => {
        const favId = createdFav._id
        User.findByIdAndUpdate({_id: req.session.currentUser._id}, {$push: {favorites: favId}}, {new: true})
        .then((favRes) => {
            res.status(200).json(favRes);
        })
    })
    .catch(next);
});

// {$pull: {members: {tweetID: '5327010328645530500'}}}

router.delete("/delete/:id", isLoggedIn, (req, res, next) => {
  Favorites.findByIdAndDelete(req.params.id)
    .then((response) => {
        User.findByIdAndUpdate({_id: req.session.currentUser._id}, {$pull: {favorites: {id: req.params.id}}})
        res.status(200).json({ message: "Successfully deleted"})
    })
    .catch(next);
});

// router.get("/:id", isLoggedIn, (req, res, next) => {
//   Favorites.findById(req.params.id)
//   .populate("favMuseums")
//   .populate("favMonuments")
//     .then((comment) => {
//       res.status(200).json(comment);
//     })
//     .catch(next);
// });

module.exports = router;
