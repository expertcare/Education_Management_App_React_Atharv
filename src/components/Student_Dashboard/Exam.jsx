import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Spinner } from "reactstrap";
import { useParams } from "react-router-dom";

const Exam = () => {
  const { courseName } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showExam, setShowExam] = useState(false); // State to manage exam visibility

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `https://education-management-server-ruby.vercel.app/api/questions/${courseName}`
        );
        setQuestions(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
        setError("Failed to fetch questions. Please try again later.");
      }
    };

    if (courseName) {
      fetchQuestions();
    }
  }, [courseName]);

  const handleStartExam = () => {
    setShowExam(true); // Show exam questions when start button is clicked
  };

  if (loading) {
    return (
      <div className="text-center margin-top-bottom">
        <Button color="primary" disabled>
          <Spinner size="sm">Loading...</Spinner>
          <span> Loading</span>
        </Button>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">{error}</div>;
  }

  if (questions.length === 0) {
    return (
      <div className="container text-center d-flex flex-column min-vh-100 justify-content-center animated-text">
        <h2>{`Currently no scheduled exam for ${courseName}`}</h2>
      </div>
    );
  }

  return (
    <div className="container margin-top-bottom">
      <h2 className="text-center  m-4">{`Exam for ${courseName}`}</h2>

      {!showExam && (
        <div className="col-lg-8 mx-auto margin-top-bottom">
          <div className="mb-4">
            <h5>General Instructions:</h5>
            <ol>
              <li>This exam consists of multiple-choice questions.</li>
              <li>
                Read each question carefully before selecting your answer.
              </li>
              <li>Choose the best possible answer for each question.</li>
              <li>Only one answer is correct for each question.</li>
            </ol>
          </div>
          <div className="mb-4">
            <h5>Answering Questions:</h5>
            <ol>
              <li>Click on the radio button next to your chosen answer.</li>
              <li>
                You can change your answer by selecting a different option
                before submitting.
              </li>
              <li>
                Ensure you have selected an answer for each question before
                submitting your exam.
              </li>
            </ol>
          </div>
          <div className="mb-4">
            <h5>Exam Submission:</h5>
            <ol>
              <li>
                Once you have answered all questions, click on the "Submit"
                button.
              </li>
              <li>Review your answers before submitting to ensure accuracy.</li>
              <li>
                Your exam will be automatically submitted once the time limit
                expires, if applicable.
              </li>
            </ol>
          </div>

          <button className="btn btn-primary" onClick={handleStartExam}>
            Start Exam
          </button>
        </div>
      )}

      {showExam && (
        <div className="row mt-5">
          {questions.map((question) => (
            <div key={question._id} className="col-lg-8 mb-4 mx-auto">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{question.question}</h5>
                  <ul className="list-group list-group-flush">
                    {question.options.map((option, index) => (
                      <li key={index} className="list-group-item">
                        <input
                          type="radio"
                          name={`question${question._id}`}
                          id={`option${index}`}
                        />
                        <label htmlFor={`option${index}`} className="m-1">
                          {option}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Exam;
