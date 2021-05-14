const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/index");
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI; // here you add your mongodb database, example: mongodb+srv://your-username:your-password@your-cluster-name.1111.mongodb.net/your-database-name?retryWrites=true&w=majority;

var checkAuth = (req, res, next) => {
  console.log("Checking authentication");
  if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
    req.user = null;
  } else {
    var token = req.cookies.nToken;
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }

  next();
};

app.use(checkAuth)

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", router);

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", function () {
  console.log("Connected to the Database.");
});

mongoose.connection.on("error", function (error) {
  console.log("Mongoose Connection Error : " + error);
});

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}.`);
});
