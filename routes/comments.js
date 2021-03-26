const express = require("express");
const router = express.Router();
const Comments = require("./../models/Comments");
const User = require("./../models/User");
const isLoggedIn = require("./../middlewares/isLoggedIn")

router.get("/", isLoggedIn, (req, res, next) => {
  Comments.find()
  .then((comments) => {
    res.status(200).json(comments)
    })
    .catch(next);
});

router.post("/new/:id", isLoggedIn, (req, res, next) => {
  const { content } = req.body;
  const newComment = {
    content,
    user: req.session.currentUser._id,
    placeMuseum: req.params.id,
    placeMonument: req.params.id
  };
  Comments.create(newComment)
    .then((createdComment) => {
        const comId = createdComment._id
        User.findByIdAndUpdate({_id: req.session.currentUser._id}, {$push: {comments: comId}}, {new: true})
        .then((comRes) => {
            res.status(200).json(comRes);
        })
    })
    .catch(next);
});

router.patch("/edit/:id", isLoggedIn, (req, res, next) => {
  const { content } = req.body;
  Comments.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then((updatedComment) => {
      res.status(200).json(updatedComment);
    })
    .catch(next);
});

router.delete("/delete/:id", isLoggedIn, (req, res, next) => {
  Comments.findByIdAndDelete(req.params.id)
    .then((response) => {
      res.status(200).json({ message: "Successfully deleted"})
    })
    .catch(next);
});

router.get("/:id", isLoggedIn, (req, res, next) => {
  Comments.findById(req.params.id)
  .populate("user")
  .populate("placeMuseum")
  .populate("placeMonument")
    .then((comment) => {
      res.status(200).json(comment);
    })
    .catch(next);
});

module.exports = router;
