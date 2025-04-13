import React from 'react';

const TaskItem = ({ task, deleteTask }) => (
  <li className="task-item">
    <span>{task.label}</span>
    <button className="delete-item-button" onClick={() => deleteTask(task.id)}>
      &#x2715;
    </button>
  </li>
);

export default TaskItem;
