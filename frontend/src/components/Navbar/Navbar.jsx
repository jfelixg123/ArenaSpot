import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import mando from '../../assets/images/mando.png';
import usuario from '../../assets/images/usuario.png';
import './Navbar.css';

function Header() {
  return (
    <header className="header">
      <Link to="/" className="logoLink" aria-label="Ir a la landing de ArenaSpot">
        <img src={logo} alt="ArenaSpot" className="logoImage" />
      </Link>

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