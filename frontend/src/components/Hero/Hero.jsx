import React from 'react';
import IndicadorScroll from './IndicadorScroll';
import './Hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Encuentra tu <span className="highlight">Gaming</span>
          </h1>
          <h1 className="hero-title">
            <span className="highlight">Center más cercano</span> y
          </h1>
          <h1 className="hero-title">
            reserva tu hora para jugar
          </h1>
        </div>

        <button className="hero-button">
          RESERVAR AHORA
        </button>
      </div>

      <IndicadorScroll />
    </section>
  );
}

export default Hero;