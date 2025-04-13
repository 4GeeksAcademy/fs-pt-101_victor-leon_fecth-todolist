import React, { useState, useEffect } from 'react';
import TaskInput from './TaskInput';
import TaskList from './TaskList';

const USER_API = 'https://playground.4geeks.com/todo/users/victorleon';
const TASKS_API = 'https://playground.4geeks.com/todo/todos/victorleon';
const DELETE_API = 'https://playground.4geeks.com/todo/todos';

const TaskApp = () => {
  const [tasks, setTasks] = useState([]);

  // Obtener tareas usando GET a USER_API
  const fetchTasks = async () => {
    try {
      const response = await fetch(USER_API, { headers: { accept: 'application/json' } });
      if (!response.ok) throw new Error(`Error ${response.status}`);
      const data = await response.json();
      setTasks(data.todos || []);
    } catch (error) {
      console.error('Error al obtener tareas:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Agregar tarea
  const addTask = async (taskLabel) => {
    if (!taskLabel.trim()) return;
    const newTask = { label: taskLabel.trim(), is_done: false };
    try {
      const response = await fetch(TASKS_API, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
      });
      if (!response.ok) throw new Error(`Error ${response.status}`);
      await response.json();
      await fetchTasks();
    } catch (error) {
      console.error('Error al agregar tarea:', error);
    }
  };

  // Eliminar tarea
  const deleteTask = async (taskId) => {
    if (!taskId) {
      console.error('El id de la tarea es indefinido');
      return;
    }
    try {
      const response = await fetch(`${DELETE_API}/${taskId}`, {
        method: 'DELETE',
        headers: { accept: 'application/json' }
      });
      if (!response.ok) throw new Error(`Error ${response.status}`);
      await fetchTasks();
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
    }
  };

  // Eliminar todas las tareas
  const deleteAllTasks = async () => {
    try {
      await Promise.all(
        tasks.map(async (task) => {
          if (!task.id) {
            console.warn('Tarea sin id, no se puede eliminar', task);
            return;
          }
          const response = await fetch(`${DELETE_API}/${task.id}`, {
            method: 'DELETE',
            headers: { accept: 'application/json' }
          });
          if (!response.ok) console.warn(`No se pudo eliminar la tarea ${task.id} (Error ${response.status})`);
        })
      );
      await fetchTasks();
    } catch (error) {
      console.error('Error al eliminar todas las tareas:', error);
    }
  };

  return (
    <div>
      <TaskInput addTask={addTask} />
      <div className="task-counter">
        {tasks.length === 0 ? 'No hay tareas' : `Total de tareas: ${tasks.length}`}
      </div>
      <TaskList tasks={tasks} deleteTask={deleteTask} />
      {tasks.length > 0 && (
        <button className="delete-all-button" onClick={deleteAllTasks}>
          Eliminar todas
        </button>
      )}
    </div>
  );
};

export default TaskApp;
