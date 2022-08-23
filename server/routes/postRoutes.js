const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

//create new post
router.post("/", postController.post_create_post);

//get list of all posts
router.get("/", postController.posts_list_get);

//get post by ID
router.get("/:id", postController.post_byID_get);

//delete post by ID
router.delete("/:id", postController.post_delete);

//publish post
router.put("/publish/:id", postController.post_publish_put);

//unpunlish post
router.put("/unpublish/:id", postController.post_unpublish_put);

//edit post
router.put("/editPost/:id", postController.post_edit_put);

module.exports = router;
