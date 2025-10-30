import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./../styles/Register.css";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    tipoDocumento: "",
    numeroDocumento: "",
    puesto: "",
    ciudad: "",
  });

  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [showList, setShowList] = useState(false);

  const ciudadesColombia = [
    "Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena", "Cúcuta", "Bucaramanga",
    "Pereira", "Manizales", "Santa Marta", "Ibagué", "Pasto", "Villavicencio", "Neiva",
    "Montería", "Armenia", "Sincelejo", "Valledupar", "Popayán", "Tunja", "Riohacha",
    "Florencia", "Yopal", "Quibdó", "Leticia", "Arauca", "Mocoa", "San Andrés"
  ];

  const validarEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|com\.co)$/;
    return regex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCityInput = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowList(true);
  };

  const handleSelectCity = (city) => {
    setForm({ ...form, ciudad: city });
    setSearchTerm(city);
    setShowList(false);
  };

  const validateForm = () => {
    let newErrors = {};
    if (!form.nombre.trim()) newErrors.nombre = "Campo obligatorio";
    if (!form.apellido.trim()) newErrors.apellido = "Campo obligatorio";
    if (!form.email.trim()) newErrors.email = "Campo obligatorio";
    else if (!validarEmail(form.email)) newErrors.email = "Verifica el correo (solo .com o .com.co)";
    if (!form.tipoDocumento) newErrors.tipoDocumento = "Selecciona un tipo de documento";
    if (!form.numeroDocumento.trim()) newErrors.numeroDocumento = "Campo obligatorio";
    if (!form.puesto.trim()) newErrors.puesto = "Campo obligatorio";
    if (!form.ciudad.trim()) newErrors.ciudad = "Selecciona una ciudad";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("✅ Registro exitoso");
      navigate("/login");
    }
  };

  const ciudadesFiltradas = ciudadesColombia
    .filter((city) => city.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, 2); // mostrar solo  a la vez

  return (
    <div className="container p-4 rounded shadow bg-white" style={{ maxWidth: "600px" }}>
      <div className="text-center mb-3">
        <img src="/logo.png" alt="Logo SPES" style={{ width: "120px", marginBottom: "10px" }} />
        <h3>Registro de Usuario</h3>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Nombre y Apellido */}
        <div className="row mb-3">
          <div className="col">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
            />
            {errors.nombre && <div className="text-danger small">{errors.nombre}</div>}
          </div>

          <div className="col">
            <label className="form-label">Apellido</label>
            <input
              type="text"
              className="form-control"
              name="apellido"
              value={form.apellido}
              onChange={handleChange}
            />
            {errors.apellido && <div className="text-danger small">{errors.apellido}</div>}
          </div>
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <div className="text-danger small">{errors.email}</div>}
        </div>

        {/* Tipo y número documento */}
        <div className="row mb-3">
          <div className="col">
            <label className="form-label">Tipo de documento</label>
            <select
              className="form-select"
              name="tipoDocumento"
              value={form.tipoDocumento}
              onChange={handleChange}
            >
              <option value="">Seleccione</option>
              <option value="CC">Cédula de ciudadanía</option>
              <option value="TI">Tarjeta de identidad</option>
              <option value="CE">Cédula de extranjería</option>
            </select>
            {errors.tipoDocumento && <div className="text-danger small">{errors.tipoDocumento}</div>}
          </div>

          <div className="col">
            <label className="form-label">Número de documento</label>
            <input
              type="text"
              className="form-control"
              name="numeroDocumento"
              value={form.numeroDocumento}
              onChange={handleChange}
            />
            {errors.numeroDocumento && (
              <div className="text-danger small">{errors.numeroDocumento}</div>
            )}
          </div>
        </div>

        {/* Puesto */}
        <div className="mb-3">
          <label className="form-label">Puesto de trabajo deseado</label>
          <select
            className="form-select"
            name="puesto"
            value={form.puesto}
            onChange={handleChange}
          >
            <option value="">Seleccione</option>
            <option value="Arquitecto">Arquitecto</option>
            <option value="Constructor">Constructor</option>
            <option value="Electricista">Electricista</option>
          </select>
          {errors.puesto && <div className="text-danger small">{errors.puesto}</div>}
        </div>

        {/* Ciudad con lista filtrable */}
        <div className="mb-3 position-relative">
          <label className="form-label">Ciudad de residencia</label>
          <input
            type="text"
            className="form-control"
            name="ciudad"
            value={searchTerm}
            onChange={handleCityInput}
            onFocus={() => setShowList(true)}
            onBlur={() => setTimeout(() => setShowList(false), 150)}
            placeholder="Escribe para buscar..."
          />
          {errors.ciudad && <div className="text-danger small">{errors.ciudad}</div>}

          {showList && ciudadesFiltradas.length > 0 && (
            <ul
              className="list-group position-absolute w-100"
              style={{
                maxHeight: "150px",
                overflowY: "auto",
                zIndex: 10,
              }}
            >
              {ciudadesFiltradas.map((city, idx) => (
                <li
                  key={idx}
                  className="list-group-item list-group-item-action"
                  onClick={() => handleSelectCity(city)}
                  style={{ cursor: "pointer" }}
                >
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Registrarme
        </button>

        <div className="text-center mt-3">
          <small>
            ¿Ya tienes cuenta?{" "}
            <span className="text-primary" role="button" onClick={() => navigate("/login")}>
              Inicia sesión aquí
            </span>
          </small>
        </div>
      </form>
    </div>
  );
}
