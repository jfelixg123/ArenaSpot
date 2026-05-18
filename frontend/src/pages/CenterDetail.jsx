import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import CenterMap from "../components/CenterMap/CenterMap";
import "./CenterDetail.css";

function CenterDetail() {

    const { id } = useParams();

    const [center, setCenter] = useState(null);
    const [specs, setSpecs] = useState([]);
    const [games, setGames] = useState([]);

    useEffect(() => {

        // CENTER INFO
        fetch(`http://localhost:3001/api/centers/${id}`)
            .then(res => res.json())
            .then(data => {
                setCenter(data);
            })
            .catch(error => {
                console.error(error);
            });

        // SPECS
        fetch(`http://localhost:3001/api/centers/${id}/specs`)
            .then(res => res.json())
            .then(data => {
                setSpecs(data);
            })
            .catch(error => {
                console.error(error);
            });

        // JUEGOS
        fetch(`http://localhost:3001/api/centers/${id}/games`)
            .then(res => res.json())
            .then(data => {
                setGames(data);
            });

    }, [id]);

    // LOADING
    if (!center) {

        return (
            <div className="center-loading">
                <h1>Cargando...</h1>
            </div>
        );

    }

    return (

        <>
            <Navbar />

            <main className="center-detail-page">

                {/* =========================
                    TOP SECTION
                ========================= */}

                <div className="center-top-section">

                    {/* LEFT SIDE */}
                    <div className="center-left">

                        <img
                            src={center.imagen}
                            alt={center.nombre}
                            className="center-main-image"
                        />

                        {/* GALLERY */}
                        <div className="center-gallery">

                            <img
                                src={center.imagen}
                                alt="Gallery"
                                className="gallery-image"
                            />

                            <img
                                src={center.imagen}
                                alt="Gallery"
                                className="gallery-image"
                            />

                            <img
                                src={center.imagen}
                                alt="Gallery"
                                className="gallery-image"
                            />

                        </div>

                    </div>

                    {/* RIGHT SIDE */}
                    <div className="booking-card">

                        <h2 className="booking-price">
                            {center.precio
                                ? `${center.precio}€`
                                : 'Sin precio'}
                            <span> / hour</span>
                        </h2>

                        {/* DATE */}
                        <div className="booking-section">

                            <label className="booking-label">
                                DATE
                            </label>

                            <input
                                type="date"
                                className="booking-input"
                            />

                        </div>

                        {/* HOURS */}
                        <div className="booking-section">

                            <label className="booking-label">
                                HOURS
                            </label>

                            <select className="booking-input">

                                <option>
                                    1 Hour
                                </option>

                                <option>
                                    2 Hours
                                </option>

                                <option>
                                    3 Hours
                                </option>

                            </select>

                        </div>

                        {/* SUMMARY */}
                        <div className="booking-summary">

                            <div className="summary-row">

                                <span>
                                    Base Price
                                </span>

                                <span>
                                    {center.precio
                                        ? `${center.precio}€`
                                        : '0€'}
                                </span>

                            </div>

                            <div className="summary-row">

                                <span>
                                    Service Fee
                                </span>

                                <span>
                                    2€
                                </span>

                            </div>

                            <div className="summary-row summary-total">

                                <span>
                                    TOTAL
                                </span>

                                <span>
                                    {center.precio
                                        ? `${parseFloat(center.precio) + 2}€`
                                        : '0€'}
                                </span>

                            </div>

                        </div>

                        <button className="booking-button">
                            Reservar
                        </button>

                    </div>

                </div>

                {/* =========================
                    CENTER INFO
                ========================= */}

                <div className="center-info-section">

                    <h1 className="center-title">
                        {center.nombre}
                    </h1>

                    <p className="center-description">
                        {center.descripcion}
                    </p>

                    <div className="map-section">

                        <h2 className="games-title">
                            Location
                        </h2>

                        <CenterMap
                            lat={center.lat}
                            lng={center.lng}
                        />

                    </div>

                </div>

                {/* =========================
                    SPECS SECTION
                ========================= */}

                <div className="specs-section">

                    <div className="specs-header">

                        <h2 className="specs-title">
                            Hardware Specs
                        </h2>

                    </div>

                    <div className="specs-grid">

                        {specs.map(spec => (

                            <div
                                key={spec.id_puesto}
                                className="spec-card"
                            >

                                <div className="spec-info">

                                    <h4>
                                        {spec.nombre_o_numero}
                                    </h4>

                                    <p>
                                        Tipo: {spec.tipo}
                                    </p>

                                    {/* PC */}
                                    {spec.cpu && (
                                        <p>
                                            CPU: {spec.cpu}
                                        </p>
                                    )}

                                    {spec.gpu && (
                                        <p>
                                            GPU: {spec.gpu}
                                        </p>
                                    )}

                                    {spec.ram && (
                                        <p>
                                            RAM: {spec.ram}
                                        </p>
                                    )}

                                    {spec.monitor && (
                                        <p>
                                            Monitor: {spec.monitor}
                                        </p>
                                    )}

                                    {/* VR */}
                                    {spec.headset && (
                                        <p>
                                            VR Headset: {spec.headset}
                                        </p>
                                    )}

                                    {spec.controllers && (
                                        <p>
                                            Controllers: {spec.controllers}
                                        </p>
                                    )}

                                    {/* SIM */}
                                    {spec.volante && (
                                        <p>
                                            Volante: {spec.volante}
                                        </p>
                                    )}

                                    {spec.pedales && (
                                        <p>
                                            Pedales: {spec.pedales}
                                        </p>
                                    )}

                                    {/* CONSOLA */}
                                    {spec.plataforma && (
                                        <p>
                                            Consola: {spec.plataforma}
                                        </p>
                                    )}

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

                {/* =========================
                    JUEGOS SECTION
                ========================= */}

                <div className="games-section">

                    <div className="games-header">

                        <h2 className="games-title">
                            Games Library
                        </h2>

                    </div>

                    <div className="games-carousel">

                        {games.map(game => (

                            <div
                                key={game.id_juego}
                                className="game-card"
                            >

                                <img
                                    src={`http://localhost:3001${game.portada_url}`}
                                    alt={game.nombre}
                                    className="game-image"
                                />

                                <h3 className="game-title">
                                    {game.nombre}
                                </h3>

                                <p className="game-genre">
                                    {game.genero}
                                </p>

                            </div>

                        ))}

                    </div>

                </div>

            </main>

            <Footer />
        </>
    );
}

export default CenterDetail;
