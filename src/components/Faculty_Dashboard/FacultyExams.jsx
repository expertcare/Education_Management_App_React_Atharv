import React from "react";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

const FacultyExams = () => {
  return (
    <div className="margin-top-bottom">
      <h2 className="text-center display-6">Manage your Exam</h2>
      <QuestionForm />

      <QuestionList />
    </div>
  );
};

export default FacultyExams;
