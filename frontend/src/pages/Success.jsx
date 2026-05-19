import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "./Success.css";

function Success() {

    return (

        <>
            <Navbar />

            <main className="success-page">

                <div className="success-container">

                    {/* ICON */}
                    <div className="success-icon">
                        ✅
                    </div>

                    {/* TITLE */}
                    <h1 className="success-title">
                        ¡Pago realizado correctamente!
                    </h1>

                    <p className="success-subtitle">
                        Tu reserva ha sido procesada con éxito.
                    </p>

                    {/* CARD */}
                    <div className="success-card">

                        <h2 className="success-card-title">
                            Resumen de tu reserva
                        </h2>

                        <div className="success-grid">

                            <div className="success-item">
                                <span>
                                    Fecha
                                </span>

                                <strong>
                                    18 Mayo 2026
                                </strong>
                            </div>

                            <div className="success-item">
                                <span>
                                    Hora inicio
                                </span>

                                <strong>
                                    18:00
                                </strong>
                            </div>

                            <div className="success-item">
                                <span>
                                    Duración
                                </span>

                                <strong>
                                    2 Horas
                                </strong>
                            </div>

                            <div className="success-item">
                                <span>
                                    Total pagado
                                </span>

                                <strong className="success-price">
                                    12€
                                </strong>
                            </div>

                        </div>

                    </div>

                    {/* BUTTONS */}
                    <div className="success-buttons">

                        <Link
                            to="/home"
                            className="success-btn primary"
                        >
                            Volver al inicio
                        </Link>

                        <Link
                            to="/mis-reservas"
                            className="success-btn secondary"
                        >
                            Ver mis reservas
                        </Link>

                    </div>

                </div>

            </main>

            <Footer />
        </>

    );

}

export default Success;
