import React from 'react';
import gcImage from '../../assets/images/gcPrueba.png';
import ubicacion from '../../assets/images/ubicacion.png';
import './CardGaming.css';

function CardGaming({ center }) {

    return (
        <div className="card">

            <img
                src={center?.imagen || gcImage}
                alt={center?.nombre}
                className="card-image"
            />

            <div className="card-content">

                <div className="card-header">

                    <h3>{center?.nombre}</h3>

                    <h4>
                        {center?.precio
                            ? `${center.precio}€/h`
                            : 'Sin precio'}
                    </h4>

                </div>

                <div className="card-location">

                    <img
                        src={ubicacion}
                        alt="Ubicación"
                        className="location-icon"
                    />

                    <p>{center?.direccion}</p>

                </div>

                <div className="spacer"></div>

                <button className="card-button">
                    RESERVAR
                </button>

            </div>

        </div>
    );
}

export default CardGaming;
