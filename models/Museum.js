const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const museumSchema = new Schema({
 fields:  Object
//  departement: '
//  periode_ouverture: 
//  nom_du_musee: 
//  adr: 
//  ville: 
//  region: 
//  coordonnees_finales: 
//  sitweb: 
//  ref_musee: 
//  telephone1:
//  fermeture_annuelle:
//  cp: 
//  date_appellation: FROM DATABASE ("musees.json")
});

const Museums = mongoose.model("Museums", museumSchema);

module.exports = Museums;