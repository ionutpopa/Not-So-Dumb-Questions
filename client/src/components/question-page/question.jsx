import { useState, useEffect, useRef } from "react";
import { get } from "axios";
import { DisappearedLoading } from "react-loadingg";

import Cancel from "../buttons/cancel";

import "./question.scss";

const Question = (props) => {
  const [question, setQuestion] = useState({});
  const scrollInto = useRef(null);
  useEffect(() => {
    window.scrollTo(scrollInto.current);
    const getQuestion = async () => {
      try {
        const response = await get(`/api/questions/${props.match.params._id}`);
        setQuestion(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    getQuestion();
  }, [props]);

  const handleCancel = () => {
    props.history.push("/");
  };

  return (
    <div className="question-page-container">
      <div>
        <div className="q-container">
          {!question.question ? (
            <div className="loading-modal">
              <DisappearedLoading />
            </div>
          ) : (
            <p ref={scrollInto}>{question.question}</p>
          )}
        </div>
        <div className="answer-container">
          <p>{question.answer}</p>
        </div>
      </div>
      <div className="buttons no-space">
        <Cancel onClick={handleCancel}>Cancel</Cancel>
      </div>
    </div>
  );
};

export default Question;
