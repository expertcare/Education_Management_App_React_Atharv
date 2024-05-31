import React, { useState } from "react";

function EditTodo({ todoItem, onSaveEdit, onCancelEdit }) {
  const [editedTodoName, setEditedTodoName] = useState(todoItem.name);
  const [editedDueDate, setEditedDueDate] = useState(todoItem.dueDate);

  const handleSaveEdit = () => {
    onSaveEdit(todoItem.id, editedTodoName, editedDueDate); // Pass todoItem.id instead of todoItem.name
  };

  return (
    <div className="container mt-4">
      <input
        type="text"
        className="form-control mb-2"
        value={editedTodoName}
        onChange={(e) => setEditedTodoName(e.target.value)}
      />
      <input
        type="date"
        className="form-control mb-2"
        value={editedDueDate}
        onChange={(e) => setEditedDueDate(e.target.value)}
      />
      <button className="btn btn-primary m-2" onClick={handleSaveEdit}>
        Save
      </button>
      <button className="btn btn-secondary m-2" onClick={onCancelEdit}>
        Cancel
      </button>
    </div>
  );
}

export default EditTodo;
