require("dotenv").config();
require("../config/dbConnection");
const dataSet = require("./data/monuments.json");
const Monuments = require("../models/Monuments");

Monuments.create(dataSet)
.then(dbSuccess => {
    console.log(dbSuccess);
})
.catch(dbError => {
console.log(dbError);
})
