const User = require("../models/user");
const db = require("../db");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

// handle user create on POST
exports.user_create_post = async (req, res) => {
  //validate and sanitize form data
  //await check("firstName").trim().isString().run(req);
  //await check("lastName").trim().isString().run(req);
  await check("username")
    .normalizeEmail({ gmail_remove_dots: false })
    .isEmail()
    .run(req);
  await check("password").isLength({ min: 8 }).run(req);
  /* await check(
    "confirmPassword",
    "passwordConfirmation field must have the same value as the password field"
  )
    .custom((value, { req }) => value === req.body.password)
    .run(req); */
  //await check("membershipStatus").toBoolean().isBoolean().run(req);
  await check("isAdmin").toBoolean().isBoolean().run(req);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  //encrypt user password and save user to db
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) {
      return console.log(err);
    } else {
      db.userCreate(
        {
          //firstName: req.body.firstName,
          //lastName: req.body.lastName,
          username: req.body.username,
          password: hashedPassword,
          //membershipStatus: req.body.membershipStatus,
          isAdmin: req.body.isAdmin,
          regDate: new Date(),
        },
        req,
        res
      );
    }
  });
};
