import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";

const AssignmentCheck = ({ assignments }) => {
  const [submissions, setSubmissions] = useState([]);
  const { userData } = useUser();

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = () => {
    axios
      .get(
        "https://education-management-server-ruby.vercel.app/api/submissions"
      )
      .then((response) => {
        const fetchedSubmissions = response.data;

        // Fetch grades for each submission
        axios
          .get("https://education-management-server-ruby.vercel.app/api/grades")
          .then((gradesResponse) => {
            const gradesMap = {};
            gradesResponse.data.forEach((grade) => {
              gradesMap[grade.submissionId] = grade.grade;
            });

            // Merge grades into submissions
            const submissionsWithGrades = fetchedSubmissions.map(
              (submission) => ({
                ...submission,
                grade: gradesMap[submission._id] || "--", // Set grade or default to "--" if not graded
              })
            );

            setSubmissions(submissionsWithGrades);
          });
      })
      .catch((error) => {
        console.error("Error fetching submissions:", error);
      });
  };

  const handleGradeChange = (event, submissionId) => {
    const { value } = event.target;
    setSubmissions((prevSubmissions) =>
      prevSubmissions.map((submission) =>
        submission._id === submissionId
          ? { ...submission, selectedGrade: value }
          : submission
      )
    );
  };

  const handleAddGrade = (submissionId) => {
    const selectedSubmission = submissions.find(
      (submission) => submission._id === submissionId
    );
    if (!selectedSubmission || !selectedSubmission.selectedGrade) {
      alert("Please select a grade before submitting.");
      return;
    }

    const gradeData = {
      submissionId: submissionId,
      grade: selectedSubmission.selectedGrade,
      gradedBy: userData.fullName,
    };

    axios
      .post(
        "https://education-management-server-ruby.vercel.app/api/grades",
        gradeData
      )
      .then(() => {
        fetchSubmissions(); // Refresh submissions after adding grade
        // Optionally, clear the selected grade after submission
        setSubmissions((prevSubmissions) =>
          prevSubmissions.map((submission) =>
            submission._id === submissionId
              ? {
                  ...submission,
                  grade: selectedSubmission.selectedGrade,
                  selectedGrade: null,
                }
              : submission
          )
        );
      })
      .catch((error) => {
        console.error("Error adding grade:", error);
      });
  };

  const convertToIST = (utcDateString) => {
    const date = new Date(utcDateString);
    return date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
  };

  const filteredAssignments = assignments.filter(
    (assignment) => assignment.userId === userData.id
  );

  return (
    <div>
      <h2 className="m-5 display-6 text-center">Assignment Submissions</h2>

      {filteredAssignments.map((assignment) => {
        const assignmentId = assignment._id;

        const assignmentSubmissions = submissions.filter(
          (submission) => submission.assignmentId === assignmentId
        );

        if (assignmentSubmissions.length === 0) {
          return (
            <div key={assignmentId}>
              <p className="fs-5 mt-4">
                Assignment: {assignment.section} - {assignment.title}
              </p>
              <p className="fs-5 m-5 text-center animated-text">
                No one has submitted this assignment yet.
              </p>
            </div>
          );
        }

        return (
          <div key={assignmentId}>
            <p className="fs-5 mt-4">
              Assignment: {assignment.section} - {assignment.title}
            </p>
            <div className="table-responsive">
              <table className="table table-striped table-bordered text-center">
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Student Name</th>
                    <th>Date Submitted</th>
                    <th>File</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {assignmentSubmissions.map((submission) => (
                    <tr key={submission._id}>
                      <td>
                        {submission.userId.substring(
                          submission.userId.length - 8
                        )}
                      </td>
                      <td>{submission.userName}</td>
                      <td>{convertToIST(submission.submissionDate)}</td>
                      <td>
                        <button className="btn my-btn2 btn-sm">
                          <a
                            href={submission.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              textDecoration: "none",
                              color: "white",
                            }}
                          >
                            View
                          </a>
                        </button>
                      </td>
                      <td>
                        {submission.grade === "--" ? (
                          <div>
                            <select
                              className="m-1"
                              value={submission.selectedGrade || ""}
                              onChange={(event) =>
                                handleGradeChange(event, submission._id)
                              }
                            >
                              <option value="">Select Grade</option>
                              <option value="A">A</option>
                              <option value="B">B</option>
                              <option value="C">C</option>
                              <option value="D">D</option>
                              <option value="F">F</option>
                            </select>
                            <button
                              className="btn btn-sm btn-primary ms-2 m-1"
                              onClick={() => handleAddGrade(submission._id)}
                            >
                              Add Grade
                            </button>
                          </div>
                        ) : (
                          <span>{submission.grade}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AssignmentCheck;
