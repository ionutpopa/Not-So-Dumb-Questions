import { useState, useEffect } from "react";

import "./search-input.scss";

const SearchInput = ({ questions }) => {
  const [searchQuestion, setSearchQuestion] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e) => {
    setSearchQuestion(e.target.value);
  };

  useEffect(() => {
    const results = questions.filter((question) =>
      question.question.toLowerCase().includes(searchQuestion)
    );
    setSearchResults(results);
  }, [searchQuestion, questions]);

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search"
        value={searchQuestion}
        onChange={handleChange}
      />

      {searchResults.map((question) =>
        searchQuestion !== "" ? (
          <div key={question._id} className="search-results">
            <p >{question.question}</p>
          </div>
        ) : null
      )}
    </div>
  );
};

export default SearchInput;
