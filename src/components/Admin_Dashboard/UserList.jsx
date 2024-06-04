import React, { useState, useEffect } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [editUserId, setEditUserId] = useState(null);
  const [editUsername, setEditUsername] = useState("");
  const [editRole, setEditRole] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/usersData");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const createUser = async () => {
    try {
      await axios.post("http://localhost:3000/usersData", { username, role });
      setUsername("");
      setRole("");
      fetchUsers();
      alert("User created successfully!");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/usersData/${id}`);
      fetchUsers();
      alert("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const updateUser = async () => {
    try {
      await axios.put(`http://localhost:3000/usersData/${editUserId}`, {
        username: editUsername,
        role: editRole,
      });
      setEditUserId(null);
      fetchUsers();
      alert("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleEdit = (user) => {
    setEditUserId(user.id);
    setEditUsername(user.username);
    setEditRole(user.role);
  };

  const renderUsersByRole = (role) => {
    const filteredUsers = users.filter((user) => user.role === role);
    return (
      <div key={role} className="container mt-2">
        <h3 className="h4">{role.toUpperCase()}s</h3>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr className="text-center">
                <th>Username</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="text-center">
                  <td>
                    {user.id === editUserId ? (
                      <input
                        type="text"
                        value={editUsername}
                        onChange={(e) => setEditUsername(e.target.value)}
                      />
                    ) : (
                      user.username
                    )}
                  </td>
                  <td>
                    {user.id === editUserId ? (
                      <select
                        value={editRole}
                        onChange={(e) => setEditRole(e.target.value)}
                      >
                        <option value="student">Student</option>
                        <option value="faculty">Faculty</option>
                        <option value="admin">Admin</option>
                      </select>
                    ) : (
                      user.role
                    )}
                  </td>
                  <td>
                    {user.id === editUserId ? (
                      <>
                        <button
                          className="btn btn-success btn-sm px-4 me-2 m-1"
                          onClick={updateUser}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-secondary btn-sm px-4 m-1"
                          onClick={() => setEditUserId(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-primary btn-sm px-4 me-2 m-1"
                          onClick={() => handleEdit(user)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm px-4 m-1"
                          onClick={() => deleteUser(user.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="margin-top-bottom">
      <div className="container mt-4">
        <h2 className="text-center">Create User</h2>
        <div className="row mt-4">
          <div className="col-md-5">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <select
              className="form-select mb-3"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="col-md-3">
            <button
              className="btn btn-primary"
              onClick={createUser}
              disabled={!username || !role}
            >
              Create User
            </button>
          </div>
        </div>
      </div>
      <h2 className="text-center m-4">Users List</h2>
      {renderUsersByRole("student")}
      {renderUsersByRole("faculty")}
      {renderUsersByRole("admin")}
    </div>
  );
};

export default UserList;
