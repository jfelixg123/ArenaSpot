import React from "react";
import "./AuthHeader.css";
import Logo from '../../assets/images/icono-logo.png';

function AuthHeader({ authHeaderText = "Bienvenido" }) {
  return (
    <div className="auth-header">
        <img className="logo" src={Logo} alt="Logo" />
        <h1 className="auth-text">{authHeaderText} en <span className="span">ArenaSpot</span></h1>
    </div>
  );
}
export default AuthHeader;