import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api";
import Navbar from "../../components/Navbar/Navbar";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import FormLogin from "../../components/FormLogin/FormLogin";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  try {
    localStorage.removeItem("token");

    const data = await login({ email, password });

    localStorage.setItem("token", data.token);

    const res = await fetch("http://localhost:3001/api/auth/me", {
      headers: {
        Authorization: `Bearer ${data.token}`
      }
    });

    if (!res.ok) throw new Error("Error al obtener usuario");

    const dataMe = await res.json();
    console.log("ME:", dataMe);

    const user = dataMe; // 👈 clave

    if (user?.rol === "ADMIN") {
      navigate("/dashboardGC");
    } else {
      navigate("/home");
    }

  } catch (e) {
    console.error(e);
    setError(e.message);
  }
};

  return (
    <div className="login-page">
      <Navbar />
      <div className="login-section">
        <AuthHeader authHeaderText="Iniciar sesión" />
        <FormLogin
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          error={error}
        />
      </div>
    </div>
  );
}
