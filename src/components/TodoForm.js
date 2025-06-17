import React, { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

const TodoForm = ({ addTodo, editTodo, updateTodo }) => {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("Low");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const validate = useCallback(
    (fieldValues = {}) => {
      const newErrors = { ...errors };

      if ("task" in fieldValues) {
        if (!fieldValues.task.trim()) {
          newErrors.task = "Task is required.";
        } else if (fieldValues.task.trim().length < 3) {
          newErrors.task = "Task must be at least 3 characters.";
        } else {
          delete newErrors.task;
        }
      }

      if ("date" in fieldValues) {
        if (!fieldValues.date) {
          newErrors.date = "Date is required.";
        } else if (
          new Date(fieldValues.date) < new Date(new Date().toDateString())
        ) {
          newErrors.date = "Date must be today or in the future.";
        } else {
          delete newErrors.date;
        }
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    // [errors]
  );

  useEffect(() => {
    if (editTodo) {
      console.log("Edit mode loaded:", editTodo);
      setTask(editTodo.task);
      setDate(editTodo.date);
      setDescription(editTodo.description || "");
      setPriority(editTodo.priority || "Low");
      validate({ task: editTodo.task, date: editTodo.date });
    }
  }, [editTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task || !date) return;

    const isValid = validate(); // validates all fields

    if (!isValid) return;

    const todo = {
      id: editTodo ? editTodo.id : uuidv4(),
      task,
      date,
      priority,
      description,
    };
    if (new Date(date) < new Date(new Date().toDateString())) {
      alert("Please select today or a future date.");
      return;
    }

    if (editTodo) {
      updateTodo(todo);
    } else {
      addTodo(todo);
    }

    setTask("");
    setDate("");
    setDescription("");
    setPriority("Low");
    setErrors({});
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter task..."
        value={task}
        onChange={(e) => {
          setTask(e.target.value);
          validate({ task: e.target.value });
        }}
        onKeyDown={handleKeyDown}
      />
      {errors.task && <small className="error-text">{errors.task}</small>}
      <textarea
        placeholder="Enter task details..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <input
        type="date"
        value={date}
        min={new Date().toISOString().split("T")[0]}
        onChange={(e) => {
          setDate(e.target.value);
          validate({ date: e.target.value });
        }}
      />
      {errors.date && <small className="error-text">{errors.date}</small>}
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Low">Low Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="High">High Priority</option>
      </select>
      <button type="submit">{editTodo ? "Update" : "Add"}</button>
    </form>
  );
};

export default TodoForm;
