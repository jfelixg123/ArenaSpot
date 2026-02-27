import React from "react";
import "./ComoFunciona.css";
import PasoCard from './PasoCard';
function ComoFuncionaSection() {
  return (
    <section className="como-funciona-section">
        <div className="como-funciona-div">
            <h2 className="section-titulo">¿LISTO PARA JUGAR? ES FÁCIL.</h2>
            <h4 className="section-subtitulo">Tu viaje de jugador casual a profesional </h4> 
            <h4 className="section-subtitulo">comienza aquí. Tres sencillos pasos para </h4>
            <h4 className="section-subtitulo">adentrarte en el juego.</h4>   
        </div>
        <PasoCard />
        <PasoCard />
        <PasoCard />
    </section>
  );
}
 export default ComoFuncionaSection;