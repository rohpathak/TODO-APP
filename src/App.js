import React, { useState, useMemo, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todos, setTodos] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [filterName, setFilterName] = useState("");
  const [editTodo, setEditTodo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 10;

  const addTodo = (todo) => {
    setTodos([todo, ...todos]);
  };

  const updateTodo = (updatedTodo) => {
    setTodos(todos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t)));
    setEditTodo(null);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((t) => t.id !== id);
    setTodos(updatedTodos);
    // if ((currentPage - 1) * todosPerPage >= updatedTodos.length) {
    //   setCurrentPage((prev) => Math.max(prev - 1, 1));
    // }
    const totalPages = Math.ceil(updatedTodos.length / todosPerPage);
  if (currentPage > totalPages) {
    setCurrentPage(totalPages);
  }
  };

  const handleFilterChange = (date, name) => {
    setFilterDate(date);
    setFilterName(name);
    setCurrentPage(1);
  };
  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      const matchDate = filterDate === "" || todo.date === filterDate;
      const matchName =
        filterName === "" ||
        (todo.task &&
          todo.task?.toLowerCase().includes(filterName.toLowerCase()));
      return matchDate && matchName;
    });
  }, [todos, filterDate, filterName]);

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);
  console.log("Current page:", currentPage);
  console.log("Filtered todos:", filteredTodos.length);
  console.log("Total pages:", Math.ceil(filteredTodos.length / todosPerPage));
  console.log(
    "Current page todos:",
    currentTodos.map((todo) => todo.task)
  );
  console.log("Todos:", todos.length);

  useEffect(() => {
    const sampleTodos = Array.from({ length: 25 }, (_, i) => ({
      id: uuidv4(),
      task: `Sample Task ${i + 1}`,
      date: new Date().toISOString().split("T")[0], // today's date
    }));
    setTodos(sampleTodos);
  }, []);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.body.className = theme === "dark" ? "dark" : "";
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="app-container">
      <Navbar toggleTheme={toggleTheme} currentTheme={theme} />
      <div className="main-content">
        <Sidebar onFilterChange={handleFilterChange} />
        <div className="todo-section">
          <TodoForm
            key={editTodo?.id || "new"}
            addTodo={addTodo}
            editTodo={editTodo}
            updateTodo={updateTodo}
          />
          <TodoList
            todos={currentTodos}
            onDelete={deleteTodo}
            onEdit={setEditTodo}
          />
          {/* <div className="pagination">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {Array.from(
              { length: Math.ceil(filteredTodos.length / todosPerPage) },
              (_, i) => i + 1
            ).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={page === currentPage ? "active-page" : ""}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => {
                setCurrentPage((prev) => {
                  const nextPage =
                    prev < Math.ceil(filteredTodos.length / todosPerPage)
                      ? prev + 1
                      : prev;
                  console.log("Navigating to page:", nextPage);
                  return nextPage;
                });
              }}
              disabled={
                currentPage >= Math.ceil(filteredTodos.length / todosPerPage)
              }
            >
              Next
            </button>
          </div> */}
          <div className="pagination">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {Array.from(
              { length: Math.ceil(filteredTodos.length / todosPerPage) },
              (_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    onClick={() => {
                      console.log("Go to page:", page);
                      setCurrentPage(page); // Sets current page to the one clicked
                    }}
                    className={currentPage === page ? "active-page" : ""}
                  >
                    {page}
                  </button>
                );
              }
            )}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(
                  prev +1 , Math.ceil(filteredTodos.length / todosPerPage)
                    // ? prev + 1
                    // : prev
                ))
              }
              disabled={
                currentPage >= Math.ceil(filteredTodos.length / todosPerPage)
              }
            >
              Next
            </button>

            {/* <button
              onClick={() => {
                setCurrentPage((prev) => {
                  const next = prev + 1;
                  console.log("Next page:", next);
                  return next;
                });
              }}
              disabled={
                currentPage >= Math.ceil(filteredTodos.length / todosPerPage)
              }
            >
              Next
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
