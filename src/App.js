import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Agregar Navigate aquí
import Inicio from './Inicio.js';
import LoginRegister from './LoginRegister.js';
import MenuFunctions from './MenuFunctions.js';
import AdminMenu from './menuAdmin.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Redirige de "/" a "/home" */}
          <Route path="/" element={<Navigate to="/home" />} />
          {/* Ruta por defecto de la página o tras un logout */}
          <Route path="/home" element={<Inicio />} />
          {/* Ruta en donde vas a iniciar o registrar sesión */}
          <Route path="/loginregister" element={<LoginRegister />} />
          {/* Ruta a la que rediriges tras hacer un login */}
          <Route path="/menufunctions" element={<MenuFunctions />} />
          {/* Ruta a la que rediriges tras hacer un login */}
          <Route path="/AdminMenu" element={<AdminMenu />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
