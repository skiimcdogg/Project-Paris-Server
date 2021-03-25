const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User"},
  places: {
    Monuments: [{ type: Schema.Types.ObjectId, ref: "Monuments"}],
    Museums: [{ type: Schema.Types.ObjectId, ref: "Museums"}]
  },
  content: String,
  timestamps: {
      createdAt: "createdAt",
    }

});

const Comments = mongoose.model("comments", commentsSchema);

module.exports = Comments;
