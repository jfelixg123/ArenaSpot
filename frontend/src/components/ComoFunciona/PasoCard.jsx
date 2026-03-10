import React from 'react';
import './PasoCard.css';

function PasoCard({ numero, imagen, titulo, descripcion }) {
  return (
    <div className="card-pasos">
      <span className="card-numero">{numero}</span>

      <img src={imagen} alt={titulo} className="pasos-image" />

      <div className="card-content">
        <h2 className="card-titulo">{titulo}</h2>
        <p className="card-descripcion">{descripcion}</p>
      </div>
    </div>
  );
}

export default PasoCard;