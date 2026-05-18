import React, { useRef, useState } from 'react';
import './EditarPerfil.css';

export default function EditarPerfilCliente() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [photoPreview, setPhotoPreview] = useState(
    () => localStorage.getItem('profilePhotoPreview') || ''
  );
  const fileInputRef = useRef(null);

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const imageDataUrl = typeof reader.result === 'string' ? reader.result : '';
      setPhotoPreview(imageDataUrl);
      localStorage.setItem('profilePhotoPreview', imageDataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="seccion-editar-perfil">
      <div className="card-editar-perfil">
        <h3>PERFIL</h3>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="profile-photo-row">
            <div className="profile-photo-circle" aria-label="Vista previa de foto de perfil">
              {photoPreview ? (
                <img src={photoPreview} alt="Foto de perfil" className="profile-photo-image" />
              ) : (
                <div className="profile-photo-placeholder">Sin foto</div>
              )}
            </div>

            <div className="profile-photo-actions">
              <button type="button" className="profile-photo-change-btn" onClick={openFileDialog}>
                Cambiar foto
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="profile-photo-input"
              onChange={handlePhotoChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              type="text"
              className="login-input"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
            />
          </div>

            <div className="form-field">
                <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="login-input"
                required
                />
            </div>
            <div className="flex-row">
                <div className="form-field">
                    <label htmlFor="dni">DNI</label>
                    <input
                    id="dni"
                    type="text"
                    className="login-input"
                    required
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="telefono">Teléfono</label>
                    <input
                    id="telefono"
                    type="text"
                    className="login-input"
                    required
                    />
                </div>

            </div>

          <button type="submit" className="login-submit-btn">
            Guardar
          </button>

        </form>
      </div>
    </div>
  );
}