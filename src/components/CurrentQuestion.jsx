import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { quiz } from "../reducers/quiz"; // Make sure to provide the correct path
import QuizSummary from "./QuizSummary";
import "./CurrentQuestion.css";

export const CurrentQuestion = () => {
  const dispatch = useDispatch();
  const quizState = useSelector((state) => state.quiz);

  const question = quizState.questions[quizState.currentQuestionIndex] || {};
  const userAnswer = quizState.answers.find(
    (a) => a.questionId === question.id
  );

  const [selectedOption, setSelectedOption] = useState(
    userAnswer ? userAnswer.answerIndex : null
  );

  const [feedbackStyle, setFeedbackStyle] = useState(null);

  useEffect(() => {
    if (feedbackStyle !== null) {
      const timeoutId = setTimeout(() => {
        setFeedbackStyle(null);
        dispatch(quiz.actions.goToNextQuestion());
        setSelectedOption(null);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [feedbackStyle, dispatch]);

  const handleAnswerSubmit = () => {
    if (selectedOption !== null) {
      const isCorrect = selectedOption === question.correctAnswerIndex;
      setFeedbackStyle(isCorrect ? "correct" : "incorrect");

      dispatch(
        quiz.actions.submitAnswer({
          questionId: question.id,
          answerIndex: selectedOption,
        })
      );
    }
  };

  return (
    <div>
      {quizState.currentQuestionIndex === quizState.questions.length ? (
        <QuizSummary />
      ) : (
        <div className="container">
          <h2>
            Question {quizState.currentQuestionIndex + 1}/
            {quizState.questions.length}
          </h2>
          <h1>Question: {question?.questionText}</h1>
          <form>
            {question?.options?.map((option, index) => (
              <div
                key={index}
                style={{
                  backgroundColor:
                    feedbackStyle === "correct" &&
                    index === question.correctAnswerIndex
                      ? "lightgreen"
                      : feedbackStyle === "incorrect" &&
                        index === selectedOption
                      ? "lightcoral"
                      : "white",
                  cursor: "pointer",
                  border: "1px solid #ccc",
                  padding: "8px",
                  margin: "4px",
                  borderRadius: "4px",
                }}
                className={`option ${
                  feedbackStyle === "correct" &&
                  index === question.correctAnswerIndex
                    ? "correct"
                    : feedbackStyle === "incorrect" && index === selectedOption
                    ? "incorrect"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  id={`option${index}`}
                  name="answerOption"
                  value={index}
                  checked={selectedOption === index}
                  onChange={() => setSelectedOption(index)}
                  disabled={feedbackStyle !== null}
                />
                <label htmlFor={`option${index}`}>{option}</label>
              </div>
            ))}
          </form>
          {feedbackStyle && (
            <p className={`feedback ${feedbackStyle}`}>
              Your answer was{" "}
              {feedbackStyle === "correct" ? "correct!" : "incorrect."} The
              correct answer was:{" "}
              {question?.options[question.correctAnswerIndex]}.
            </p>
          )}
          {!feedbackStyle && (
            <div className="button-container">
              <button
                className="button"
                onClick={handleAnswerSubmit}
                disabled={selectedOption === null || feedbackStyle !== null}
              >
                Submit and Next Question
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
