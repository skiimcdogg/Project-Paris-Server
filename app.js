require("dotenv").config();
require("./config/dbConnection");

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

/**
 * Middlewares
 */


const corsOptions = { origin: process.env.FRONTEND_URL, credentials: true };


app.use(cors(corsOptions));
app.use(logger("dev")); // This logs HTTP reponses in the console.
app.use(express.json()); // Access data sent as json @req.body
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    store: new MongoStore({ mongooseConnection: mongoose.connection }), // Persist session in database.
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

// Test to see if user is logged In before getting into any router.
app.use(function (req, res, next) {
  console.log("User in session =>", req.session.currentUser.email);
  next();
});

/**
 * Routes
 */

const authRouter = require("./routes/auth");
const placesRouter = require("./routes/places")
const commentsRouter = require("./routes/comments")
const favoritesRouter = require("./routes/favorites")
const userRouter = require("./routes/user")

app.use("/api/auth", authRouter);
app.use("/api/places", placesRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/favorites", favoritesRouter);
app.use("/api/user", userRouter);

// 404 Middleware
app.use((req, res, next) => {
  const error = new Error("Ressource not found.");
  error.status = 404;
  next(error);
});

app.use(require("./middlewares/isLoggedIn"));
app.use(require("./middlewares/protectAdminRoute"));

// Error handler middleware
// If you pass an argument to your next function in any of your routes or middlewares
// You will end up in this middleware
// next("toto") makes you end up here
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== "production") {
    console.error(err);
  }
  console.log("An error occured");
  res.status(err.status || 500);
  if (!res.headersSent) {
    res.json(err);
  }
});

module.exports = app;
