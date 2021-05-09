import React, { useState, useEffect } from "react";
import { get, patch } from "axios";

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
    <div>
      <h1>Edit</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        {/* ! Answer */}
        <div>
          <label>Answer</label>
          <textarea
            name="answer"
            rows="5"
            value={question.answer}
            onChange={handleChange}
          />
        </div>
        {/* ! Answer */}
        <div>
          <button type="submit">Update</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAnswer;
