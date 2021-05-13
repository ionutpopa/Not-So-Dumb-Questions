import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./main.scss";

const Main = () => {
  const [questions, setQuestions] = useState([]);
  const [detect, setDetect] = useState(false);
  const textAreaRef = useRef();

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const response = await axios.get("/api/questions");
        setQuestions(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getQuestions();

    if (detect) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [detect]);

  const initialState = { question: "", answer: "" };
  const [question, setQuestion] = useState(initialState);

  const handleChange = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!question.question) return;

    const postQuestion = async () => {
      try {
        await axios.post("/api/questions", question);
      } catch (error) {
        console.log(error);
      }
    };

    postQuestion();
    window.location.reload(false);
  };

  const truncate = (input) =>
    input.length > 100 ? (
      <div className="truncate-text-container">
        <p>{input.substring(0, 100)} . . .</p>
        <i>click to see the question</i>
      </div>
    ) : (
      input
    );

  const handleClickOutside = (e) => {
    if (textAreaRef.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setDetect(false);
  };

  return (
    <div className="main-page">
      <div className="header">
        <p className="title">
          Questions <small>and</small> Answers
        </p>
        <div className="description">
          <small>
            On this platform you can ask <b>anything</b> and get responses
            without being <b>ashamed </b>
            of the question because anything it's <b>anonymized!</b> Enjoy!
          </small>
        </div>
        <div className="add-question">
          <p>Create a Question:</p>
          <form onSubmit={handleSubmit}>
            <div className="form">
              <textarea
                onClick={(e) => setDetect(true)}
                ref={textAreaRef}
                placeholder="Ask Something!"
                name="question"
                cols="70"
                style={
                  detect ? { transition: "300ms" } : { transition: "300ms" }
                }
                rows={detect ? 4 : 2}
                type="text"
                value={question.question}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="submit-question">
              <input type="submit" value="Add" />
            </div>
          </form>
        </div>
      </div>
      <div className="content">
        {questions.map((question) => {
          return (
            <div key={question._id} className="question-container">
              <div className="question">
                <p>Q: </p>
                <div>{truncate(question.question)}</div>
              </div>
              <div className="answer">
                <p>A: </p>
                <p>
                  {question.answer === "" ? (
                    <Link to={`/questions/${question._id}/edit`}>
                      <b className="add-answer">Add an answer</b>
                    </Link>
                  ) : (
                    truncate(question.answer)
                  )}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Main;
