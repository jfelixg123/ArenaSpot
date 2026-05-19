import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "./MisReservas.css";

function formatDateTime(value) {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("es-ES", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function getStatusLabel(estado) {
  if (!estado) return "Sin estado";

  return estado.charAt(0).toUpperCase() + estado.slice(1);
}

export default function MisReservas() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const loadData = async () => {
      try {
        setLoading(true);
        setError("");

        const [meRes, reservasRes] = await Promise.all([
          fetch("http://localhost:3001/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:3001/api/reservas/mis-reservas", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (!meRes.ok) {
          throw new Error("No se pudo cargar tu perfil");
        }

        if (!reservasRes.ok) {
          throw new Error("No se pudieron cargar tus reservas");
        }

        const meData = await meRes.json();
        const reservasData = await reservasRes.json();

        setUser(meData);
        setReservas(Array.isArray(reservasData) ? reservasData : []);
      } catch (err) {
        setError(err.message || "Error al cargar tus reservas");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [navigate]);

  const handleCancel = async (id_reserva) => {
    // open modal confirmation instead
    setCancelModal({ open: true, id: id_reserva });
  };

  const [cancelModal, setCancelModal] = useState({ open: false, id: null });

  const confirmCancel = async () => {
    const id_reserva = cancelModal.id;
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:3001/api/reservas/${id_reserva}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Error al cancelar reserva');
      }

      setReservas((prev) => prev.filter((r) => r.id_reserva !== id_reserva));
      setCancelModal({ open: false, id: null });
    } catch (err) {
      alert(err.message || 'No se pudo cancelar la reserva');
      setCancelModal({ open: false, id: null });
    }
  };

  const closeCancelModal = () => setCancelModal({ open: false, id: null });

  return (
    <>
      <Navbar />
      <main className="mis-reservas-page">
        <section className="mis-reservas-hero">
          <div>
            <p className="eyebrow">Tu historial</p>
            <h1>Mis reservas</h1>
            <p className="hero-copy">
              {user ? `${user.nombre}, estas son tus reservas confirmadas y pendientes.` : "Revisa aquí todas tus reservas."}
            </p>
          </div>

          <Link to="/home" className="back-link">
            Volver al inicio
          </Link>
        </section>

        {loading && <div className="state-card">Cargando reservas...</div>}

        {!loading && error && <div className="state-card error">{error}</div>}

        {!loading && !error && reservas.length === 0 && (
          <div className="state-card empty">
            <h2>No tienes reservas todavía</h2>
            <p>Cuando hagas una reserva aparecerá aquí con su fecha, centro y puesto.</p>
            <Link to="/home" className="discover-link">
              Buscar un gaming center
            </Link>
          </div>
        )}

        {!loading && !error && reservas.length > 0 && (
          <div className="reservas-grid">
            {reservas.map((reserva) => (
              <article key={reserva.id_reserva} className="reserva-card">
                <div className="reserva-card-top">
                  <div>
                    <p className="reserva-center">{reserva.center_nombre}</p>
                    <h2>{reserva.nombre_o_numero}</h2>
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end'}}>
                    <span className={`status status-${reserva.estado || "sin-estado"}`}>
                      {getStatusLabel(reserva.estado)}
                    </span>
                    <button className="cancel-button" onClick={() => handleCancel(reserva.id_reserva)}>
                      Cancelar
                    </button>
                  </div>
                </div>

                <div className="reserva-info">
                  <div>
                    <span>Inicio</span>
                    <strong>{formatDateTime(reserva.fecha_hora_inicio)}</strong>
                  </div>
                  <div>
                    <span>Fin</span>
                    <strong>{formatDateTime(reserva.fecha_hora_fin)}</strong>
                  </div>
                  <div>
                    <span>Ubicación</span>
                    <strong>
                      {reserva.center_ciudad || ""}
                      {reserva.center_ciudad && reserva.center_direccion ? " · " : ""}
                      {reserva.center_direccion || ""}
                    </strong>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
        {cancelModal.open && (
          <div className="modal-overlay" onClick={closeCancelModal}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
              <h3>Confirmar cancelación</h3>
              <p>¿Estás seguro de que deseas cancelar esta reserva?</p>
              <div className="modal-actions">
                <button className="btn btn-danger" onClick={confirmCancel}>Sí, cancelar</button>
                <button className="btn" onClick={closeCancelModal}>Cerrar</button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}