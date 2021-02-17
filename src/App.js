import React, { useState, useEffect } from 'react';
import Header from './components/Header.js'  
import './App.css';
import backgroundImage from './assets/images/logo_branco.png';
import api from './services/api';

function App() {

  const [Projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data)
    });
  }, []);

  async function handleAddProject() {
    // setProjects([...Projects, `Novo Projeto ${Date.now()}`]); 
    const response = await api.post('projects', {
      title: `Front End com React ${Date.now()}`,
      owner: "Felipe Alves"
    });

    const project = response.data;

    setProjects([...Projects, project]);
  }

  return <Header title='Homepage'> 
    <ul>
      {Projects.map(project => <li key={project.id}>{project.title}</li>)}
    </ul>
    <button type ="button" onClick={handleAddProject}>Adicionar Projeto</button>
  </Header>;
}

export default App;