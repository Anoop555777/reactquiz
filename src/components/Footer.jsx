import React from "react";
import Button from "./Button";

const Footer = ({ status, index, noOfQuestions, dispatch }) => {
  return (
    <>
      {status === "active" && (
        <div className="flex">
          {index === 0 || (
            <Button dispatch={() => dispatch({ type: "prevQuestion" })}>
              Prev
            </Button>
          )}
          {index === noOfQuestions - 1 || (
            <Button dispatch={() => dispatch({ type: "nextQuestion" })}>
              Next
            </Button>
          )}

          {index === noOfQuestions - 1 && (
            <Button dispatch={() => dispatch({ type: "finishQuestion" })}>
              Finish
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default Footer;
