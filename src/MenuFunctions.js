import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MenuFunctions.css';
import Resumen from './Resumen.js';
import AgregarNegocio from './AgregarNegocio.js';
import EditarNegocio from './EditarNegocio.js';
import EliminarNegocio from './EliminarNegocio.js';
import AgregarPlato from './AgregarPlato.js';
import EditarPlato from './EditarPlato.js';
import EliminarPlato from './EliminarPlato.js';

const MenuFunctions = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeComponent, setActiveComponent] = useState('');
  const [menuVisible, setMenuVisible] = useState(true);
  const navigate = useNavigate();

  const toggleSubMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const loadComponent = (componentName) => {
    setActiveComponent(componentName);
  };

  const toggleMenuVisibility = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLogout = () => {
    navigate('/home');
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'resumen':
        return <Resumen />;
      case 'agregarnegocio':
        return <AgregarNegocio />;
      case 'editarnegocio':
        return <EditarNegocio />;
      case 'eliminarnegocio':
        return <EliminarNegocio />;
      case 'agregarplato':
        return <AgregarPlato />;
      case 'editarplato':
        return <EditarPlato />;
      case 'eliminarplato':
        return <EliminarPlato />;
      default:
        return <p>Selecciona una opción del menú</p>;
    }
  };

  return (
    <div className="container">
      {/* Nueva Barra Superior */}
      <header className="header-bar">
        <button onClick={toggleMenuVisibility} className="btn-hide-menu">
          {menuVisible ? 'Ocultar Menú' : 'Mostrar Menú'}
        </button>
        <div className="user-info">
          <span className="welcome-text">Bienvenido, Nombre</span>
          <button onClick={handleLogout} className="btn-logout">Cerrar Sesión</button>
        </div>
      </header>

      <div className="content-wrapper">
        {/* Menú de Funciones lateral */}
        {menuVisible && (
          <section className="navLateral">
            <div className="navLateral-body">
              <div className="navLateral-body-logo text-center tittles">
                <i className="zmdi zmdi-close btn-menu"></i> Inicio
              </div>
              <nav className="full-width">
                <ul className="full-width list-unstyle menu-principal">
                  <li className="full-width">
                    <a href="#!" 
                       className="full-width" 
                       onClick={() => loadComponent('resumen')}>
                      <div className="navLateral-body-cl">
                        <i className="zmdi zmdi-view-dashboard"></i>
                      </div>
                      <div className="navLateral-body-cr">
                        RESUMEN
                      </div>
                    </a>
                  </li>
                  <li className="full-width divider-menu-h"></li>
                  <li className="full-width">
                    <a href="#!" 
                       className="full-width btn-subMenu" 
                       onClick={() => toggleSubMenu('negocios')}>
                      <div className="navLateral-body-cl">
                        <i className="zmdi zmdi-case"></i>
                      </div>
                      <div className="navLateral-body-cr">
                        NEGOCIOS
                      </div>
                      <span className={`zmdi zmdi-chevron-left ${activeMenu === 'negocios' ? 'active' : ''}`}></span>
                    </a>
                    {activeMenu === 'negocios' && (
                      <ul className="full-width menu-principal sub-menu-options">
                        <li className="full-width">
                          <a href="#!" className="full-width" onClick={() => loadComponent('agregarnegocio')}>
                            <div className="navLateral-body-cr">AGREGAR NEGOCIO</div>
                          </a>
                        </li>
                        <li className="full-width">
                          <a href="#!" className="full-width" onClick={() => loadComponent('editarnegocio')}>
                            <div className="navLateral-body-cr">EDITAR NEGOCIO</div>
                          </a>
                        </li>
                        <li className="full-width">
                          <a href="#!" className="full-width" onClick={() => loadComponent('eliminarnegocio')}>
                            <div className="navLateral-body-cr">ELIMINAR NEGOCIO</div>
                          </a>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li className="full-width divider-menu-h"></li>
                  <li className="full-width">
                    <a href="#!" 
                       className="full-width btn-subMenu" 
                       onClick={() => toggleSubMenu('platos')}>
                      <div className="navLateral-body-cl">
                        <i className="zmdi zmdi-case"></i>
                      </div>
                      <div className="navLateral-body-cr">
                        PLATOS
                      </div>
                      <span className={`zmdi zmdi-chevron-left ${activeMenu === 'platos' ? 'active' : ''}`}></span>
                    </a>
                    {activeMenu === 'platos' && (
                      <ul className="full-width menu-principal sub-menu-options">
                        <li className="full-width">
                          <a href="#!" className="full-width" onClick={() => loadComponent('agregarplato')}>
                            <div className="navLateral-body-cr">AGREGAR PLATO</div>
                          </a>
                        </li>
                        <li className="full-width">
                          <a href="#!" className="full-width" onClick={() => loadComponent('editarplato')}>
                            <div className="navLateral-body-cr">EDITAR PLATO</div>
                          </a>
                        </li>
                        <li className="full-width">
                          <a href="#!" className="full-width" onClick={() => loadComponent('eliminarplato')}>
                            <div className="navLateral-body-cr">ELIMINAR PLATO</div>
                          </a>
                        </li>
                      </ul>
                    )}
                  </li>
                </ul>
              </nav>
            </div>
          </section>
        )}

        {/* Sección de contenido que cambia */}
        <section className="main-content">
          {renderComponent()}
        </section>
      </div>
    </div>
  );
};

export default MenuFunctions;