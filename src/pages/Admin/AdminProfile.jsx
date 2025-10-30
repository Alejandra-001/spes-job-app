import React, { useState } from "react";
import "./../../styles/AdminProfile.css";

const PerfilAdmin = () => {
  const [email, setEmail] = useState("admin@spes.com");
  const [password, setPassword] = useState("123456");
  const [logo, setLogo] = useState("/logo.png");

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setLogo(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("✅ Cambios guardados con éxito (modo estático).");
  };

  return (
    <div className="container mt-5 p-4 perfil-admin">
      <h2 className="mb-4 text-center">Perfil del Administrador</h2>

      <div className="text-center mb-4">
        <img
          src={logo}
          alt="Logo empresa"
          className="img-thumbnail mb-2 logo-preview"
          width="150"
        />
        <div>
          <label htmlFor="logo" className="btn btn-outline-primary">
            Cambiar logo
          </label>
          <input
            type="file"
            id="logo"
            className="d-none"
            accept="image/*"
            onChange={handleLogoChange}
          />
        </div>
      </div>

      <form onSubmit={handleSave}>
        <div className="mb-3">
          <label className="form-label">Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100 mt-3">
          Guardar cambios
        </button>
      </form>
    </div>
  );
};

export default PerfilAdmin;
