import React from "react";
import AttendanceData from "./AtendanceData";
import StudentCounter from "../Student_Dashboard/StudentCounter";
import FacultySubject from "./FacultySubject";

const FacultyDataDashboard = () => {
  return (
    <div className="container margin-top-bottom">
      <h1 className="text-center mb-4 display-6">Faculty Data Dashboard</h1>
      <div className="row">
        <div className="col-lg-7 col-md-12 mb-4">
          <div className="card shadow">
            <div className="card-body">
              <AttendanceData />
            </div>
          </div>
        </div>

        <div className="col-lg-5 col-md-12 d-flex mt-5">
          <div className="row">
            <div className="col-md-6 col-lg-12 mb-4">
              <div className="card shadow">
                <div className="card-body">
                  <StudentCounter />
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-12 mb-4">
              <div className="card shadow">
                <div className="card-body">
                  <FacultySubject />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <p>New row</p>
      </div>
    </div>
  );
};

export default FacultyDataDashboard;
