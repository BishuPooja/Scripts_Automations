const express = require("express");
const app = express();
const session = require("express-session");
const bcrypt = require("bcrypt");
const port = 3040;

function middleware(req, res, next) {
  console.log("middleware");
  next();
}

function newFn(req, res, next) {
  console.log("new function");
  res.send("new function");
}
function secondFn(req, res, next) {
  console.log(`Second Function executed`);
  res.send("second Function executed");
}

app.get("/", middleware, newFn, secondFn, function (req, res) {
  res.send("next function called");
  req.body.first_name;
});


app.listen(port, function () {
  console.log(`server listening on port http://localhost:${port}`);
});
