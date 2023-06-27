import React, { useState } from "react";
import axios from "axios";
//Promise based HTTP client for the browser and node.js

const table = { sports: 21, history: 23, politics: 24, science: 18 };

//Api Used for questions
const API_ENDPOINT = "https://opentdb.com/api.php?";

const AppContext = createContext();

//defining states
const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(false);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "sports",
    difficulty: "easy",
    type: "boolean",
  });

  //api request
  const fetchApi = async (url) => {
    setWaiting(true);
    setLoading(true);

    try {
      const response = await axios.get(url);
      if (response) {
        const data = response.data.result;
        if (data.length > 0) {
          setQuestions(data);
          setLoading(false);
          setWaiting(false);
          setError(false);
        } else {
          setWaiting(true);
          setError(true);
        }
      } else {
        setWaiting(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
};

const nextQuestion = () => {
  setIndex((prevIndex) => {
    if (prevIndex === questions.length - 1) {
      openModal();
      return questions.length - 1;
    } else {
      return prevIndex + 1;
    }
  });
};

const checkAnswer = (value) => {
  if (value) {
    setCorrect((prev) => prev + 1);
  }
  nextQuestion();
};

const openModal = () => {
  setIsModalOpen(true);
};

const closeModal = () => {
  setIsModalOpen(false);
  setIndex(0);
  setCorrect(0);
  setWaiting(true);
};

const changeHandler = (e) => {
  const { value, name } = e.target;
  setQuiz({ ...quiz, [name]: value });
};

const submitHandler = (e) => {
  e.preventDefault();
  const { amount, category, difficulty, type } = quiz;
  let url = `${API_ENDPOINT}amount=${amount}&category=${table[category]}&difficulty=${difficulty}&type=${type}`;
  fetchApi(url);
};

return (
  <AppContext.Provider
    value={{
      waiting,
      loading,
      index,
      questions,
      error,
      correct,
      nextQuestion,
      checkAnswer,
      checkAnswer,
      isModalOpen,
      closeModal,
      quiz,
      changeHandler,
      submitHandler,
    }}
  >
    {children}
  </AppContext.Provider>
);
