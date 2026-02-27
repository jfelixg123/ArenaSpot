import React from 'react';
import logo from '../../assets/images/logo.png';
import mando from '../../assets/images/mando.png';
import usuario from '../../assets/images/usuario.png';
import './Navbar.css';

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="ArenaSpot" className="logoImage" />

      <nav className="nav">
        <a href="/register" className="enlace">
          <img src={mando} alt="Mando" className="enlaceImage" />
          Registra tu Gaming Center
        </a>

        <a href="/login" className="enlace">
          <img src={usuario} alt="Usuario" className="enlaceImage" />
          Iniciar sesión
        </a>
      </nav>
    </header>
  );
}

export default Header;