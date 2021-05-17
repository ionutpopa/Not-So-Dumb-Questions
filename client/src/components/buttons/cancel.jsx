import "./cancel.scss"

const Cancel = ({ onClick, children }) => {
  return (
    <button className="cancel" type="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default Cancel;
