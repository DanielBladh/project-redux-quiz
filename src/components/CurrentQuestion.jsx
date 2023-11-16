import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { quiz } from "../reducers/quiz";
import ProgressBar from "./ProgressBar";
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

    // Use quizState to get the score
    if (quizState.score <= -3) {
      // Set the quizOver state to true to indicate loss
      dispatch(quiz.actions.goToNextQuestion());
      setFeedbackStyle(null);
      setSelectedOption(null);
    }
  };

  return (
    <div>
      {quizState.quizOver ? (
        (console.log("Quiz Over"), (<QuizSummary />))
      ) : (
        <div className="container">
          {quizState.score <= -3 ? (
            <div className="quiz-over-message">
              <p>
                Oops! Your score is too low to continue. Trivia can be tricky,
                but it's an opportunity to learn and improve. Review the
                questions, and when you're ready, click the button below to
                restart the quiz and give it another shot. You've got this!
              </p>
              <button
                className="restart-button"
                onClick={() => dispatch(quiz.actions.restart())}
              >
                Restart Quiz
              </button>
            </div>
          ) : (
            <>
              <ProgressBar
                currentQuestionIndex={quizState.currentQuestionIndex}
                totalQuestions={quizState.totalQuestions}
              />
              <h2>
                Question {quizState.currentQuestionIndex + 1}/
                {quizState.totalQuestions}
              </h2>
              <h1>Question: {question?.questionText}</h1>
              {question?.imageURL && (
                <img
                  src={question.imageURL}
                  alt="Jeff Bezos"
                  className="founder-image"
                />
              )}
              <form>
                {question?.options?.map((option, index) => (
                  <div
                    key={index}
                    className={`option ${
                      feedbackStyle === "correct" &&
                      index === question.correctAnswerIndex
                        ? "correct"
                        : feedbackStyle === "incorrect"
                        ? index === selectedOption
                          ? "incorrect"
                          : ""
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
                    <label
                      htmlFor={`option${index}`}
                      className="label-with-image"
                    >
                      {question?.logoURLs && (
                        <img
                          src={question.logoURLs[index]}
                          alt={`Logo for ${option}`}
                          className="company-logo"
                        />
                      )}
                      {option}
                    </label>
                  </div>
                ))}
              </form>
              {feedbackStyle && (
                <p className={`feedback ${feedbackStyle}`}>
                  Your answer was{" "}
                  {feedbackStyle === "correct" ? "correct!" : "incorrect."} The
                  correct answer was:{" "}
                  <span style={{ backgroundColor: "lightgreen" }}>
                    {question?.options[question.correctAnswerIndex]}.
                  </span>
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
            </>
          )}
        </div>
      )}
    </div>
  );
};
