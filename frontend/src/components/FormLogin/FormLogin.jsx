import React from 'react'; // Quitamos useState de aquí, ya no lo usa
import './FormLogin.css';

// Recibimos los datos como "props"
export default function FormLogin({ email, setEmail, password, setPassword, handleLogin, error }) {
  return (
    <div className="login-wrapper">
      <div className="login-card">
        <form onSubmit={handleLogin} className="login-form">
          
          <div className="form-field">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Usa la función del padre
              className="login-input"
              required
              autoFocus
            />
          </div>

          <div className="form-field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Usa la función del padre
              className="login-input"
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-submit-btn">
            Iniciar sesión
          </button>

          <p className="login-footer">
            ¿No tienes cuenta? <a href="/register">Registrarse</a>
          </p>
          
        </form>
      </div>
    </div>
  );
}