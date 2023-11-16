import React from "react";
import "./ProgressBar.css";

export default function ProgressBar({ currentQuestionIndex, totalQuestions }) {
  const progress = (currentQuestionIndex / totalQuestions) * 100;
  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${progress}%` }} />
    </div>
  );
}
