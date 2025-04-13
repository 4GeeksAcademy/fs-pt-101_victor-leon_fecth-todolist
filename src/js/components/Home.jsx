import React from 'react';
import TaskApp from './TaskApp';
import '../../styles/index.css';

const Home = () => (
  <div className="container">
    <p>Usuario: victorleon</p>
    <h1>Lista de Tareas</h1>
    <TaskApp />
  </div>
);

export default Home;
