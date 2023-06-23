import React, { useEffect } from "react";

const Timer = ({ remainingTime, dispatch }) => {
  const min = Math.floor(remainingTime / 60);
  const sec = Math.floor(remainingTime % 60);

  useEffect(
    function () {
      const id = setInterval(() => dispatch({ type: "timer" }), 1000);

      return () => clearInterval(id);
    },

    [dispatch]
  );

  return (
    <div className="timer">
      {min < 10 ? `0${min}` : min} : {sec < 10 ? `0${sec}` : sec}
    </div>
  );
};

export default Timer;
