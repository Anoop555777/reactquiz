import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Questions from "./components/Questions";
import "./App.css";
import { useEffect, useReducer, useState } from "react";
import StartScreen from "./components/StartScreen";
import Button from "./components/Button";

const initialState = {
  questions: [],
  status: "",
  index: 0,
};

function reducerFun(state, action) {
  if (action.type === "dataRecived")
    return { ...state, questions: action.payload, status: "ready" };
  else if (action.type === "dataFailed") return { ...state, status: "failed" };
  else if (action.type === "dataLoading")
    return { ...state, status: "loading" };
  else if (action.type === "dataActive") return { ...state, status: "active" };
  else if (action.type === "nextQuestion")
    return { ...state, index: state.index + 1 };
  else if (action.type === "prevQuestion")
    return { ...state, index: state.index - 1 };
}

function App() {
  const [{ questions, status, index }, dispatch] = useReducer(
    reducerFun,
    initialState
  );

  const noOfQuestions = questions.length;
  const [answers, setAnswer] = useState([]);

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((response) => {
        dispatch({ type: "dataLoading" });
        return response.json();
      })
      .then((data) => dispatch({ type: "dataRecived", payload: data }))
      .catch((error) => dispatch({ type: "dataFailed" }));
  }, []);

  useEffect(
    function () {
      setAnswer(Array.from({ length: noOfQuestions }, () => null));
    },
    [noOfQuestions]
  );

  const setAnswerHandler = (i) => {
    const newArr = [...answers];
    newArr[index] = i;
    setAnswer(newArr);
  };

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "ready" && (
          <StartScreen noOfQuestions={noOfQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <Questions
            question={questions[index]}
            dispatch={setAnswerHandler}
            answers={answers}
            index={index}
          />
        )}
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
          </div>
        )}
        {status === "error" && <Error />}
      </Main>
    </div>
  );
}

export default App;
