import { useState } from "react";
import { login } from "../../api";
import Navbar from "../../components/Navbar/Navbar";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import styles from "./Login.module.css";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login({ email, password });
      window.location.href = "/";
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className={styles.loginPage}>
      <Navbar />
      <AuthHeader 
        authHeaderText="Iniciar sesión"
      />
      <form onSubmit={handleLogin} style={{ maxWidth: 400, margin: "40px auto" }}>
        <h2>Login</h2>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button>Entrar</button>
      </form>
    </div>
  );
}