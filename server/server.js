const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
require("dotenv").config();
const passport = require("passport");
const db = require("./db");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");
const commentRouter = require("./routes/commentRoutes");

const PORT = process.env.PORT || 3001;

const app = express();

app.use((req, res, next) => {
  db.connectToMongo();
  next();
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.mongoURI,
    }),
  })
);
app.use(passport.authenticate("session"));

app.use(express.json()); // to support JSON-encoded request bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded request bodies

//routers
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
