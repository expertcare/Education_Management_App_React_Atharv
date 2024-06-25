import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";

const QuestionForm = () => {
  const { userData } = useUser(); // Assuming useUser provides access to user data
  const [courses, setCourses] = useState([]);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState(""); // State to hold selected course
  const [submitMessage, setSubmitMessage] = useState(null); // State for success/error message

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://education-management-server-ruby.vercel.app/api/courses"
        );
        const filteredCourses = response.data.filter(
          (course) => course.faculty === userData.fullName
        );
        setCourses(filteredCourses);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [userData.fullName]); // Fetch courses whenever userData.fullName changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newQuestion = {
        question,
        options,
        correctAnswer,
        courseName: selectedCourse, // Assign selected courseName here
        courseFaculty: userData.fullName,
      };
      await axios.post(
        "https://education-management-server-ruby.vercel.app/api/questions",
        newQuestion
      );
      setSubmitMessage("Question added successfully!");
      // Reset form fields after submission
      setQuestion("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer(0);
      setSelectedCourse("");
    } catch (err) {
      console.error(err);
      setSubmitMessage("Failed to add question. Please try again.");
    } finally {
      // Clear message after 3 seconds
      setTimeout(() => {
        setSubmitMessage(null);
      }, 3000);
    }
  };

  return (
    <div className="container col-md-6">
      <h3 className="text-center mt-5">Add New Questions</h3>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Question:</label>
          <input
            type="text"
            className="form-control"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>

        {options.map((option, index) => (
          <div className="form-group mt-2" key={index}>
            <label>{`Option ${index + 1}:`}</label>
            <input
              type="text"
              className="form-control"
              value={option}
              onChange={(e) => {
                const newOptions = [...options];
                newOptions[index] = e.target.value;
                setOptions(newOptions);
              }}
              required
            />
          </div>
        ))}

        <div className="form-group mt-2">
          <label>Select Course:</label>
          <select
            className="form-control"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            required
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course._id} value={course.name}>
                {course.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group mt-2">
          <label>Correct Answer:</label>
          <select
            className="form-control"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(parseInt(e.target.value))}
            required
          >
            {options.map((option, index) => (
              <option key={index} value={index}>{`Option ${index + 1}`}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Add Question
        </button>
      </form>

      {submitMessage && (
        <div
          className={`alert ${
            submitMessage.includes("successfully")
              ? "alert-success"
              : "alert-danger"
          } mt-3`}
          role="alert"
        >
          {submitMessage}
        </div>
      )}
    </div>
  );
};

export default QuestionForm;
