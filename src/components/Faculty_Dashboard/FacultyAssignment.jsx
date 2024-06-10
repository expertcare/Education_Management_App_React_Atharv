import React, { useState, useEffect } from "react";
import axios from "axios";
import AssignmentCheck from "./AssignmentCheck";

const AssignmentList = () => {
  const [assignments, setAssignments] = useState([]);
  const [formData, setFormData] = useState({
    section: "",
    title: "",
    description: "",
    dueDate: "",
  });
  const [editingAssignmentId, setEditingAssignmentId] = useState(null);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = () => {
    axios
      .get("http://localhost:3000/assignments")
      .then((response) => {
        setAssignments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching assignments:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingAssignmentId) {
      // Update existing assignment
      axios
        .put(
          `http://localhost:3000/assignments/${editingAssignmentId}`,
          formData
        )
        .then(() => {
          fetchAssignments();
          resetForm();
        })
        .catch((error) => {
          console.error("Error updating assignment:", error);
        });
    } else {
      // Add new assignment
      axios
        .post("http://localhost:3000/assignments", formData)
        .then(() => {
          fetchAssignments();
          resetForm();
        })
        .catch((error) => {
          console.error("Error adding assignment:", error);
        });
    }
  };

  const handleEdit = (assignment) => {
    setFormData({
      section: assignment.section,
      title: assignment.title,
      description: assignment.description,
      dueDate: assignment.dueDate,
    });
    setEditingAssignmentId(assignment.id);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/assignments/${id}`)
      .then(() => {
        fetchAssignments();
        resetForm();
      })
      .catch((error) => {
        console.error("Error deleting assignment:", error);
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      section: "",
      title: "",
      description: "",
      dueDate: "",
    });
    setEditingAssignmentId(null);
  };

  return (
    <div className="container margin-top-bottom">
      <h2 className="mb-4">Add/Edit Assignments</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="section">Section:</label>
          <input
            type="text"
            className="form-control"
            id="section"
            name="section"
            value={formData.section}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="date"
            className="form-control"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn my-btn2 mt-2 ">
          {editingAssignmentId ? "Update" : "Submit"}
        </button>
        {editingAssignmentId && (
          <button
            type="button"
            className="btn my-btn2 m-2 mt-3"
            style={{ backgroundColor: "#677583" }}
            onClick={resetForm}
          >
            Cancel
          </button>
        )}
      </form>
      <h2 className="mt-4 mb-4">Current Assignments</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr className="text-center">
              <th>Section</th>
              <th>Title</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment.id} className="text-center">
                <td>{assignment.section}</td>
                <td>{assignment.title}</td>
                <td>{assignment.description}</td>
                <td>{assignment.dueDate}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm px-4 m-2"
                    onClick={() => handleEdit(assignment)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm px-3 m-2"
                    onClick={() => handleDelete(assignment.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AssignmentCheck />
    </div>
  );
};

export default AssignmentList;