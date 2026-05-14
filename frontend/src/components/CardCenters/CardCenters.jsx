import React from 'react';
import './CardCenters.css';
import GamingCenter from '../../assets/images/gaming-center.png';

export default function CardCenters({ center }) {

    return (
        <div className="center-card">

            <div className="card-image-wrapper">

                <img
                    src={center.imagen || GamingCenter}
                    alt={center.nombre}
                    className="center-image"
                />

            </div>

            <div className="center-card-content">

                <div className="center-text-section">

                    <h2 className="center-title">
                        {center.nombre}
                    </h2>

                    <p className="center-description">
                        {center.descripcion}
                    </p>

                    <div className="center-info-group">

                        <div className="info-item">

                            <span className="info-label">
                                Ciudad:
                            </span>

                            <span className="info-value">
                                {center.ciudad}
                            </span>

                        </div>

                        <div className="center-info-item">

                            <span className="info-label">
                                Precio mínimo por hora:
                            </span>

                            <span className="info-value">

                                {center.precio
                                    ? `${center.precio} €/hora`
                                    : 'Sin precio'}

                            </span>

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
