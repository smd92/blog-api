const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    text: { type: String, required: true },
    timestamp: { type: Date, required: true },
  },
  { collection: "comments" }
);

//Export model
module.exports = mongoose.model("comment", commentSchema);
