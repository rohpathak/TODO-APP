import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, onDelete, onEdit }) => {
  console.log("Todos received by TodoList:", todos);
   if (!todos || todos.length === 0) {
    return <p className="no-todos">No todos found.</p>;
  }
  return (
    <div className="todo-list">
      {/* {todos.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      )} */}
       {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default TodoList;
