import React from "react";
import { useUser } from "../../context/UserContext";

const StudentProfile = () => {
  const { userData } = useUser();
  return (
    <div className="container margin-top-bottom">
      <h2 className="text-center mb-4">Student Profile</h2>
      {userData && (
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-12 m-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex gap-4">
                  <img
                    src={userData.image}
                    alt="student profile"
                    className="img-fluid rounded-lg"
                  />
                  <div>
                    <h3 className="card-title text-uppercase text-decoration-underline mb-3">
                      {userData.firstName} {userData.lastName}
                    </h3>
                    <p className="card-text h5 mb-4">Student</p>
                  </div>
                </div>

                <ul className="list-group list-group-flush mt-2">
                  <li className="list-group-item">
                    <strong>Full Name:</strong> {userData.firstName}{" "}
                    {userData.lastName}
                  </li>
                  <li className="list-group-item">
                    <strong>Username:</strong> {userData.username}
                  </li>
                  <li className="list-group-item">
                    <strong>Email:</strong> {userData.email}
                  </li>
                  <li className="list-group-item">
                    <strong>Gender:</strong> {userData.gender}
                  </li>
                  <li className="list-group-item">
                    <strong>Birth Date:</strong> {userData.birthDate}
                  </li>

                  {/* <li className="list-group-item">
                    <strong>Address:</strong> {userData.address.address},{" "}
                    {userData.address.city}
                  </li> */}

                  {/* Add more user data as needed */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentProfile;
