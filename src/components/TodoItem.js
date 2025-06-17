import React from "react";

const TodoItem = ({ todo, onDelete, onEdit }) => {
  return (
    <div key={todo.id} className="todo-item">
      <div>
        <strong>{todo.task}</strong> <span>({todo.date})</span>
        {todo.description && (
          <details>
            <summary style={{ cursor: "pointer" }}>Task Details</summary>
            <p> {todo.description}</p>
          </details>
        )}
        <div className={`priority-badge ${todo.priority?.toLowerCase()}`}>
          {todo.priority}
        </div>
      </div>
      <div className="buttons">
        <button onClick={() => onEdit(todo)}>✏️ Edit</button>
        <button onClick={() => onDelete(todo.id)}>🗑️ Delete</button>
      </div>
    </div>
  );
};

export default TodoItem;
