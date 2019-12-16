var createError = require("http-errors");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const app = express();
//connect db
const Singleton = require("./config/db");

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//help our server be optim. & savety

// listen on port 3000
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

// Load env vars
dotenv.config({ path: "./config/config.env" });
// Connect to database
singleton = new Singleton();

//first test get with info
app.get("/", (req, res) => {
  res.json({
    message: "This is test request"
  });
});
