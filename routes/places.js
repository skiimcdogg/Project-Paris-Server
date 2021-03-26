const express = require("express");
const router = express.Router();
const Monuments = require("./../models/Monuments");
const Museums = require("./../models/Museum");





router.get("/monuments", (req, res, next) => {
    Monuments.find()
    .then((monumentsRes) => {
  res.status(200).json({ monumentsRes})
        })
        .catch((err) => {
            res.json(err)
        })
    });

router.get("/museums", (req, res, next) => {
        Museums.find()
        .then((museumsRes) => {
            res.status(200).json({ museumsRes })
        })
        .catch((err) => {
            res.json(err)
        })
    });
  



router.get(`/search?q=${query}`, (req, res, next) => {
    Monuments.find()
    .then((monumentsRes) => {
        Museums.find()
        .then((museumsRes) => {
            console.log(monumentsRes, museumsRes );
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

router.get("/monument/:id", (req, res, next) => {
    Monuments.findById(req.params.id)
    .then((monumentsRes) => {
            res.status(200).json({ monumentsRes })
        })
        .catch((err) => {
            res.json(err)
        })
    });

    router.get("/museum/:id", (req, res, next) => {
        Museums.findById(req.params.id)
        .then((museumsRes) => {
                res.status(200).json({ museumsRes })
            })
            .catch((err) => {
                res.json(err)
            })
        });



router.post("/update/monument/:id", (req, res, next) => {
    // const copyBody = {...req.body}
    const {
        commune,
        adrs,
        wadrs,
        contact,
        insee,
       } = req.body;
//         console.log(req.body);
        // console.log({ 
        //     commune,
        //     adrs,
        //     contact,
        //     insee,
        //     contact} );
const updateMonu =  {
    fields: {
        commune,
        adrs,
        wadrs,
        contact,
        insee,
       }
     }

        Monuments.findByIdAndUpdate(req.params.id,updateMonu )
        .then((monumentsRes) => {
                console.log(monumentsRes );
                res.status(200).json({ monumentsRes })
            })
            .catch((err) => {
                res.json(err)
            })
        })
 


    
router.post("/update/museum/:id", (req, res, next) => {
    const {
        cp,
        coordonnees_fin,
        periode_ouverture,
        adr,
        sitweb,
       } = req.body;
 
       const updateMuseum = {
           fields: {
        cp,
        coordonnees_fin,
        periode_ouverture,
        adr,
        sitweb,
       }}
        
            Museums.findByIdAndUpdate(req.params.id,updateMuseum)
            .then((museumsRes) => {
                console.log(museumsRes );
                res.status(200).json({museumsRes })
            })
            .catch((err) => {
                res.json(err)
            })
    })
    
module.exports = router;