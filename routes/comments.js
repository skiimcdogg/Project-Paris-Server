const express = require("express");
const router = express.Router();
const Comments = require("./../models/Comments");
const User = require("./../models/User");

router.post("/new/:id", (req, res, next) => {
//   const { content } = req.body;
// console.log("resmachin", req.session.currentUser._id);
//   const newComment = {
//     content,
//     user: req.session.currentUser._id,
//     places: { Monuments: req.params.id, Museums: req.params.id },
//   };

let newVisit = {...req.body};
  newVisit._user = req.session.currentUser._id;

  Comments.create(newVisit)
    .then((createdVisit) => {
      res.status(200).json(createdVisit);
    })
    .catch(next);
});

module.exports = router;
