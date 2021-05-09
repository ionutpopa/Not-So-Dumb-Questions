import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./main.scss";

const Main = () => {
  const [questions, setQuestions] = useState([]);

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
  }, []);

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
          <Link to="/questions/new">Add a question!</Link>
        </div>
      </div>
      <div className="content">
        {questions.map((question) => {
          return (
            <div key={question._id} className="question-container">
              <div className="question">
                <p>Question: </p>
                <p>{question.question}</p>
              </div>
              <div className="answer">
                <p>Answer: </p>
                <p>
                  {question.answer === "" ? (
                    <Link to={`/questions/${question._id}/edit`}>
                      Add an answer
                    </Link>
                  ) : (
                    question.answer
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
