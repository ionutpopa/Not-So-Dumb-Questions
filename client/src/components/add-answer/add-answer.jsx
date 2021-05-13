import { useState, useEffect } from "react";
import { get, patch } from "axios";
import { DisappearedLoading } from "react-loadingg";

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
      <div className="title-container">
        <p>answer the question: </p>
        {!question.question ? (
          <div className="loading-modal">
            <DisappearedLoading />
          </div>
        ) : (
          <p>{question.question}</p>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="help with an answer!"
          name="answer"
          rows="10"
          cols="60"
          type="text"
          value={question.answer}
          onChange={handleChange}
        />
        <div className="buttons space">
          <button className="answer" type="submit">
            Answer
          </button>
          <button className="cancel" type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAnswer;
