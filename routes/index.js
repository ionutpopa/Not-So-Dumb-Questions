const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
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

router.post("/register", async (req, res) => {
  try {
    let { username, password, passwordCheck } = req.body;

    // validate

    if (!username || !password || !passwordCheck) {
      return res.status(400).json({ msg: "Not all fields have been entered." });
    }
    if (password.length < 5) {
      return res
        .status(400)
        .json({ msg: "Password needs to be at least 5 charachters long" });
    }
    if (password !== passwordCheck) {
      return res
        .status(400)
        .json({ msg: "Enter the same password for verification" });
    }

    const existingUser = await User.findOne({ username: username });

    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "An account with this username already exists" });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: passwordHash,
    });

    const savedUser = await newUser.save();

    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // validate
    if (!username || !password) {
      return res.status(400).json({ msg: "Not all fields have been entered." });
    }

    const user = await User.findOne({ username: username });

    if (!user) {
      return res
        .status(400)
        .json({ msg: "No account with this username has been registered." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    username: user.username,
    id: user._id,
  });
});

module.exports = router;
