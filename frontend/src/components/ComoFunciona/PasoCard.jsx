import React from 'react';
import gcImage from '../../assets/images/gcPrueba.png';
import ubicacion from '../../assets/images/ubicacion.png';

function PasoCard() {
  return (
    <div className="card">
      <img src={gcImage} alt="Gaming Center" className="card-image" />

      <div className="card-content">
        <div className="card-header">
          <h3>Gaming Center Title</h3>
          <h4>Precio</h4>
        </div>

        <div className="card-location">
          <img src={ubicacion} alt="Ubicación" className="location-icon" />
          <p>Dirección</p>
        </div>

        <div className="spacer"></div>

        <button className="card-button">
          RESERVAR
        </button>
      </div>
    </div>
  );
}

export default PasoCard;