import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import { registerClient, registerCenter } from "../../api";

export default function Register() {
  const navigate = useNavigate();

  // "client" | "center"
  const [mode, setMode] = useState("client");

  // Wizard step solo para center: 1..3
  const [step, setStep] = useState(1);

  // -------- CLIENT FORM --------
  const [clientForm, setClientForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    password: "",
    password2: "",
  });

  // -------- CENTER FORMS --------
  const [owner, setOwner] = useState({
    nombre: "",
    email: "",
    telefono: "",
    password: "",
    password2: "",
  });

  const [center, setCenter] = useState({
    nombre: "",
    descripcion: "",
    telefono: "",
    website: "",
    logoUrl: "",

    hoursOpen: "10:00",
    hoursClose: "22:00",

    direccion: "",
    numero: "",
    codigo_postal: "",
    ciudad: "",
    pais: "España",

    // si luego metes mapa real
    lat: null,
    lng: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const resetErrors = () => setError("");

  const toggleMode = (nextMode) => {
    resetErrors();
    setMode(nextMode);
    setStep(1);
  };

  // ---------- handlers ----------
  const onClientChange = (e) => {
    resetErrors();
    setClientForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onOwnerChange = (e) => {
    resetErrors();
    setOwner((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onCenterChange = (e) => {
    resetErrors();
    setCenter((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  // ---------- validations ----------
  const validateClient = () => {
    const f = clientForm;
    if (!f.nombre || !f.email || !f.password || !f.password2) return "Completa todos los campos obligatorios.";
    if (f.password !== f.password2) return "Las contraseñas no coinciden.";
    if (f.password.length < 6) return "La contraseña debe tener al menos 6 caracteres.";
    return "";
  };

  const validateOwnerStep = () => {
    if (!owner.nombre || !owner.email || !owner.password || !owner.password2) return "Completa los datos del propietario.";
    if (owner.password !== owner.password2) return "Las contraseñas no coinciden.";
    if (owner.password.length < 6) return "La contraseña debe tener al menos 6 caracteres.";
    return "";
  };

  const validateCenterInfoStep = () => {
    if (!center.nombre) return "El nombre del gaming center es obligatorio.";
    // opcional: validar horarios
    if (!center.hoursOpen || !center.hoursClose) return "Indica el horario de apertura/cierre.";
    return "";
  };

  const validateCenterLocationStep = () => {
    if (!center.direccion) return "La dirección es obligatoria.";
    if (!center.ciudad) return "La población/ciudad es obligatoria.";
    return "";
  };

  const canGoNext = useMemo(() => {
    if (mode !== "center") return false;
    if (step === 1) return !validateOwnerStep();
    if (step === 2) return !validateCenterInfoStep();
    if (step === 3) return !validateCenterLocationStep();
    return false;
  }, [mode, step, owner, center]);

  // ---------- submits ----------
  const submitClient = async (e) => {
    e.preventDefault();
    resetErrors();

    const msg = validateClient();
    if (msg) return setError(msg);

    try {
      setLoading(true);
      await registerClient({
        nombre: clientForm.nombre,
        email: clientForm.email,
        telefono: clientForm.telefono || undefined,
        password: clientForm.password,
      });
      navigate("/login");
    } catch (err) {
      setError(err.message || "Error registrando");
    } finally {
      setLoading(false);
    }
  };

  const submitCenterFinal = async (e) => {
    e.preventDefault();
    resetErrors();

    const msg =
      validateOwnerStep() || validateCenterInfoStep() || validateCenterLocationStep();
    if (msg) return setError(msg);

    const direccionFinal = `${center.direccion}${center.numero ? ` ${center.numero}` : ""}`.trim();

    try {
      setLoading(true);
      await registerCenter({
        owner: {
          nombre: owner.nombre,
          email: owner.email,
          telefono: owner.telefono || undefined,
          password: owner.password,
        },
        center: {
          nombre: center.nombre,
          descripcion: center.descripcion || undefined,
          telefono: center.telefono || undefined,
          website: center.website || undefined,
          logoUrl: center.logoUrl || undefined,
          direccion: direccionFinal,
          ciudad: center.ciudad || undefined,
          pais: center.pais || undefined,
          codigo_postal: center.codigo_postal || undefined,
          lat: center.lat,
          lng: center.lng,
          hours: {
            open: center.hoursOpen,
            close: center.hoursClose,
            closedWeekdays: [], // si luego añades checkbox por día
          },
        },
      });

      navigate("/login");
    } catch (err) {
      setError(err.message || "Error registrando gaming center");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    resetErrors();
    const msg =
      (step === 1 && validateOwnerStep()) ||
      (step === 2 && validateCenterInfoStep()) ||
      (step === 3 && validateCenterLocationStep());
    if (msg) return setError(msg);
    setStep((s) => Math.min(3, s + 1));
  };

  const prevStep = () => {
    resetErrors();
    setStep((s) => Math.max(1, s - 1));
  };

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <div className={styles.brand}>
          <div className={styles.logoMark} aria-hidden />
          <span className={styles.brandText}>
            Arena<span>Spot</span>
          </span>
        </div>

        <nav className={styles.nav}>
          <Link className={styles.navLink} to={mode === "center" ? "/register" : "/register-center"}>
            {/* Solo decorativo si luego separas rutas */}
          </Link>

          <Link className={styles.navLink} to="/login">Iniciar sesión</Link>
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.icon} aria-hidden />
            <h1 className={styles.title}>
              {mode === "client" ? (
                <>
                  Registrarse en <span>ArenaSpot</span>
                </>
              ) : (
                <>
                  Registra tu <span>Gaming center</span>
                </>
              )}
            </h1>

            {/* Switch deslizante */}
            <div className={styles.switchWrap} role="tablist" aria-label="Tipo de registro">
              <button
                type="button"
                className={`${styles.switchBtn} ${mode === "client" ? styles.active : ""}`}
                onClick={() => toggleMode("client")}
                aria-selected={mode === "client"}
              >
                Usuario
              </button>
              <button
                type="button"
                className={`${styles.switchBtn} ${mode === "center" ? styles.active : ""}`}
                onClick={() => toggleMode("center")}
                aria-selected={mode === "center"}
              >
                Gaming center
              </button>
              <div className={`${styles.switchPill} ${mode === "center" ? styles.pillRight : ""}`} />
            </div>
          </div>

          {/* -------- CLIENT FORM -------- */}
          {mode === "client" ? (
            <form className={styles.form} onSubmit={submitClient}>
              <label className={styles.label}>
                Nombre
                <input className={styles.input} name="nombre" value={clientForm.nombre} onChange={onClientChange} />
              </label>

              <label className={styles.label}>
                Correo electrónico
                <input className={styles.input} type="email" name="email" value={clientForm.email} onChange={onClientChange} />
              </label>

              <label className={styles.label}>
                Teléfono (opcional)
                <input className={styles.input} name="telefono" value={clientForm.telefono} onChange={onClientChange} />
              </label>

              <label className={styles.label}>
                Contraseña
                <input className={styles.input} type="password" name="password" value={clientForm.password} onChange={onClientChange} />
              </label>

              <label className={styles.label}>
                Repite la contraseña
                <input className={styles.input} type="password" name="password2" value={clientForm.password2} onChange={onClientChange} />
              </label>

              {error ? <div className={styles.error}>{error}</div> : null}

              <button className={styles.button} disabled={loading}>
                {loading ? "Registrando..." : "Registrarse"}
              </button>

              <div className={styles.footerText}>
                ¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link>
              </div>
            </form>
          ) : (
            // -------- CENTER WIZARD --------
            <form className={styles.form} onSubmit={submitCenterFinal}>
              {/* Step badge */}
              <div className={styles.stepBadge}>
                <span className={styles.stepDot}>{step}</span>
                <span className={styles.stepText}>
                  {step === 1 && "CUENTA DEL PROPIETARIO"}
                  {step === 2 && "INFORMACIÓN ADICIONAL"}
                  {step === 3 && "UBICACIÓN DEL LOCAL"}
                </span>
              </div>

              {step === 1 && (
                <>
                  <div className={styles.grid2}>
                    <label className={styles.label}>
                      Nombre del propietario
                      <input className={styles.input} name="nombre" value={owner.nombre} onChange={onOwnerChange} />
                    </label>
                    <label className={styles.label}>
                      Teléfono (opcional)
                      <input className={styles.input} name="telefono" value={owner.telefono} onChange={onOwnerChange} />
                    </label>
                  </div>

                  <label className={styles.label}>
                    Correo electrónico
                    <input className={styles.input} type="email" name="email" value={owner.email} onChange={onOwnerChange} />
                  </label>

                  <div className={styles.grid2}>
                    <label className={styles.label}>
                      Contraseña
                      <input className={styles.input} type="password" name="password" value={owner.password} onChange={onOwnerChange} />
                    </label>
                    <label className={styles.label}>
                      Repite la contraseña
                      <input className={styles.input} type="password" name="password2" value={owner.password2} onChange={onOwnerChange} />
                    </label>
                  </div>
                </>
              )}

              {step === 2 && (
                <div className={styles.centerGrid}>
                  <div className={styles.leftCol}>
                    <div className={styles.smallTitle}>Logo</div>
                    <div className={styles.logoRow}>
                      <div className={styles.logoPreview} aria-hidden />
                      <div className={styles.logoActions}>
                        <label className={styles.label}>
                          URL del logo (por ahora)
                          <input
                            className={styles.input}
                            name="logoUrl"
                            value={center.logoUrl}
                            onChange={onCenterChange}
                            placeholder="https://..."
                          />
                        </label>
                      </div>
                    </div>

                    <label className={styles.label}>
                      Nombre del gaming center
                      <input className={styles.input} name="nombre" value={center.nombre} onChange={onCenterChange} />
                    </label>

                    <label className={styles.label}>
                      Descripción breve
                      <textarea
                        className={`${styles.input} ${styles.textarea}`}
                        name="descripcion"
                        value={center.descripcion}
                        onChange={onCenterChange}
                        rows={4}
                      />
                    </label>
                  </div>

                  <div className={styles.rightCol}>
                    <label className={styles.label}>
                      Teléfono del local
                      <input className={styles.input} name="telefono" value={center.telefono} onChange={onCenterChange} />
                    </label>

                    <div className={styles.grid2}>
                      <label className={styles.label}>
                        Apertura
                        <input className={styles.input} type="time" name="hoursOpen" value={center.hoursOpen} onChange={onCenterChange} />
                      </label>
                      <label className={styles.label}>
                        Cierre
                        <input className={styles.input} type="time" name="hoursClose" value={center.hoursClose} onChange={onCenterChange} />
                      </label>
                    </div>

                    <label className={styles.label}>
                      Página web o redes sociales
                      <input className={styles.input} name="website" value={center.website} onChange={onCenterChange} placeholder="https://..." />
                    </label>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className={styles.centerGrid}>
                  <div className={styles.leftCol}>
                    <label className={styles.label}>
                      Dirección
                      <input className={styles.input} name="direccion" value={center.direccion} onChange={onCenterChange} />
                    </label>

                    <div className={styles.grid2}>
                      <label className={styles.label}>
                        Número
                        <input className={styles.input} name="numero" value={center.numero} onChange={onCenterChange} />
                      </label>
                      <label className={styles.label}>
                        Código postal
                        <input className={styles.input} name="codigo_postal" value={center.codigo_postal} onChange={onCenterChange} />
                      </label>
                    </div>

                    <label className={styles.label}>
                      Población
                      <input className={styles.input} name="ciudad" value={center.ciudad} onChange={onCenterChange} />
                    </label>

                    {/* País opcional */}
                    <label className={styles.label}>
                      País
                      <input className={styles.input} name="pais" value={center.pais} onChange={onCenterChange} />
                    </label>
                  </div>

                  <div className={styles.rightCol}>
                    <div className={styles.mapMock} aria-hidden>
                      <div className={styles.mapHint}>Mapa (placeholder)</div>
                    </div>
                    <div className={styles.mapNote}>
                      Luego puedes integrar Google Maps/Leaflet y rellenar lat/lng.
                    </div>
                  </div>
                </div>
              )}

              {error ? <div className={styles.error}>{error}</div> : null}

              <div className={styles.actionsRow}>
                <button
                  type="button"
                  className={styles.secondaryBtn}
                  onClick={prevStep}
                  disabled={loading || step === 1}
                >
                  Anterior
                </button>

                {step < 3 ? (
                  <button
                    type="button"
                    className={styles.button}
                    onClick={nextStep}
                    disabled={loading || !canGoNext}
                  >
                    Siguiente
                  </button>
                ) : (
                  <button className={styles.button} disabled={loading}>
                    {loading ? "Registrando..." : "Registrarse"}
                  </button>
                )}
              </div>

              <div className={styles.footerText}>
                ¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link>
              </div>
            </form>
          )}
        </section>
      </main>
    </div>
  );
}