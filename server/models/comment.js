const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    post: { type: Schema.Types.ObjectId, required: true, ref: "Post" },
    user: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, required: true },
  },
  { collection: "comments" }
);

//Export model
module.exports = mongoose.model("comment", commentSchema);
