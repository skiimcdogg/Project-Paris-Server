const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favSchema = new Schema(
{
favMuseums: { type: Schema.Types.ObjectId, ref: "Museums" },
favMonuments: { type: Schema.Types.ObjectId, ref: "Monuments" },
}
);

const Favorites = mongoose.model("favorites", favSchema);

module.exports = Favorites;
