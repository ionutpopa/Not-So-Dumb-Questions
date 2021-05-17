import "./question-card.scss"

const QuestionCard = ({question, answer, questionAnswer}) => {
  return (
    <div className="question-container">
      <div className="question-c">
        <p>Q: </p>
       {question}
      </div>
      <div className="answer-c">
        <p>A: </p>
        {questionAnswer === "" ? (
          <b className="add-answer">Open to add an answer</b>
        ) : (
          answer
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
