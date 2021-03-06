const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  favorites: [{ type: Schema.Types.ObjectId, ref: "favorites" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "comments" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
