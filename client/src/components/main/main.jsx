import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

//import { LoopCircleLoading } from 'react-loadingg';

import "./main.scss";
import Header from "../header/header";

import useWindowDimensions from "../screen-dimension/screen-dimension";

const Main = () => {
  const [questions, setQuestions] = useState([]);
  const { width } = useWindowDimensions();
  //const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
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

  const truncate = (input) =>
    input.length > 100 ? (
      <div className="truncate-text-container">
        <p>
          {width < 540 ? input.substring(0, 40) : input.substring(0, 140)}
          <b>...</b>
        </p>
        <i>click to open...</i>
      </div>
    ) : (
      input
    );

  return (
    <div className="main-page">
      {/* {loading ? (
        <LoopCircleLoading />
      ) : ( */}
      <>
        <Header />
        <div className="content">
          {questions.map((question) => {
            return (
              <Link
                key={question._id}
                to={
                  question.answer === ""
                    ? `/${question._id}/edit`
                    : `/${question._id}`
                }
              >
                <div className="question-container">
                  <div className="question">
                    <p>Q: </p>
                    {truncate(question.question)}
                  </div>
                  <div className="answer">
                    <p>A: </p>
                    {question.answer === "" ? (
                      <b className="add-answer">Open to add an answer</b>
                    ) : (
                      truncate(question.answer)
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </>
      {/* )} */}
    </div>
  );
};

export default Main;
