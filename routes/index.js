const express = require("express");
const router = express.Router();
const Question = require("../models/question");

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

module.exports = router;
