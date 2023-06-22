import React from "react";

const Button = ({ children, dispatch }) => {
  return (
    <button onClick={dispatch} className="btn btn-ui">
      {children}
    </button>
  );
};

export default Button;
