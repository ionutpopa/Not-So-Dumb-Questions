import React, { useState, useEffect } from "react";
import { get, patch } from "axios";

import "./add-answer.scss";

const AddAnswer = (props) => {
  const initialState = { question: "", answer: "" };
  const [question, setQuestion] = useState(initialState);

  useEffect(() => {
    const getQuestion = async () => {
      try {
        const response = await get(`/api/questions/${props.match.params._id}`);
        setQuestion(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getQuestion();
  }, [props]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updateQuestion = async () => {
      try {
        await patch(`/api/questions/${question._id}`, question);
        props.history.push("/");
      } catch (error) {
        console.log(error);
      }
    };
    updateQuestion();
  };

  const handleChange = (event) => {
    setQuestion({ ...question, [event.target.name]: event.target.value });
  };

  const handleCancel = () => {
    props.history.push("/");
  };
  return (
    <div className="add-answer-container">
      <p>answer the question</p>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="don't be afraid"
          name="answer"
          rows="10"
          cols="60"
          type="text"
          value={question.answer}
          onChange={handleChange}
        />
        <div className="buttons">
          <button type="submit">Answer</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAnswer;
