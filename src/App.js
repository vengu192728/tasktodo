// src/App.js
import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }]);
  };

  const toggleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, isComplete: !task.isComplete } : task
      )
    );
  };

  useEffect(() => {
    const checkIncompleteTasks = () => {
      const incompleteTasks = tasks.filter((task) => !task.isComplete);
      if (incompleteTasks.length > 0) {
        alert(`You have ${incompleteTasks.length} incomplete tasks!`);
      }
    };

    const timer = setInterval(checkIncompleteTasks, 24 * 60 * 60 * 1000);
    return () => clearInterval(timer);
  }, [tasks]);

  return (
    <div className="app-container">
      {/* Theme Toggle in the Top-Right Corner */}
      <div className="theme-toggle-container">
        <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
        <label className="theme-toggle">
          <input
            type="checkbox"
            checked={theme === 'dark'}
            onChange={toggleTheme}
          />
          <span className="slider"></span>
        </label>
      </div>

      <h1>TaskTodo</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} toggleComplete={toggleComplete} />
    </div>
  );
}

export default App;
