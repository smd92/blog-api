const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//create user
router.post("/create", userController.user_create_post);

//get user by id
//router.get("/:id", userController.user_byID_get);

module.exports = router;

