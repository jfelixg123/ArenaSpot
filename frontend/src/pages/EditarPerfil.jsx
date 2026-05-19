import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "./EditarPerfil.css";

export default function EditarPerfil() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", password: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    fetch("http://localhost:3001/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setForm({ nombre: data.nombre || "", email: data.email || "", telefono: data.telefono || "", password: "" });
      })
      .catch((e) => setError("No se pudo cargar el usuario"))
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleChange = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const token = localStorage.getItem("token");
    try {
      const payload = { nombre: form.nombre, telefono: form.telefono };
      if (form.password) payload.password = form.password;

      const res = await fetch("http://localhost:3001/api/auth/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error guardando");

      const data = await res.json();
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/home");
    } catch (err) {
      setError(err.message || "Error guardando");
    }
  };

  return (
    <>
      <Navbar />
      <main className="editar-perfil-page">
        <div className="perfil-card">
          <h2>PERFIL</h2>

          <form className="perfil-form" onSubmit={handleSubmit}>
            <label>Nombre</label>
            <input value={form.nombre} onChange={handleChange("nombre")} />

            <label>Correo electrónico</label>
            <input value={form.email} disabled />

            <label>Teléfono</label>
            <input value={form.telefono} onChange={handleChange("telefono")} />

            <label>Contraseña (dejar vacío para no cambiar)</label>
            <input type="password" value={form.password} onChange={handleChange("password")} placeholder="Nueva contraseña" />

            {error && <div className="form-error">{error}</div>}

            <button className="accept-button" type="submit">Aceptar</button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
