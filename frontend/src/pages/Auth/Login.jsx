import { useState } from "react";
import { login } from "../../api";
import Navbar from "../../components/Navbar/Navbar";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import FormLogin from "../../components/FormLogin/FormLogin";
import "./Login.css";

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
    <div className="login-page">
      <Navbar />
      <div className="login-section">
        <AuthHeader authHeaderText="Iniciar sesión" />
        {/* Pasamos los estados y la función al componente visual */}
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