import React from "react";

const Result = ({ questions, answers, dispatch, setAnswer }) => {
  let points = 0;

  for (let i = 0; i < questions.length; i++) {
    if (questions[i].correctOption === answers[i]) {
      points += questions[i].points;
    }
  }

  const totalPoints = questions.reduce((acc, cur) => acc + cur.points, 0);

  const percentage = (points / totalPoints) * 100;
  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";

  const resetHandler = () => {
    dispatch({ type: "restart" });
    setAnswer([]);
  };

  return (
    <>
      <p className="result">
        <span>{emoji}</span>
        You score {points} out of {totalPoints} ({Math.ceil(percentage)}%)
      </p>

      <button className="btn btn-ui" onClick={resetHandler}>
        Restart quiz
      </button>
    </>
  );
};

export default Result;
