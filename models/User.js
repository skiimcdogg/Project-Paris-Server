const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "admin",
  },
  favorites: {
    favMonuments: [{ type: Schema.Types.ObjectId, ref: "Monuments" }],
    favMuseums: [{ type: Schema.Types.ObjectId, ref: "Museums" }],
  },
  comments: [{ type: Schema.Types.ObjectId, ref: "comments" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
