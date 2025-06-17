import React from 'react';

const Navbar = ({ toggleTheme, currentTheme }) => {
  return (
    <nav className="navbar">
      <h1>Todo App</h1>
      <button onClick={toggleTheme}>
         {currentTheme === "light" ? "Dark" : "Light"} Mode
      </button>
    </nav>
  );
};


export default Navbar;
