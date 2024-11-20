import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LoginRegister.css';
import { useNavigate } from 'react-router-dom';

const LoginRegister = () => {
  const [message, setMessage] = useState('');
  const [isLoginVisible, setIsLoginVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const messageParam = params.get('message');

    if (messageParam === 'login_error') {
      setMessage('Correo o contraseña incorrectos.');
    } else if (messageParam === 'register_success') {
      setMessage('Registro exitoso.');
    }
  }, []);

  // Función para manejar el login
  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post('http://localhost:3000/api/login', { username, password });
      console.log(response.data); // Muestra toda la respuesta en la consola

      if (response.data.userName) {
        console.log("Inicio de sesión exitoso");
        setIsLoginVisible(false); // Ocultar el formulario de inicio de sesión
        navigate('/prueba'); // Redirigir a la página de prueba
      } else {
        setMessage(response.data.message || 'Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error de login:', error.response?.data?.message || 'Error desconocido');
      setMessage('Error en el inicio de sesión');
    }
};

  // Función para manejar el registro
  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post('http://localhost:3000/api/register', { name, email, phone, username, password });
      console.log(response.data);
      setMessage('Registro exitoso. Ahora puedes iniciar sesión.');
    } catch (error) {
      console.error('Error en el registro:', error);
      setMessage('Error en el registro');
    }
  };

  return (
    <main>
      <div className="contenedor__todo">
        <div className="caja__trasera">
          <div className="caja__trasera-login">
            <h3>¿Ya tienes una cuenta?</h3>
            <p>Inicia sesión para entrar en la página</p>
            <button id="btn__iniciar-sesion" onClick={()=>setIsLoginVisible(true)} >Iniciar Sesión</button>
          </div>
          <div className="caja__trasera-register">
            <h3>¿Aún no tienes una cuenta?</h3>
            <p>Regístrate para que puedas iniciar sesión</p>
            <button id="btn__registrarse" onClick={()=>setIsLoginVisible(false)}>Regístrarse</button>
          </div>
        </div>
        <div className="contenedor__login-register">
          {isLoginVisible ? (
            <form onSubmit={handleLogin} className="formulario__login">
              <h2>Iniciar Sesión</h2>
              <input type="text" name="username" placeholder="Nombre de Usuario" required />
              <input type="password" name="password" placeholder="Contraseña" required />
              <button type="submit">Entrar</button>
              <div id="login-message">{message}</div>
            </form>
            
          ) : (
            <form onSubmit={handleRegister} className="formulario__register">
              <h2>Regístrarse</h2>
              <input type="text" name="name" placeholder="Nombre completo" required />
              <input type="email" name="email" placeholder="Correo Electrónico" required />
              <input type="text" name="phone" placeholder="Número de celular" required />
              <input type="text" name="username" placeholder="Usuario" required />
              <input type="password" name="password" placeholder="Contraseña" required />
              <button type="submit">Regístrarse</button>
              <div id="register-message">{message}</div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
};

export default LoginRegister;