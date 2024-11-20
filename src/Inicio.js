import React from 'react';
import './Inicio.css';
import { useNavigate } from 'react-router-dom';

const Inicio = () => {
  const navigate = useNavigate(); // Crea la función de navegación

  // Función para manejar el clic en el botón "Comenzar"
  const handleStartClick = () => {
    navigate('/loginregister'); // Redirige a la página de Login/Register
  };

  return (
    <div className="inicio-container">
      <header className="inicio-header">
        <h1>De Gusto</h1>
        <p>¡Nos encargamos de hacer conocer sus negocios!</p>
      </header>

      <div className="inicio-banner">
        <h2>Bienvenido a nuestra página web</h2>
        <p>¡Descubre cómo podemos ayudarte!</p>
        <button className="inicio-button" onClick={handleStartClick}>Comenzar</button>
      </div>

      <section className="inicio-description">
        <h3>Sobre Nosotros</h3>
        <p>
          Nuestro sistema se encarga del registro de negocios como por ejemplo restaurantes y sus platos con el fin de hacerlo conocer por su ubicación y beneficiando asi a los dueños de negocios. Todos los datos registrados se mostraran en nuestra aplicación móvil orientada para los clientes que buscan los negocios de su interés y cercanos para ellos que usted registre donde através calificaciones y reseñas puede irse conociendo dentro de DeGusto incrementando su influencia en el área de negocio que haya seleccionado. Para el caso de restaurantes nuestro sistema tiene la capacidad de coordinar reservas con los clientes.
        </p>
      </section>

      <footer className="inicio-footer">
        <p>© 2024 DeGusto. Todos los derechos reservados.</p>
        <div className="social-links">
          <a href="#!">Facebook</a>
          <a href="#!">Twitter</a>
          <a href="#!">Whatsapp</a>
        </div>
      </footer>
    </div>
  );
};

export default Inicio;