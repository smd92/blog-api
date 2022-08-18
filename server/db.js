const mongoose = require("mongoose");
const User = require("./models/user");

//Set up mongoose connection
const connectToMongo = () => {
  let mongoDB = process.env.mongoURI;
  mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  let db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  console.log(mongoose.connection.readyState);
};

//save user to db
const userCreate = (userData, req, res) => {
  const user = new User({
    //firstName: userData.firstName,
    //lastName: userData.lastName,
    username: userData.username,
    password: userData.password,
    //membershipStatus: userData.membershipStatus,
    isAdmin: userData.isAdmin,
    regDate: userData.regDate,
  });

  user.save((err) => {
    if (err) {
      res.statusCode = 500;
      res.send(err);
    } else {
      res.send({ success: true });
    }
  });
};

module.exports = {
  connectToMongo,
  userCreate,
};
