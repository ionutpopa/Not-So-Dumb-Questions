import { useState, useEffect, useRef } from "react";
import axios from "axios";

import "./header.scss";

const Header = ({ searchInput }) => {
  const initialState = { question: "", answer: "" };
  const [question, setQuestion] = useState(initialState);
  const [detect, setDetect] = useState(false);
  const textAreaRef = useRef();

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

  const handleClickOutside = (e) => {
    if (textAreaRef.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setDetect(false);
  };

  useEffect(() => {
    if (detect) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [detect]);

  return (
    <div className="header">
      <div className="title">
        <p>
          Questions <small>and</small> Answers
        </p>
        {searchInput}
      </div>
      <div className="description">
        <small>
          On this platform you can ask <b>anything</b> and get responses without
          being <b>ashamed </b>
          of the question because anything it's <b>anonymized!</b> Enjoy!
        </small>
      </div>
      <div className="add-question">
        <p>ask something:</p>
        <form onSubmit={handleSubmit}>
          <div className="form">
            <textarea
              onFocus={() => setDetect(true)}
              ref={textAreaRef}
              placeholder="type your question!"
              name="question"
              cols="70"
              rows={detect ? 4 : 2}
              type="text"
              value={question.question}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="submit-question">
            <input type="submit" value="add" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Header;
