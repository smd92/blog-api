const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    title: { type: String, required: true },
    text: { type: String, required: true },
    isPublic: { type: Boolean, required: true },
    timestamp: { type: Date, required: true },
  },
  { collection: "posts" }
);

//Export model
module.exports = mongoose.model("post", postSchema);
