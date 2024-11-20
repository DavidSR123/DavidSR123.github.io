import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './menuAdmin.css' 
import Resumen from './Resumen.js';
import AgregarPlato from './AgregarPlato.js';
import EditarPlato from './EditarPlato.js';
import EliminarPlato from './EliminarPlato.js';

const AdminMenu = () => {
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
          <span className="welcome-text">Bienvenido, Administrador</span>
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
                        REGISTRO DE NEGOCIOS
                      </div>
                      <span className={`zmdi zmdi-chevron-left ${activeMenu === 'negocios' ? 'active' : ''}`}></span>
                    </a>
                    {activeMenu === 'negocios' && (
                      <ul className="full-width menu-principal sub-menu-options">
                        <li className="full-width">
                          <a href="#!" className="full-width" onClick={() => loadComponent('agregarnegocio')}>
                            <div className="navLateral-body-cr">DOCUMENTOS DE NEGOCIOS</div>
                          </a>
                        </li>
                        <li className="full-width">
                          <a href="#!" className="full-width" onClick={() => loadComponent('editarnegocio')}>
                            <div className="navLateral-body-cr">EDITAR NEGOCIO</div>
                          </a>
                        </li>
                        <li className="full-width">
                          <a href="#!" className="full-width" onClick={() => loadComponent('eliminarnegocio')}>
                            <div className="navLateral-body-cr">ELIMINAR NEGOCIOS</div>
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

        {/* Contenido dinámico */}
        <main className="admin-main">
          {renderComponent()}
        </main>
      </div>
    </div>
  );
};

export default AdminMenu;
