const mongoose = require("mongoose");
const User = require("./models/user");
const Post = require("./models/post");
const Comment = require("./models/comment");

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
      res.redirect("/");
    }
  });
};

//save post to db
const postCreate = (postData, req, res) => {
  const post = new Post({
    user: postData.user,
    title: postData.title,
    text: postData.text,
    isPublic: postData.isPublic,
    timestamp: postData.timestamp,
  });

  post.save((err) => {
    if (err) {
      res.statusCode = 500;
      res.send(err);
    } else {
      res.redirect("/admin");
    }
  });
};

//save comment to db
const commentCreate = (commentData, req, res) => {
  const comment = new Comment({
    post: commentData.post,
    user: commentData.user,
    text: commentData.text,
    timestamp: commentData.timestamp,
  });

  comment.save(async (err) => {
    if (err) {
      res.statusCode = 500;
      res.send(err);
    } else {
      //add comment to related post
      const post = await Post.findById(commentData.post);
      post.comments.push(comment);
      post.save();
      res.redirect("/");
    }
  });
};

module.exports = {
  connectToMongo,
  userCreate,
  postCreate,
  commentCreate,
};
