import React, { useState } from "react";
import "./../../styles/CandidateProfile.css";

function CandidateProfile() {
  const [profile, setProfile] = useState({
    nombre: "Juan Pérez",
    apellido: "Gómez",
    tipoDocumento: "Cédula de ciudadanía",
    numeroDocumento: "1023456789",
    correo: "juan@gmail.com",
    telefono: "3001234567",
    direccion: "Calle 123 #45-67",
    ciudad: "Bogotá",
    departamento: "Cundinamarca",
    pais: "Colombia",
    fechaNacimiento: "1995-06-10",
    experiencia: "2 años de experiencia en construcción",
    educacion: "Tecnólogo en Construcción",
    habilidades: "AutoCAD, Revit, Project Management, Blueprint Reading",
  });

  const [cvFile, setCvFile] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleFileChange = (e) => {
    setCvFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensaje("✅ Perfil actualizado correctamente");
  };

  const handleUploadCV = () => {
    if (!cvFile) {
      setMensaje("⚠️ Por favor selecciona un archivo antes de subirlo");
      return;
    }
    setMensaje(`📄 Hoja de vida "${cvFile.name}" cargada con éxito`);
  };

  return (
    <div className="perfil-candidato container mt-5">
      <h2 className="text-center mb-4">Perfil del Candidato</h2>

      <form className="card p-4 shadow-sm" onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={profile.nombre}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Apellido</label>
            <input
              type="text"
              name="apellido"
              value={profile.apellido}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Tipo de Documento</label>
            <input
              type="text"
              name="tipoDocumento"
              value={profile.tipoDocumento}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Número de Documento</label>
            <input
              type="text"
              name="numeroDocumento"
              value={profile.numeroDocumento}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Correo</label>
            <input
              type="email"
              name="correo"
              value={profile.correo}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Teléfono</label>
            <input
              type="text"
              name="telefono"
              value={profile.telefono}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Dirección</label>
            <input
              type="text"
              name="direccion"
              value={profile.direccion}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Ciudad</label>
            <input
              type="text"
              name="ciudad"
              value={profile.ciudad}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Departamento</label>
            <input
              type="text"
              name="departamento"
              value={profile.departamento}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label">País</label>
            <input
              type="text"
              name="pais"
              value={profile.pais}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Fecha de Nacimiento</label>
            <input
              type="date"
              name="fechaNacimiento"
              value={profile.fechaNacimiento}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Educación</label>
            <input
              type="text"
              name="educacion"
              value={profile.educacion}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Experiencia Laboral</label>
          <textarea
            name="experiencia"
            value={profile.experiencia}
            onChange={handleChange}
            className="form-control"
            rows="3"
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Habilidades</label>
          <input
            type="text"
            name="habilidades"
            value={profile.habilidades}
            onChange={handleChange}
            className="form-control"
            placeholder="Ejemplo: AutoCAD, Revit, Project Management..."
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Guardar Cambios
        </button>
      </form>

      <div className="card p-4 mt-4 shadow-sm">
        <h5>Cargar Hoja de Vida</h5>
        <div className="d-flex gap-2 mt-2">
          <input type="file" onChange={handleFileChange} className="form-control" />
          <button onClick={handleUploadCV} className="btn btn-success">
            Subir
          </button>
        </div>
      </div>

      {mensaje && (
        <div className="alert alert-info text-center mt-3">{mensaje}</div>
      )}
    </div>
  );
}

export default CandidateProfile;
