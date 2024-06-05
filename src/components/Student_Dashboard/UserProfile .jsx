import React from "react";
import { useUser } from "../../context/UserContext";

const UserProfile = () => {
  const { userData } = useUser();
  return (
    <div className="container margin-top-bottom">
      <h2 className="text-center mb-4">Employee Profile</h2>
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
                    <p className="card-text h5 mb-4">
                      {userData.company.title}
                    </p>
                  </div>
                </div>

                <ul className="list-group list-group-flush mt-2">
                  <li className="list-group-item">
                    <strong>Company Name:</strong> {userData.company.name}{" "}
                    {userData.lastName}
                  </li>
                  <li className="list-group-item">
                    <strong>Address:</strong> {userData.company.address.address}
                  </li>
                  <li className="list-group-item">
                    <strong>City:</strong> {userData.company.address.city}
                  </li>
                  <li className="list-group-item">
                    <strong>State:</strong> {userData.company.address.state}
                  </li>
                  <li className="list-group-item">
                    <strong>Country</strong> {userData.company.address.country}
                  </li>

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

export default UserProfile;
