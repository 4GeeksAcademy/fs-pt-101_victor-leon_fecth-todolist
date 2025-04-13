import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, deleteTask }) => {
  if (tasks.length === 0) return null;
  return (
    <ul className="task-list">
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} deleteTask={deleteTask} />
      ))}
    </ul>
  );
};

export default TaskList;
