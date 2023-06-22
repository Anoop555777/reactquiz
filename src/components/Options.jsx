import React from "react";

const Options = ({ question, dispatch, answers, index }) => {
  return (
    <div className="options">
      {question.options.map((option, i) => (
        <button
          className={`btn btn-option ${answers[index] === i ? "correct" : ""}`}
          key={option}
          onClick={() => dispatch(i)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Options;
