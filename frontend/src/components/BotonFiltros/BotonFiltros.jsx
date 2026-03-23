import React from 'react';
import IconoFiltrar from '../../assets/images/filtrar.png';
import './BotonFiltros.css';

export default function BotonFiltros({ onClick }) {
  return (
    <button className="boton-filtrar-azul" onClick={onClick} type="button">
      <img src={IconoFiltrar} alt="Filtrar" className="icono-blanco" />
      <span>Filtros</span>
    </button>
  );
}