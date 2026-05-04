import React from 'react';
import IconoFiltrar from '../../assets/images/filtrar.png';
import './BotonFiltros.css';


export default function BotonFiltros({ texto, onClick, icono }) {

  return (

    <button className="boton-filtrar-azul" onClick={onClick} type="button">
      <img src={icono} alt="{texto}" className="icono-blanco" />
      <span>{texto}</span>
    </button>
  );
}
