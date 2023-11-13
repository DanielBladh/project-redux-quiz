import React from "react";
import { useSelector } from "react-redux";
import "./QuizSummary.css";

export default function QuizSummary() {
  const quizState = useSelector((state) => state.quiz);
  const totalQuestions = quizState.questions.length;
  const correctAnswers = quizState.answers.filter((a) => a.isCorrect).length;

  return (
    <div className="container">
      <h1>Quiz Summary</h1>
      <p>Total Questions: {totalQuestions}</p>
      <p>Correct Answers: {correctAnswers}</p>
      <p>Incorrect Answers: {totalQuestions - correctAnswers}</p>
    </div>
  );
}
