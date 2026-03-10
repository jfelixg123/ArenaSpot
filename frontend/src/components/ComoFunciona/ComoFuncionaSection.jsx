import React from "react";
import descubreImage from '../../assets/images/descubre-pasos.png';
import reservaImage from '../../assets/images/reserva-pasos.png';
import mandoImage from '../../assets/images/mando-pasos.png';
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
        <div className="pasos-div"> 
            <PasoCard 
              numero = "1"
              imagen={descubreImage} 
              titulo="DESCUBRE" 
              descripcion="Encuentre las mejores plataformas y conexiones de fibra de alta velocidad cerca de usted con nuestro mapa en tiempo real." 
            />
            <PasoCard
              numero = "2"
              imagen={reservaImage} 
              titulo="RESERVA" 
              descripcion="Elige tu estación, periféricos y franja horaria al instante sin coste de reserva." 
            />
            <PasoCard
              numero = "3" 
              imagen={mandoImage} 
              titulo="DOMINA" 
              descripcion="Preséntese, inicie sesión y ascienda en las tablas de clasificación locales con equipo profesional." 
            />
        </div>
        
    </section>
  );
}
 export default ComoFuncionaSection;