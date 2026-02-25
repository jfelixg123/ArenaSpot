import React from 'react';
import logo from '../assets/images/logo.png';
import mando from '../assets/images/mando.png';
import usuario from '../assets/images/usuario.png';

function Header() {
  return (
    <header style={styles.header}>
      <img src={logo} alt="ArenaSpot" style={styles.logoImage} />
      <nav style={styles.nav}>
        <a href="/register" style={styles.enlace}>
            <img src={mando} alt="Mando" style={styles.enlaceImage} />
            Registra tu Gaming Center
        </a>
       <a href="/login" style={styles.enlace}>
            <img src={usuario} alt="Usuario" style={styles.enlaceImage} />
            Iniciar sesión
        </a>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1F2933',
    color: 'white',
    fontFamily: 'Inter, sans-serif',
    height: '10vh',
  },
  logoImage: {
    height: '100px',
    width: 'auto',
    objectFit: 'contain',
  },
  nav: {
    display: 'flex',
    gap: '1rem',
  },
  enlace: {
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    textDecoration: 'none',
    fontWeight: '500',
    marginRight: '1.5rem',
  },
  enlaceImage: {
    height: '30px',
    width: '30px',
    objectFit: 'contain',
    marginRight: '0.5rem',
  },
};

export default Header;