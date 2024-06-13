import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";

const API_URL = "http://localhost:3000/student_schedule";

const ManageStudentSchedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [newScheduleItem, setNewScheduleItem] = useState({
    time: "",
    subject: "",
    teacher: "",
  });
  const [isEditing, setIsEditing] = useState(null);
  const timeSlots = [
    "9:00 am - 11:00 am",
    "11:00 am - 11:30 am",
    "11:30 am - 1:30 pm",
    "1:30 pm - 2:15 pm",
    "2:15 pm - 4:15 pm",
    "4:15 pm - 5:00 pm",
  ];

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    try {
      const response = await axios.get(API_URL);
      setSchedule(response.data);
    } catch (error) {
      console.error("Error fetching schedule: ", error);
    }
  };

  const addScheduleItem = async () => {
    try {
      await axios.post(API_URL, newScheduleItem);
      fetchSchedule();
      setNewScheduleItem({ time: "", subject: "", teacher: "" });
    } catch (error) {
      console.error("Error adding schedule item: ", error);
    }
  };

  const deleteScheduleItem = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchSchedule();
    } catch (error) {
      console.error("Error deleting schedule item: ", error);
    }
  };

  const updateScheduleItem = async (id, updatedItem) => {
    try {
      await axios.put(`${API_URL}/${id}`, updatedItem);
      fetchSchedule();
      setIsEditing(null);
    } catch (error) {
      console.error("Error updating schedule item: ", error);
    }
  };

  const handleEdit = (index) => {
    setIsEditing(index);
  };

  const handleChange = (index, field, value) => {
    const updatedSchedule = [...schedule];
    updatedSchedule[index][field] = value;
    setSchedule(updatedSchedule);
  };

  return (
    <div className="container margin-top-bottom col-md-8">
      <h2 className="text-center">Manage Class Schedule</h2>
      <div className="mb-3">
        <label htmlFor="timeInput" className="form-label">
          Time:
        </label>
        {isEditing !== null ? (
          <input
            type="text"
            className="form-control"
            value={schedule[isEditing].time}
            onChange={(e) => handleChange(isEditing, "time", e.target.value)}
          />
        ) : (
          <select
            className="form-select"
            id="timeInput"
            value={newScheduleItem.time}
            onChange={(e) =>
              setNewScheduleItem({ ...newScheduleItem, time: e.target.value })
            }
          >
            <option value="">Select Time</option>
            {timeSlots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="subjectInput" className="form-label">
          Subject:
        </label>
        <input
          type="text"
          className="form-control"
          id="subjectInput"
          value={newScheduleItem.subject}
          onChange={(e) =>
            setNewScheduleItem({ ...newScheduleItem, subject: e.target.value })
          }
        />
      </div>
      <div className="mb-3">
        <label htmlFor="teacherInput" className="form-label">
          Teacher:
        </label>
        <input
          type="text"
          className="form-control"
          id="teacherInput"
          value={newScheduleItem.teacher}
          onChange={(e) =>
            setNewScheduleItem({ ...newScheduleItem, teacher: e.target.value })
          }
        />
      </div>
      <div className="text-center">
        <button className="btn my-btn2 mb-3" onClick={addScheduleItem}>
          Add Schedule Item
        </button>
      </div>

      <div className="table-responsive mt-5">
        <table className="table table-bordered">
          <thead>
            <tr className="text-center">
              <th>Time</th>
              <th>Subject</th>
              <th>Teacher</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((item, index) => (
              <tr key={item._id} className="text-center">
                <td>{item.time}</td>
                <td>
                  {isEditing === index ? (
                    <input
                      type="text"
                      className="form-control"
                      value={item.subject}
                      onChange={(e) =>
                        handleChange(index, "subject", e.target.value)
                      }
                    />
                  ) : (
                    item.subject
                  )}
                </td>
                <td>
                  {isEditing === index ? (
                    <input
                      type="text"
                      className="form-control"
                      value={item.teacher}
                      onChange={(e) =>
                        handleChange(index, "teacher", e.target.value)
                      }
                    />
                  ) : (
                    item.teacher
                  )}
                </td>
                <td>
                  {isEditing === index ? (
                    <button
                      className="btn btn-success btn-sm px-3"
                      onClick={() =>
                        updateScheduleItem(item._id, schedule[index])
                      }
                    >
                      <FontAwesomeIcon icon={faSave} />
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary btn-sm px-3 m-1"
                      onClick={() => handleEdit(index)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  )}
                  <button
                    className="btn btn-danger mx-2 btn-sm px-3 m-1"
                    onClick={() => deleteScheduleItem(item._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageStudentSchedule;
