import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Questions from "./components/Questions";
import "./App.css";
import { useEffect, useReducer, useState } from "react";
import StartScreen from "./components/StartScreen";

import Progress from "./components/Progress";
import Footer from "./components/Footer";
import Result from "./components/Result";

const initialState = {
  questions: [],
  status: "",
  index: 0,
  remainingTime: 10,
};

function reducerFun(state, action) {
  if (action.type === "dataRecived")
    return {
      ...state,
      questions: action.payload,
      status: "ready",
      remainingTime: state.questions.length * 60,
    };
  else if (action.type === "dataFailed") return { ...state, status: "failed" };
  else if (action.type === "dataLoading")
    return { ...state, status: "loading" };
  else if (action.type === "dataActive") return { ...state, status: "active" };
  else if (action.type === "nextQuestion")
    return { ...state, index: state.index + 1 };
  else if (action.type === "prevQuestion")
    return { ...state, index: state.index - 1 };
  else if (action.type === "finishQuestion")
    return { ...state, status: "finish" };
  else if (action.type === "restart")
    return {
      ...state,
      status: "ready",
      index: 0,
      remainingTime: state.questions.length * 60,
    };
  else if (action.type === "timer") {
    return {
      ...state,
      remainingTime: state.remainingTime - 1,
      status: state.remainingTime === 0 ? "finish" : "active",
    };
  }
}

function App() {
  const [{ questions, status, index, remainingTime }, dispatch] = useReducer(
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
    if (newArr[index] === i) newArr[index] = null;
    else newArr[index] = i;
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
          <>
            <Progress
              noOfQuestions={noOfQuestions}
              index={index}
              remainingTime={remainingTime}
              dispatch={dispatch}
            />
            <Questions
              question={questions[index]}
              dispatch={setAnswerHandler}
              answers={answers}
              index={index}
            />

            <Footer
              noOfQuestions={noOfQuestions}
              index={index}
              status={status}
              dispatch={dispatch}
            />
          </>
        )}

        {status === "finish" && (
          <Result
            questions={questions}
            answers={answers}
            setAnswer={setAnswer}
            dispatch={dispatch}
          />
        )}

        {status === "error" && <Error />}
      </Main>
    </div>
  );
}

export default App;
