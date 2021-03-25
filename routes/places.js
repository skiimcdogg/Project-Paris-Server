const express = require("express");
const router = express.Router();
const Monuments = require("./../models/Monuments");
const Museums = require("./../models/Museum");

router.get("/", (req, res, next) => {
    Monuments.find()
    .then((monumentsRes) => {
        Museums.find()
        .then((museumsRes) => {
            res.status(200).json({ monumentsRes, museumsRes })
        })
        .catch((err) => {
            res.json(err)
        })
    })
    .catch((err) => {
        res.json(err) 
    })
});

router.get("/:id", (req, res, next) => {
    Monuments.findById(req.params.id)
    .then((monumentsRes) => {
        Museums.findById(req.params.id)
        .then((museumsRes) => {
            res.status(200).json({ monumentsRes, museumsRes })
        })
        .catch((err) => {
            res.json(err)
        })
    })
    .catch((err) => {
        res.json(err) 
    })
});

module.exports = router;