import "./answer.scss"

const Answer = ({ onClick, children }) => {
  return (
    <button className="answer" type="submit" onClick={onClick}>
      {children}
    </button>
  );
};

export default Answer;
