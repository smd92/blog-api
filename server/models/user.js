const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean },
    regDate: { type: Date, required: true },
  },
  { collection: "users" }
);

//Export model
module.exports = mongoose.model("user", userSchema);
