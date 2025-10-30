import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./../../styles/CreateVacancy.css";

const CrearVacante = () => {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    salario: "",
    modalidad: "Presencial",
    ciudad: "",
    fechaLimite: "",
  });

  const [vacantes, setVacantes] = useState([]);
  const [contador, setContador] = useState(1);
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showList, setShowList] = useState(false);

  const ciudadesColombia = [
    "Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena", "Cúcuta", "Bucaramanga",
    "Pereira", "Manizales", "Santa Marta", "Ibagué", "Pasto", "Villavicencio", "Neiva",
    "Montería", "Armenia", "Sincelejo", "Valledupar", "Popayán", "Tunja", "Riohacha",
    "Florencia", "Yopal", "Quibdó", "Leticia", "Arauca", "Mocoa", "San Andrés"
  ];

  // 🔁 Ocultar mensajes después de 3 segundos
  useEffect(() => {
    if (successMsg || Object.keys(errors).length > 0) {
      const timer = setTimeout(() => {
        setSuccessMsg("");
        setErrors({});
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMsg, errors]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "fechaLimite") {
      const hoy = new Date();
      const seleccionada = new Date(value);
      hoy.setHours(0, 0, 0, 0);
      seleccionada.setHours(0, 0, 0, 0);

      if (seleccionada <= hoy) {
        setErrors({ ...errors, fechaLimite: "❌ La fecha debe ser posterior al día actual." });
        setFormData({ ...formData, fechaLimite: "" });
        return;
      } else {
        const newErrors = { ...errors };
        delete newErrors.fechaLimite;
        setErrors(newErrors);
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleCityInput = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowList(true);
    setFormData({ ...formData, ciudad: "" });
  };

  const handleSelectCity = (city) => {
    setFormData({ ...formData, ciudad: city });
    setSearchTerm(city);
    setShowList(false);
  };

  const ciudadesFiltradas = ciudadesColombia
    .filter((city) => city.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, 2);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.titulo.trim()) newErrors.titulo = "⚠️ Campo obligatorio.";
    if (!formData.descripcion.trim()) newErrors.descripcion = "⚠️ Campo obligatorio.";
    if (!formData.salario.trim()) newErrors.salario = "⚠️ Campo obligatorio.";
    if (!formData.ciudad.trim()) newErrors.ciudad = "⚠️ Selecciona una ciudad.";
    if (!formData.fechaLimite) newErrors.fechaLimite = "⚠️ Selecciona una fecha válida.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrors({});

    if (!validateForm()) return;

    const nuevaVacante = {
      ...formData,
      id: Date.now(),
      numero: contador,
    };

    setVacantes([...vacantes, nuevaVacante]);
    setContador(contador + 1);

    setSuccessMsg(`✅ Vacante #${nuevaVacante.numero} creada correctamente.`);

    setFormData({
      titulo: "",
      descripcion: "",
      salario: "",
      modalidad: "Presencial",
      ciudad: "",
      fechaLimite: "",
    });
    setSearchTerm("");
  };

  const isFormComplete =
    formData.titulo &&
    formData.descripcion &&
    formData.salario &&
    formData.ciudad &&
    formData.fechaLimite;

  return (
    <div className="container mt-5 p-4 rounded shadow bg-white" style={{ maxWidth: "700px" }}>
      <h3 className="text-center text-primary mb-4">Crear Nueva Vacante</h3>

      {/* Mensajes dinámicos */}
      {successMsg && (
        <div className="text-success text-center mb-3 fw-semibold">{successMsg}</div>
      )}
      {Object.keys(errors).length > 0 && (
        <div className="text-danger text-center mb-3 fw-semibold">
          Por favor corrige los errores antes de continuar.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Título y Salario */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Título del cargo</label>
            <input
              type="text"
              className="form-control"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              placeholder="Ej: Desarrollador Frontend"
            />
            {errors.titulo && <div className="text-danger small">{errors.titulo}</div>}
          </div>

          <div className="col-md-6">
            <label className="form-label">Salario (COP)</label>
            <input
              type="number"
              className="form-control"
              name="salario"
              value={formData.salario}
              onChange={handleChange}
              placeholder="Ej: 3500000"
            />
            {errors.salario && <div className="text-danger small">{errors.salario}</div>}
          </div>
        </div>

        {/* Descripción */}
        <div className="mb-3">
          <label className="form-label">Descripción del cargo</label>
          <textarea
            className="form-control"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            rows="4"
            placeholder="Describe las responsabilidades y requisitos..."
          ></textarea>
          {errors.descripcion && <div className="text-danger small">{errors.descripcion}</div>}
        </div>

        {/* Modalidad, Ciudad y Fecha */}
        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label">Modalidad</label>
            <select
              className="form-select"
              name="modalidad"
              value={formData.modalidad}
              onChange={handleChange}
            >
              <option>Presencial</option>
              <option>Remoto</option>
              <option>Híbrido</option>
            </select>
          </div>

          {/* Ciudad filtrable */}
          <div className="col-md-4 position-relative">
            <label className="form-label">Ciudad</label>
            <input
              type="text"
              className="form-control"
              value={searchTerm}
              onChange={handleCityInput}
              onFocus={() => setShowList(true)}
              onBlur={() => setTimeout(() => setShowList(false), 150)}
              placeholder="Escribe para buscar..."
            />
            {errors.ciudad && <div className="text-danger small">{errors.ciudad}</div>}
            {showList && ciudadesFiltradas.length > 0 && (
        <ul
            className="position-absolute bg-white border rounded"
            style={{
            top: "100%",
            left: "0",
            width: "100%",
            maxHeight: "150px",
            overflowY: "auto",
            listStyle: "none",
            padding: "0",
            margin: "0",
            fontSize: "0.95rem",
            zIndex: 10,
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
        >
            {ciudadesFiltradas.map((city, idx) => (
            <li
                key={idx}
                onClick={() => handleSelectCity(city)}
                style={{
                padding: "8px 12px",
                cursor: "pointer",
                borderBottom:
                    idx !== ciudadesFiltradas.length - 1 ? "1px solid #eee" : "none",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#f8f9fa")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
            >
                {city}
            </li>
            ))}
        </ul>
        )}
    </div>

          <div className="col-md-4">
            <label className="form-label">Fin de convocatoria</label>
            <input
              type="date"
              className="form-control"
              name="fechaLimite"
              value={formData.fechaLimite}
              onChange={handleChange}
            />
            {errors.fechaLimite && <div className="text-danger small">{errors.fechaLimite}</div>}
          </div>
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="btn btn-success w-100 mt-3"
          disabled={!isFormComplete}
        >
          Publicar Vacante
        </button>
      </form>

      {/* Vacantes creadas */}
      <hr className="my-4" />
      <h5 className="text-secondary mb-3">Vacantes creadas</h5>
      {vacantes.length === 0 ? (
        <p className="text-muted">Aún no se han creado vacantes.</p>
      ) : (
        <ul className="list-group">
          {vacantes.map((v) => (
            <li key={v.id} className="list-group-item">
              <strong>Vacante #{v.numero}:</strong> {v.titulo} — {v.ciudad} ({v.modalidad})
              <br />
              <small>💰 {v.salario} COP — Fin convocatoria: {v.fechaLimite}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CrearVacante;
