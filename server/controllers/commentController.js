const Comment = require("../models/comment");
const db = require("../db");
const { check, validationResult } = require("express-validator");

//add new comment
exports.comment_create_post = async (req, res, next) => {
  if (req.isAuthenticated()) {
    try {
      //validate and sanitize form data
      await check("user").trim().isString().run(req);
      await check("text").trim().isString().run(req);

      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }
      db.commentCreate(
        {
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
  } else {
    res.status(403).send({
      message: "Log in to access this route",
    });
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

//delete comment by ID
exports.comment_delete = async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      await Comment.deleteOne({ _id: req.params.id });
    } catch (err) {
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
