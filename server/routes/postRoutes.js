const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

//create new post
router.post("/", postController.post_create_post);

//get list of all posts
router.get("/", postController.posts_list_get);

//delete post by ID
router.delete("/:id", postController.post_delete);

module.exports = router;
