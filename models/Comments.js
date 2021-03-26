const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentsSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    placeMuseum: { type: Schema.Types.ObjectId, ref: "Museums" },
    placeMonument: { type: Schema.Types.ObjectId, ref: "Monuments" },
    content: String,
  },
  { 
    timestamps: true
  }
);

const Comments = mongoose.model("comments", commentsSchema);

module.exports = Comments;
