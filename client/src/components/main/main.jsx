import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

//import { LoopCircleLoading } from 'react-loadingg';

import Header from "../header/header";
import QuestionCard from "../question-card/question-card";
import useWindowDimensions from "../screen-dimension/screen-dimension";
import SearchInput from "../search-input/search-input";

import "./main.scss";

const Main = () => {
  const [questions, setQuestions] = useState([]);
  //const [loading, setLoading] = useState(false);

  const { width } = useWindowDimensions();

  const truncate = (input) =>
    input.length > 60 ? (
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

    return () => questions;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions]);

  return (
    <div className="main-page">
      {/* {loading ? (
        <LoopCircleLoading />
      ) : ( */}
      <>
        <Header searchInput={<SearchInput questions={questions} />} />
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
                <QuestionCard
                  question={truncate(question.question)}
                  answer={truncate(question.answer)}
                  questionAnswer={question.answer}
                />
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
