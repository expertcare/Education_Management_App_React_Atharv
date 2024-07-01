import React, { useEffect, useState } from "react";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";
import FileUploadComponent from "./FileUploadComponent";
import { useUser } from "../../context/UserContext";
import axios from "axios";
import { API_URL } from "../../constants";

const FacultyExams = () => {
  const { userData } = useUser();
  const [questions, setQuestions] = useState([]);

  // Function to fetch questions
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

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleFileUpload = (file) => {
    console.log(file);
  };

  return (
    <div className="margin-top-bottom">
      <h2 className="text-center display-6">Manage your Exam</h2>
      <QuestionForm fetchQuestions={fetchQuestions} />
      {/* <p className="text-center fs-5">OR</p> */}
      <FileUploadComponent fetchQuestions={fetchQuestions} />
      <QuestionList questions={questions} fetchQuestions={fetchQuestions} />
    </div>
  );
};

export default FacultyExams;
