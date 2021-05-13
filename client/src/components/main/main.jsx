import { useState, useEffect, useRef } from "react";
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

  let [rowsNr, setRowsNr] = useState(2);
  const changeRowsNr = () => {
    textAreaRef.current.rows = 4
    setRowsNr(4);
    setTextAreaHeight("100px");
  };

  const useOutsideDetector = (ref) => {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setRowsNr(2);
          setTextAreaHeight("70px");
        }
      };
      // Bind the event listener
      document.addEventListener("click", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("click", handleClickOutside);
      };
    }, [ref]);
  };

  /**
   * Component that alerts if you click outside of it
   */
  const OutsideDetector = (props) => {
    const wrapperRef = useRef(null);
    useOutsideDetector(wrapperRef);

    return <div ref={wrapperRef}>{props.children}</div>;
  };

  const [textAreaHeight, setTextAreaHeight] = useState("70px");
  const textAreaRef = useRef(null)
  

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
          <OutsideDetector>
            <form onSubmit={handleSubmit}>
              <div className="form">
                <textarea
                  onClick={changeRowsNr}
                  ref={textAreaRef}
                  placeholder="Ask Something!"
                  name="question"
                  cols="70"
                  rows="2"
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
          </OutsideDetector>
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
