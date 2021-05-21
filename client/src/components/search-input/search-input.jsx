import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./search-input.scss";

const SearchInput = ({ questions }) => {
  const [searchQuestion, setSearchQuestion] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [detect, setDetect] = useState(false);
  const inputRef = useRef();
  const searchButtonRef = useRef();

  const handleChange = (e) => {
    setSearchQuestion(e.target.value);
  };

  const openSearchInput = () => {
    inputRef.current.style = "width: 100%";
    searchButtonRef.current.style = "display: none";
  };

  const handleClickOutside = (e) => {
    if (inputRef.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setDetect(false);
    inputRef.current.style = "width: 0%";
    searchButtonRef.current.style = "left: 85%";
  };

  useEffect(() => {
    const results = questions.filter((question) =>
      question.question.toLowerCase().includes(searchQuestion)
    );
    setSearchResults(results);
    if (detect) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchQuestion, questions, detect]);

  return (
    <div className="search-container">
      <div className="input-container">
        <input
          type="text"
          placeholder="Search"
          value={searchQuestion}
          onChange={handleChange}
          onFocus={() => {
            setDetect(true);
          }}
          ref={inputRef}
        />
        <i
          ref={searchButtonRef}
          onClick={openSearchInput}
          className="fas fa-search"
        ></i>
      </div>

      {searchResults.map((question) =>
        searchQuestion !== "" ? (
          <Link
            key={question._id}
            to={`/${question._id}`}
            className="search-results"
          >
            <p>{question.question}</p>
          </Link>
        ) : null
      )}
    </div>
  );
};

export default SearchInput;
