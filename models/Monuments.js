const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const monumentSchema = new Schema({
 fields:  Object
// commune
// adrs
// insee
// wadrs
// stat
// coordonnees_ban
// ppro
// dmaj
// contact
// dpro
// code_departement
// sclx
// dpt_lettre
// ref
// reg
// wcom
// tico FROM DATABASE ("monuments.json")
});

const Monuments = mongoose.model("Monuments", monumentSchema);

module.exports = Monuments;
