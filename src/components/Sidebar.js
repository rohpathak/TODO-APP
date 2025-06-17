import React, { useState, useEffect } from 'react';

const Sidebar = ({ onFilterChange }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedName, setSelectedName] = useState('');

  useEffect(() => {
    onFilterChange(selectedDate, selectedName);
  }, [selectedDate, selectedName, onFilterChange]);

  const handleClear = () => {
    setSelectedDate('');
    setSelectedName('');
  };

  return (
    <div className="sidebar">
      <h3>Filter by Date</h3>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
      <h3>Filter by Name</h3>
      <input
      type='text'
      value={selectedName}
      placeholder='Enter Name'
      onChange={(e) => setSelectedName(e.target.value.toLowerCase())}
      />
      <button onClick={handleClear} className="clear-btn">Clear Filter</button>
    </div>
  );
};

export default Sidebar;
