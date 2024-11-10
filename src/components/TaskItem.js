// src/components/TaskItem.js
import React from 'react';

function TaskItem({ task, toggleComplete }) {
  return (
    <div className="task-item">
      <span className={task.isComplete ? 'completed' : ''}>
        {task.title} - Due: {task.deadline}
      </span>
      <button onClick={() => toggleComplete(task.id)}>
        {task.isComplete ? 'Mark Incomplete' : 'Mark Complete'}
      </button>
    </div>
  );
}

export default TaskItem;
