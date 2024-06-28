import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { API_URL } from "../../constants";

const QuestionList = () => {
  const { userData } = useUser();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/questions`);

        // Filter questions where courseFaculty matches userData.fullName
        const filteredQuestions = response.data.filter(
          (question) => question.courseFaculty === userData.fullName
        );
        setQuestions(filteredQuestions);
      } catch (err) {
        console.error(err);
      }
    };
    fetchQuestions();
  }, [userData.fullName]); // Trigger fetch when userData.fullName changes

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Question Bank</h2>

      <div className="row">
        {questions.map((question) => (
          <div key={question._id} className="col-lg-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{question.question}</h5>
                <ul className="list-group list-group-flush">
                  {question.options.map((option, index) => (
                    <li key={index} className="list-group-item">
                      <input type="radio" disabled />{" "}
                      {/* Use radio button for options */}
                      <span className="m-2">{option}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3">
                  <p className="mb-0">
                    <strong>Correct Answer:</strong>{" "}
                    {question.options[question.correctAnswer]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionList;
