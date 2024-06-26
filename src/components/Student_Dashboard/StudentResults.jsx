import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Button, Spinner, Card, CardBody, CardHeader } from "reactstrap";
import { useUser } from "../../context/UserContext";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const StudentResults = () => {
  const { userData } = useUser(); // useUser provides userData with _id and fullName
  const [examMarks, setExamMarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const contentRef = useRef(null);

  useEffect(() => {
    const fetchExamMarks = async () => {
      try {
        const response = await axios.get(
          "https://education-management-server-ruby.vercel.app/api/exam_marks"
        );
        setExamMarks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching exam marks:", error);
        setLoading(false);
        // Handle error fetching data (e.g., set a state for error message)
      }
    };

    fetchExamMarks();
  }, []);

  // Filter exam marks based on userData._id (assuming it represents studentId)
  const filteredExamMarks = examMarks.filter(
    (mark) => mark.studentId === userData._id
  );

  // Group exam marks by course name
  const groupedMarks = filteredExamMarks.reduce((acc, mark) => {
    if (!acc[mark.courseName]) {
      acc[mark.courseName] = [];
    }
    acc[mark.courseName].push(mark);
    return acc;
  }, {});

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    let position = 0;

    doc.setFontSize(18);
    doc.text(`Student Results - ${userData.fullName}`, 14, 15);
    position += 20; // Increase vertical position after title

    Object.keys(groupedMarks).forEach((courseName) => {
      doc.setFontSize(14);
      doc.text(courseName, 14, position + 5);
      position += 5; // Increase vertical position after course name

      const tableData = groupedMarks[courseName].map((mark) => [
        `${new Date(mark.timestamp).toLocaleDateString()} at ${new Date(
          mark.timestamp
        ).toLocaleTimeString()}`,
        `${mark.marks} out of ${Object.keys(mark.answers).length}`,
        `${mark.percentage}%`,
      ]);

      doc.autoTable({
        startY: position + 5,
        head: [["Submitted On", "Marks", "Percentage"]],
        body: tableData,
      });

      position = doc.autoTable.previous.finalY + 5; // Update position after table
    });

    doc.save(`student_results_${userData.fullName}.pdf`);
  };

  return (
    <div className="container text-center margin-top-bottom">
      <div className="col-md-8 offset-md-2 min-vh-100" ref={contentRef}>
        <h2 className="m-5 display-6">Student Results</h2>

        <p className="fs-5 mb-5">
          Hello, {userData.fullName}. Your Results are as follows:
        </p>

        {loading ? (
          <div className="text-center margin-top-bottom">
            <Button color="primary" disabled>
              <Spinner size="sm" /> Loading...
            </Button>
          </div>
        ) : Object.keys(groupedMarks).length === 0 ? (
          <p className="fs-5 mt-5 animated-text">No exam marks found.</p>
        ) : (
          <div className="row row-cols-1 row-cols-md-1 g-3 mt-2">
            {Object.keys(groupedMarks).map((courseName) => (
              <div key={courseName} className="col">
                {groupedMarks[courseName].map((mark) => (
                  <Card key={mark._id} className="mb-4">
                    <CardHeader>
                      <h4>{courseName}</h4>
                    </CardHeader>
                    <CardBody>
                      <p className="card-text">
                        Submitted on{" "}
                        {new Date(mark.timestamp).toLocaleDateString()} at{" "}
                        {new Date(mark.timestamp).toLocaleTimeString()}
                      </p>
                      <p className="card-text">
                        <strong>Marks:</strong> {mark.marks} out of{" "}
                        {Object.keys(mark.answers).length}
                      </p>
                      <p className="card-text">
                        <strong>Percentage:</strong> {mark.percentage}%
                      </p>
                    </CardBody>
                  </Card>
                ))}
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-3">
          <Button color="primary" onClick={handleDownloadPDF}>
            Download Results as PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentResults;
