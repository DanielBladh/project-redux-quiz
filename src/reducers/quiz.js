import { createSlice } from "@reduxjs/toolkit";

const techTriviaQuestions = [
  {
    id: 1,
    questionText:
      "Which programming language is known for its simplicity, readability, and is often used for web development?",
    options: ["Java", "Python", "C++", "Ruby"],
    correctAnswerIndex: 1,
  },
  {
    id: 2,
    questionText:
      "Who is the co-founder of Microsoft and is known for his philanthropic work?",
    options: ["Mark Zuckerberg", "Steve Jobs", "Bill Gates", "Elon Musk"],
    correctAnswerIndex: 2,
  },
  {
    id: 3,
    questionText:
      "What does the following JavaScript code do?\n\n```javascript\nconst add = (a, b) => a + b;\nconsole.log(add(2, 3));\n```",
    options: [
      "Multiplies two numbers",
      "Divides two numbers",
      "Subtracts two numbers",
      "Adds two numbers",
    ],
    correctAnswerIndex: 3,
  },
  {
    id: 4,
    questionText: "Identify the tech company from its logo.",
    options: ["Apple", "Google", "Microsoft", "Amazon"],
    correctAnswerIndex: 1,
  },
  {
    id: 5,
    questionText:
      "Which programming paradigm is characterized by dividing the program into small, reusable parts called objects?",
    options: [
      "Functional Programming",
      "Object-Oriented Programming",
      "Procedural Programming",
      "Declarative Programming",
    ],
    correctAnswerIndex: 1,
  },
  // Add more tech trivia questions as needed
];

const initialState = {
  questions: techTriviaQuestions,
  answers: [],
  currentQuestionIndex: 0,
  quizOver: false,
};

export const quiz = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    submitAnswer: (state, action) => {
      const { questionId, answerIndex } = action.payload;
      const question = state.questions.find((q) => q.id === questionId);

      if (!question) {
        throw new Error(
          "Could not find question! Check to make sure you are passing the question id correctly."
        );
      }

      if (question.options[answerIndex] === undefined) {
        throw new Error(
          `You passed answerIndex ${answerIndex}, but it is not in the possible answers array!`
        );
      }

      state.answers.push({
        questionId,
        answerIndex,
        question,
        answer: question.options[answerIndex],
        isCorrect: question.correctAnswerIndex === answerIndex,
      });
    },

    goToNextQuestion: (state) => {
      state.currentQuestionIndex += 1;

      if (state.currentQuestionIndex === state.questions.length) {
        state.quizOver = true;
      }
    },

    restart: () => {
      return initialState;
    },
  },
});
