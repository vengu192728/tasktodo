import React, { useState } from 'react';
import axios from 'axios'; // Import axios

function TaskForm({ addTask }) {
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState(''); // Added state for description
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && deadline && description) {
      // Task data
      const taskData = { title, deadline, description, isComplete: false };

      setIsLoading(true);  // Set loading state to true
      setError('');  // Clear previous error

      try {
        // Send POST request to backend API
        const response = await axios.post('http://localhost:8080/tasks', taskData);

        // On success, add the task to the state
        addTask(response.data); // Assuming the backend responds with the created task

        // Clear the form after submission
        setTitle('');
        setDeadline('');
        setDescription('');
      } catch (err) {
        setError('Failed to add task. Please try again.'); // Set error message on failure
        console.error('Error adding task:', err);
      } finally {
        setIsLoading(false);  // Set loading state to false after request
      }
    } else {
      setError('Please fill in all fields.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        required
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Adding Task...' : 'Add Task'}
      </button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
}

export default TaskForm;
