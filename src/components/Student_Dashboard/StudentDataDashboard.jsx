import React from "react";
import SubjectBarChart from "./SubjectBarChart";
import StudentCounter from "./StudentCounter";

const StudentDataDashboard = () => {
  return (
    <div className="container margin-top-bottom">
      <h1 className="text-center mb-4 display-6">
        Student Data Visualization Dashboard
      </h1>

      <div className="row justify-content-around">
        <div className="col-lg-7 col-md-12 mb-4">
          <SubjectBarChart />
        </div>

        <div className="col-lg-4 col-md-12 mb-4">
          <div className="card shadow">
            <div className="card-body">
              <StudentCounter />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDataDashboard;
