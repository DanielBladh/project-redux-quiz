import React from "react";
import { useDispatch } from "react-redux";
import { quiz } from "../reducers/quiz";
import "./WelcomePage.css";

export default function WelcomePage() {
  const dispatch = useDispatch();

  const handleStartQuiz = () => {
    dispatch(quiz.actions.startQuiz());
  };
  return (
    <div className="welcome-container">
      <h1>Welcome to the Tech Quiz!</h1>
      <p>Get ready to test your knowledge.</p>
      <button className="start-quiz" onClick={handleStartQuiz}>Start Quiz</button>
    </div>
  );
}
