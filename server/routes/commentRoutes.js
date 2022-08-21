const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

//create new comment
router.post("/", commentController.comment_create_post);

//get list of all comments
router.get("/", commentController.comments_list_get);

//get specific comment by ID
router.get("/:id", commentController.comment_byID_get);

//delete comment by ID
router.delete("/:id", commentController.comment_delete);

module.exports = router;
