import { useState } from "react";
import { post } from "axios";

const CreateQuestion = (props) => {
  const initialState = { question: "", answer: ""};
  const [question, setQuestion] = useState(initialState);

  const handleChange = (event) => {
    setQuestion({ ...question, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!question.question) return;

    const postQuestion = async () => {
      try {
        await post("/api/questions", question);
        props.history.push('/');
      } catch (error) {
        console.log(error);
      }
    };
    
    postQuestion();
  };

  const handleCancel = () => {
    props.history.push("/");
  };

  return (
    <div>
      <h1>Create Question</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Question</label>
          <input
            name="question"
            type="text"
            value={question.question}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="btn-group">
          <input type="submit" value="Submit" className="btn btn-primary" />
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateQuestion;
