import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { quiz } from "../reducers/quiz";
import "./QuizSummary.css";

const QuizSummary = () => {
  const dispatch = useDispatch();
  const quizState = useSelector((state) => state.quiz);

  const totalQuestions = quizState.questions.length;
  const correctAnswers = quizState.answers.filter((a) => a.isCorrect).length;

  const incorrectAnswers = quizState.answers.filter((a) => !a.isCorrect);

  const handleRestart = () => {
    dispatch(quiz.actions.restart());
  };

  const [showDetails, setShowDetails] = useState(false);

  const elapsedMinutes = Math.floor(quizState.elapsedTime / 60000);
  const elapsedSeconds = Math.floor((quizState.elapsedTime % 60000) / 1000);

  return (
    <div className="summary-container">
      <h1>Quiz Summary</h1>
      <p>
        Time taken: {elapsedMinutes} minutes and {elapsedSeconds} seconds
      </p>
      <p style={{ fontWeight: "bold", textDecoration: "underline" }}>
        Score: {quizState.score}
      </p>
      <p>Total Questions: {totalQuestions}</p>
      <p>Correct Answers: {correctAnswers}</p>
      <p>Incorrect Answers: {totalQuestions - correctAnswers}</p>

      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "Hide Details" : "Show Details"}
      </button>

      {showDetails && (
        <div className="answer-summary">
          {incorrectAnswers.map((answer) => (
            <div key={answer.question.id} className="question-summary">
              <p className="paragraph-summary">
                Question: {answer.question.questionText}
                <br />
                Your Answer:{" "}
                <span style={{ color: "lightcoral" }}>{answer.answer}</span>
                <br />
                <span className="incorrect-answer">
                  Correct Answer:{" "}
                  <span  style={{ color: "lightgreen" }}>{answer.question.options[answer.question.correctAnswerIndex]}</span>
                </span>
              </p>
            </div>
          ))}
        </div>
      )}

      <button className="restart-button" onClick={handleRestart}>
        Restart Quiz
      </button>
    </div>
  );
};

export default QuizSummary;
