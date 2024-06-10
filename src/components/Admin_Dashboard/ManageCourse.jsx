import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Button, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const API_URL = "http://localhost:3000/courses";

function App() {
  const [courses, setCourses] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedCourse, setEditedCourse] = useState({
    id: null,
    name: "",
    faculty: "",
  });
  const [newCourse, setNewCourse] = useState({ name: "", faculty: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAddCourse = async () => {
    try {
      await axios.post(API_URL, newCourse);
      setShowAddModal(false);
      setNewCourse({ name: "", faculty: "" });
      fetchData();
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleEditCourse = async () => {
    try {
      await axios.put(`${API_URL}/${editedCourse.id}`, editedCourse);
      setShowEditModal(false);
      setEditedCourse({ id: null, name: "", faculty: "" });
      fetchData();
    } catch (error) {
      console.error("Error editing course:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCourse({ ...editedCourse, [name]: value });
  };

  const handleEditModalShow = (id, name, faculty) => {
    setEditedCourse({ id, name, faculty });
    setShowEditModal(true);
  };

  return (
    <Container className="margin-top-bottom">
      <h1>Course Management</h1>
      <Button className="my-2" onClick={() => setShowAddModal(true)}>
        Add Course
      </Button>
      <Table className="mt-4 text-center" striped bordered hover>
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Faculty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.id}</td>
              <td>{course.name}</td>
              <td>{course.faculty}</td>
              <td>
                <Button
                  variant="primary"
                  className="btn-sm px-3 m-1"
                  onClick={() =>
                    handleEditModalShow(course.id, course.name, course.faculty)
                  }
                >
                  <FontAwesomeIcon icon={faEdit} />
                </Button>{" "}
                <Button
                  variant="danger"
                  className="btn-sm px-3 m-1"
                  onClick={() => handleDeleteCourse(course.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCourseName">
              <Form.Label>Course Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter course name"
                name="name"
                value={newCourse.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formFaculty">
              <Form.Label>Faculty</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter faculty name"
                name="faculty"
                value={newCourse.faculty}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddCourse}>
            Add Course
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEditCourseName">
              <Form.Label>Course Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter course name"
                name="name"
                value={editedCourse.name}
                onChange={handleEditInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formEditFaculty">
              <Form.Label>Faculty</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter faculty name"
                name="faculty"
                value={editedCourse.faculty}
                onChange={handleEditInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditCourse}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default App;
