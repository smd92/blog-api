const Post = require("../models/post");
const db = require("../db");
const { check, validationResult } = require("express-validator");

//add new post
exports.post_create_post = async (req, res, next) => {
  if (req.isAuthenticated()) {
    try {
      //validate and sanitize form data
      await check("user").trim().isString().run(req);
      await check("title").trim().isString().run(req);
      await check("text").trim().isString().run(req);
      await check("isPublic").toBoolean().isBoolean().run(req);

      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }
      db.postCreate(
        {
          user: req.body.user,
          comments: [],
          title: req.body.title,
          text: req.body.text,
          isPublic: req.body.isPublic,
          timestamp: new Date(),
        },
        req,
        res
      );
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(403).send({
      message: "Log in to access this route",
    });
  }
};

//get all posts
exports.posts_list_get = async (req, res) => {
  try {
    const postList = await Post.find({ isPublic: true });
    res.json(postList);
  } catch (err) {
    res.status(400);
    res.statusMessage = "could not get list of all posts";
    res.send();
  }
};

//get post by ID
exports.post_byID_get = async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const post = await Post.findById(req.params.id);
      res.json(post);
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(403).send({
      message: "Log in to access this route",
    });
  }
};

//delete post by ID
exports.post_delete = async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      await Post.deleteOne({ _id: req.params.id });
    } catch (err) {
      res.status(400);
      res.statusMessage = "could not delete post";
      res.send();
    }
  } else {
    res.status(403).send({
      message: "Log in to access this route",
    });
  }
};
