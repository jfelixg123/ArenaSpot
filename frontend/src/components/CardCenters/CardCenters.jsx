import React from 'react';
import './CardCenters.css';
import GamingCenter from '../../assets/images/gaming-center.png'; 

export default function CardCenters() {
  return (
    <div className="center-card">
      <div className="card-image-wrapper">
        <img src={GamingCenter} alt="Pixelcore" className="center-image" />
      </div>
      
      <div className="center-card-content">
        <div className="center-text-section">
          <h2 className="center-title">PIXELCORE</h2>
          <p className="center-description">
            Gaming center moderno con PCs de alto rendimiento y consolas de última generación, 
            pensado tanto para juego casual como competitivo.
          </p>
          
          <div className="center-info-group">
            <div className="info-item">
              <span className="info-label">Horario:</span>
              <span className="info-value">Lunes a Domingo: 10:00 – 23:00</span>
            </div>

            <div className="center-info-item">
              <span className="info-label">Precio mínimo por hora:</span>
              <span className="info-value">5 €/hora</span>
            </div>
          </div>

          <button className="reserve-button">
            Reservar
          </button>
        </div>
      </div>
    </div>
  );
}