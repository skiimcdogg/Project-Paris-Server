const express = require("express");
const router = express.Router();
const Favorites = require("./../models/Favorites");
const User = require("./../models/User");
const isLoggedIn = require("./../middlewares/isLoggedIn")

// router.get("/", isLoggedIn, (req, res, next) => {
//   Favorites.find()
//     .populate("favMuseums")
//     .populate("favMonuments")
//   .then((fav) => {
//     res.status(200).json(fav)
//     })
//     .catch(next);
// });

router.post("/add/:id", isLoggedIn, async (req, res, next) => {
  const newFav = {
    favMuseums: req.params.id,
    favMonuments: req.params.id
  };
  try{
  let createdFav = await Favorites.create(newFav)
  const favId = createdFav._id
  let updatedUser = await User.findByIdAndUpdate({_id: req.session.currentUser._id}, {$push: {favorites: favId}}, {new: true}).select("-password")
  updatedUser = await updatedUser.populate({
    path: "favorites",
    populate: {
      path: "favMuseums favMonuments"
    }
  }).execPopulate()
   res.status(200).json(updatedUser);
    }
    catch (err) {
      next(err);
    }
});

router.delete("/delete/:id", (req, res, next) => {
  Favorites.findByIdAndDelete(req.params.id)
    .then((response) => {
      res.status(200).json(response)
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
