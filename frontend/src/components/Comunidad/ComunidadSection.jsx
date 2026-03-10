import React from 'react';
import comunidadImage from '../../assets/images/comunidad.png';
import './Comunidad.css';

function ComunidadSection() {
  return (
    <section className="comunidad-section">
        <img src={comunidadImage} alt="Comunidad" className="comunidad-image" />
        <div className="comunidad-text">
            <h2 className="comunidad-titulo">¡ÚNETE A NUESTRA</h2>
            <h2 className="comunidad-titulo">COMUNIDAD!</h2>
        </div>
        <button className="hero-button">ÚNETE AHORA</button>
    </section>
  );
}

export default ComunidadSection;