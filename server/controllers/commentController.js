const Comment = require("../models/comment");
const db = require("../db");
const { check, validationResult } = require("express-validator");

//add new comment
exports.comment_create_post = async (req, res, next) => {
  try {
    //validate and sanitize form data
    if (req.body.user || req.body.user != "") {
      await check("user").trim().isString().run(req);
    } else {
      req.body.user = "Anon";
    }
    await check("text").trim().isString().run(req);

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    db.commentCreate(
      {
        post: req.body.post,
        user: req.body.user,
        text: req.body.text,
        timestamp: new Date(),
      },
      req,
      res
    );
  } catch (err) {
    console.log(err);
  }
};

//get all comment
exports.comments_list_get = async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const commentList = await Comment.find();
      res.json(commentList);
    } catch (err) {
      res.status(400);
      res.statusMessage = "could not get list of all comments";
      res.send();
    }
  } else {
    res.status(403).send({
      message: "Log in to access this route",
    });
  }
};

//get comment by ID
exports.comment_byID_get = async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const comment = await Comment.findById(req.params.id);
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

//delete comment by ID
exports.comment_delete = async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      await Comment.deleteOne({ _id: req.params.id });
    } catch (err) {
      console.log(err);
      res.status(400);
      res.statusMessage = "could not delete comment";
      res.send();
    }
  } else {
    res.status(403).send({
      message: "Log in to access this route",
    });
  }
};
