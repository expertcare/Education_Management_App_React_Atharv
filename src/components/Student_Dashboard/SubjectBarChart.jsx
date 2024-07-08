import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useUser } from "../../context/UserContext";
import { Spinner } from "reactstrap";
import { API_URL } from "../../constants";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
  "#FF6666",
]; // Define your colors here

const SubjectBarChart = () => {
  const [examMarks, setExamMarks] = useState([]);
  const [loading, setLoading] = useState(true);

  const { userData } = useUser();

  useEffect(() => {
    const fetchExamMarks = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/exam_marks/${userData._id}`
        );

        setExamMarks(response.data); // Assuming response.data includes both percentage and passFailStatus
        setLoading(false);
      } catch (error) {
        console.error("Error fetching exam marks:", error);
        setLoading(false);
        // Handle error fetching data
      }
    };

    fetchExamMarks();
  }, [userData._id]);

  if (loading) {
    return (
      <Spinner
        color="primary"
        style={{
          height: "3rem",
          width: "3rem",
          margin: "auto",
          marginTop: "20px",
        }}
      >
        Loading...
      </Spinner>
    );
  }

  if (examMarks.length === 0) {
    // Display message if there's an error or examMarks array is empty
    return (
      <div className="container card shadow py-3" style={{ height: "180px" }}>
        <h3 className="text-center">Exam Marks</h3>
        <p className="text-center mt-5">No exam marks found.</p>
      </div>
    );
  }

  return (
    <div className="container card shadow py-3">
      <h3 className="text-center">Exam Marks</h3>
      <div className="d-flex justify-content-center">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={examMarks}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="courseName" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="percentage" fill="#8884d8">
              {examMarks.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
            {/* Display pass/fail status */}
            <Bar dataKey="passFailStatus" fill="#82ca9d">
              {examMarks.map((entry, index) => (
                <Cell key={`cell-${index}`} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SubjectBarChart;
