import { createSlice } from "@reduxjs/toolkit";
import appleLogo from "../assets/icons/apple.svg";
import googleLogo from "../assets/icons/google.svg";
import microsoftLogo from "../assets/icons/microsoft.svg";
import amazonLogo from "../assets/icons/amazon.svg";
import jeffBezosImage from "../assets/jeffbezoz.png";

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
    questionText: "Which tech company was founded by this person?",
    imageURL: jeffBezosImage,
    options: ["Apple", "Google", "Microsoft", "Amazon"],
    logoURLs: [appleLogo, googleLogo, microsoftLogo, amazonLogo],
    correctAnswerIndex: 3,
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
  {
    id: 6,
    questionText:
      "What is the name of the version control system widely used in software development to track changes in source code?",
    options: ["Mercurial", "SVN", "Git", "Perforce"],
    correctAnswerIndex: 2,
  },
  {
    id: 7,
    questionText:
      "Which popular front-end framework is developed by Facebook for building user interfaces?",
    options: ["Angular", "Vue.js", "React", "Ember.js"],
    correctAnswerIndex: 2,
  },
  {
    id: 8,
    questionText:
      "What does the acronym 'URL' stand for in the context of web development?",
    options: [
      "Uniform Resource Locator",
      "Universal Rendering Language",
      "User Rights Language",
      "Unified Reference Language",
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 9,
    questionText:
      "Who is the inventor of the World Wide Web (WWW) and the HTTP protocol?",
    options: ["Tim Berners-Lee", "Linus Torvalds", "Larry Page", "Sergey Brin"],
    correctAnswerIndex: 0,
  },
  {
    id: 10,
    questionText: "In computer science, what does the acronym 'API' stand for?",
    options: [
      "Application Programming Interface",
      "Advanced Program Integration",
      "Automated Processing Interface",
      "Application Process Integration",
    ],
    correctAnswerIndex: 0,
  },
];

const initialState = {
  questions: techTriviaQuestions,
  answers: [],
  currentQuestionIndex: 0,
  quizOver: false,
  totalQuestions: techTriviaQuestions.length,
  score: 0,
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

      const isCorrect = question.correctAnswerIndex === answerIndex;

      state.answers.push({
        questionId,
        answerIndex,
        question,
        answer: question.options[answerIndex],
        isCorrect,
      });

      // Update the score based on correctness
      if (isCorrect) {
        state.score += 1; // You can adjust the score for correct answers
      } else {
        state.score -= 1; // You can adjust the deduction for incorrect answers
      }
    },

    goToNextQuestion: (state) => {
      if (state.currentQuestionIndex + 1 < state.totalQuestions) {
        state.currentQuestionIndex += 1;
      } else {
        state.quizOver = true;
      }
    },

    restart: (state) => {
      return {
        ...initialState,
        totalQuestions: state.totalQuestions,
        quizOver: false,
      };
    },
  },
});
