import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };


  //public/darktheme
  useEffect(() => {
    document.body.className = theme;
    // Apply dark theme background image if dark theme is selected
    if (theme === 'dark') {
      document.body.style.backgroundImage = 'url(/darktheme.jpg)';
      document.body.style.backgroundSize = 'cover'; // Cover the entire body
      document.body.style.backgroundPosition = 'center'; // Center the image
    } else {
      document.body.style.backgroundImage = 'none'; // Remove background image for light theme
    }
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
      {/* Theme Toggle with Icon */}
      <div className="theme-toggle-container">
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '24px',
            color: theme === 'dark' ? '#FFD700' : '#4B5563',
          }}
        >
          <FontAwesomeIcon icon={theme === 'dark' ? faMoon : faSun} />
        </button>
      </div>

      <h1>TaskTodo</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} toggleComplete={toggleComplete} />
    </div>
  );
}

export default App;
