require("dotenv").config();
require("../config/dbConnection");
const dataSet = require("./data/musees.json");
const Museums = require("../models/Museum");

Museums.create(dataSet)
.then(dbSuccess => {
    console.log(dbSuccess);
})
.catch(dbError => {
console.log(dbError);
})
