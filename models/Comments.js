const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentsSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    placeMuseum: { type: Schema.Types.ObjectId, ref: "Museums" },
    placeMonument: { type: Schema.Types.ObjectId, ref: "Monuments" },
    content: String,
    rating: { type: String, enum: ["1", "2", "3", "4", "5"]}
  },
  { 
    timestamps: true
  }
);

const Comments = mongoose.model("comments", commentsSchema);

module.exports = Comments;
