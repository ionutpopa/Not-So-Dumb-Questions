const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Question = require("../models/question");
const User = require("../models/user");

router.get("/questions", (req, res) => {
  Question.find((err, questions) => {
    res.json(questions);
  });
});

router.get("/questions/:id", (req, res) => {
  Question.findById(req.params.id, (err, question) => {
    if (!question) {
      res.status(404).send("No result found");
    } else {
      res.json(question);
    }
  });
});

router.post("/questions", (req, res) => {
  let question = new Question(req.body);
  question
    .save()
    .then((question) => {
      res.send(question);
    })
    .catch((err) => {
      res.status(422).send("Question add failed");
    });
});

router.patch("/questions/:id", (req, res) => {
  Question.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json("question updated");
    })
    .catch((err) => {
      res.status(422).send("Question update failed.");
    });
});

router.delete("/questions/:id", (req, res) => {
  Question.findById(req.params.id, (err, question) => {
    if (!question) {
      res.status(404).send("Question not found");
    } else {
      Question.findByIdAndRemove(req.params.id)
        .then(() => {
          res.status(200).json("Question deleted");
        })
        .catch((err) => {
          res.status(400).send("Question delete failed.");
        });
    }
  });
});

// SIGN UP
router.post("/sign-up", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((user) => {
      var token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "2 days" });
      res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err.message);
      return res.status(400).send({ err: err });
    });
});

router.get('/logout', (req, res) => {
  res.clearCookie('nToken');
  res.redirect('/');
});

router.get('/login', (req, res) => {
  res.render('login');
});

// LOGIN
router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  // Find this user name
  User.findOne({ username }, "username password")
    .then(user => {
      if (!user) {
        // User not found
        return res.status(401).send({ message: "Wrong Username or Password" });
      }
      // Check the password
      user.comparePassword(password, (err, isMatch) => {
        if (!isMatch) {
          // Password does not match
          return res.status(401).send({ message: "Wrong Username or password" });
        }
        // Create a token
        const token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, {
          expiresIn: "2 days"
        });
        // Set a cookie and redirect to root
        res.cookie("nToken", token, { maxAge: 900000, httpOnly: true });
        res.redirect("/");
      });
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
