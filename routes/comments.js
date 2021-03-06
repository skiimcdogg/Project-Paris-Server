const express = require("express");
const router = express.Router();
const Comments = require("./../models/Comments");
const User = require("./../models/User");
const isLoggedIn = require("./../middlewares/isLoggedIn")

router.get("/", (req, res, next) => {
  Comments.find()
  .populate("user")
  .then((comments) => {
    console.log(comments);
    res.status(200).json(comments)
    })
    .catch(next);
});

router.post("/new/monument/:id", isLoggedIn, async (req, res, next) => {
 
  const { content,rating } = req.body;
  const newComment = {
    content,
    rating,
    user: req.session.currentUser._id,
    placeMuseum: null,
    placeMonument: req.params.id
  };
  try{
  let createdComment = await Comments.create(newComment)
  createdComment = await createdComment.populate('user').execPopulate()
   res.status(200).json(createdComment);
    }
    catch (err) {
      next(err);
    }
});


router.post("/new/museum/:id", isLoggedIn, async (req, res, next) => {
 
  const { content,rating } = req.body;
  const newComment = {
    content,
    rating,
    user: req.session.currentUser._id,
    placeMuseum: req.params.id,
    placeMonument: null,
  };
  try{
  let createdComment = await Comments.create(newComment)
  createdComment = await createdComment.populate('user').execPopulate()
   res.status(200).json(createdComment);
    }
    catch (err) {
      next(err);
    }
});

// router.post("/new/museum/:id", isLoggedIn, (req, res, next) => {
//   const { content,rating } = req.body;
//   const newComment = {
//     content,
//     rating,
//     user: req.session.currentUser._id,
//     placeMonument: null,
//     placeMuseum: req.params.id,
//   };
//   Comments.create(newComment)
//     .then((createdComment) => {
//         const comId = createdComment._id
//         User.findByIdAndUpdate({_id: req.session.currentUser._id}, {$push: {comments: comId}}, {new: true})
//         .then((comRes) => {
//             // res.status(200).json(comRes);
//         })
//         res.status(200).json(createdComment);
//     })
//     .catch(next);
// });




// router.post("/new/:id", isLoggedIn, (req, res, next) => {
//   const { content, rating } = req.body;
//   const newComment = {
//     content,
//     rating,
//     user: req.session.currentUser._id,
//     placeMuseum: req.params.id,
//     placeMonument: req.params.id
//   };
//   Comments.create(newComment)
//     .then((createdComment) => {
//         const comId = createdComment._id
//         User.findByIdAndUpdate({_id: req.session.currentUser._id}, {$push: {comments: comId}}, {new: true})
//         .then((comRes) => {
//             res.status(200).json(comRes);
//         })
//     })
//     .catch(next);
// });

router.patch("/edit/:id", isLoggedIn, (req, res, next) => {
  const { content, rating } = req.body;
  Comments.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then((updatedComment) => {
      res.status(200).json(updatedComment);
    })
    .catch(next);
});

router.delete("/delete/:id", isLoggedIn, (req, res, next) => {
  Comments.findByIdAndDelete(req.params.id)
    .then((response) => {
      res.status(200).json( response )
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
