import React from "react";
import Timer from "./Timer";
const Progress = ({ noOfQuestions, index, remainingTime, dispatch }) => {
  return (
    <header className="progress">
      <progress max={noOfQuestions} value={index} />
      <p>
        Question <strong>{index + 1}/</strong> {noOfQuestions}
      </p>
      <Timer remainingTime={remainingTime} dispatch={dispatch} />
    </header>
  );
};

export default Progress;
