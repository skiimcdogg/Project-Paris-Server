const express = require("express");
const router = express.Router();
const Comments = require("./../models/Comments");
const User = require("./../models/User");
const isLoggedIn = require("./../middlewares/isLoggedIn")

router.post("/new/:id", isLoggedIn, (req, res, next) => {
  const { content } = req.body;
  const newComment = {
    content,
    user: req.session.currentUser,
    places: { Monuments: req.params.id, Museums: req.params.id },
  };
  Comments.create(newComment)
    .then((createdComment) => {
        const comId = createdComment._id
        User.findOneAndUpdate({id: req.session.currentUser._id}, {$push: {comments: comId}}, {new: true})
        .then((comRes) => {
            res.status(200).json(comRes);
        })
    })
    .catch(next);
});

module.exports = router;
