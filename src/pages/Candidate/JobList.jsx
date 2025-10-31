import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./../../styles/JobList.css";

const BuscarVacantes = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [filtro, setFiltro] = useState("");
  const [filtroContrato, setFiltroContrato] = useState("");
  const [filtroJornada, setFiltroJornada] = useState("");
  const [filtroCiudad, setFiltroCiudad] = useState("");
  const [vacanteSeleccionada, setVacanteSeleccionada] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [postulados, setPostulados] = useState([]);

  // 🔒 Estado de sesión
  const [usuarioLogeado, setUsuarioLogeado] = useState(false);
  useEffect(() => {
    const usuario = localStorage.getItem("usuario");
    setUsuarioLogeado(!!usuario);
  }, []);

  // 📄 Hoja de vida
  const [cvCargada, setCvCargada] = useState(null);

  // 📋 Ejemplo de vacantes
  const [vacantes] = useState([
    {
      id: 1,
      titulo: "Arquitecto de Proyectos",
      descripcion:
        "Se requiere arquitecto con experiencia en diseño y supervisión de obras residenciales y comerciales. Conocimiento en AutoCAD, Revit y presupuestos de obra.",
      ciudad: "Bogotá",
      modalidad: "Presencial",
      salario: "4.200.000",
      empresa: "Constructora Horizonte",
      tipoContrato: "Término indefinido",
      jornada: "Tiempo completo",
      publicada: "Hace 45 minutos",
      fechaInicio: "01/11/2025",
      fechaFin: "30/11/2025",
    },
    {
      id: 2,
      titulo: "Maestro de Obra",
      descripcion:
        "Buscamos maestro de obra con experiencia comprobada en construcción de vivienda multifamiliar. Capacidad de coordinar equipos y velar por la calidad del proyecto.",
      ciudad: "Medellín",
      modalidad: "Presencial",
      salario: "3.000.000",
      empresa: "Proyectos Urbanos S.A.",
      tipoContrato: "Término fijo",
      jornada: "Tiempo completo",
      publicada: "Hace 1 hora",
      fechaInicio: "03/11/2025",
      fechaFin: "25/11/2025",
    },
  ]);

  // 📥 Leer parámetros de la URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cargoParam = params.get("cargo") || "";
    const ciudadParam = params.get("ciudad") || "";

    setFiltro(cargoParam);
    setFiltroCiudad(ciudadParam);
  }, [location.search]);

  // 🔍 Filtrado combinado
  const vacantesFiltradas = vacantes.filter((v) => {
    const coincideTexto =
      v.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
      v.ciudad.toLowerCase().includes(filtro.toLowerCase()) ||
      v.modalidad.toLowerCase().includes(filtro.toLowerCase());
    const coincideContrato =
      filtroContrato === "" || v.tipoContrato === filtroContrato;
    const coincideJornada =
      filtroJornada === "" || v.jornada === filtroJornada;
    const coincideCiudad =
      filtroCiudad === "" ||
      v.ciudad.toLowerCase().includes(filtroCiudad.toLowerCase());
    return coincideTexto && coincideContrato && coincideJornada && coincideCiudad;
  });

  // 🔁 Reset si cambia el filtro
  useEffect(() => {
    if (
      vacanteSeleccionada &&
      !vacantesFiltradas.some((v) => v.id === vacanteSeleccionada.id)
    ) {
      setVacanteSeleccionada(null);
    }
  }, [filtro, filtroContrato, filtroJornada, filtroCiudad]);

  // 🧠 Al seleccionar una vacante
  const handleSeleccionar = (vacante) => {
    setVacanteSeleccionada(vacante);
    setMensaje("");
    setCvCargada(null); // obliga a cargar CV cada vez que selecciona
  };

  const handleArchivo = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCvCargada(file);
      setMensaje(`📄 Hoja de vida cargada: ${file.name}`);
    }
  };

  const handlePostularse = (vacante) => {
    if (!cvCargada) {
      setMensaje("⚠️ Debes adjuntar tu hoja de vida antes de postularte.");
      return;
    }
    setPostulados([...postulados, vacante.id]);
    setMensaje(`✅ Te has postulado exitosamente a "${vacante.titulo}"`);
  };

  const ciudades = [...new Set(vacantes.map((v) => v.ciudad))];

  return (
    <div className="buscar-vacantes container my-5">
      <h2 className="text-center text-primary mb-4">Buscar Vacantes</h2>

      {/* Filtros */}
      <div className="filtros d-flex flex-wrap justify-content-center gap-2 mb-4 bg-white p-3 rounded shadow-sm">
        <input
          type="text"
          className="form-control filtro-input shadow-sm"
          placeholder="🔍 Buscar por título, ciudad o modalidad..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />

        <select
          className="form-select filtro-select"
          value={filtroContrato}
          onChange={(e) => setFiltroContrato(e.target.value)}
        >
          <option value="">Tipo de contrato</option>
          <option value="Término indefinido">Término indefinido</option>
          <option value="Término fijo">Término fijo</option>
          <option value="Por proyecto">Por proyecto</option>
        </select>

        <select
          className="form-select filtro-select"
          value={filtroJornada}
          onChange={(e) => setFiltroJornada(e.target.value)}
        >
          <option value="">Jornada</option>
          <option value="Tiempo completo">Tiempo completo</option>
          <option value="Medio tiempo">Medio tiempo</option>
        </select>

        <select
          className="form-select filtro-select"
          value={filtroCiudad}
          onChange={(e) => setFiltroCiudad(e.target.value)}
        >
          <option value="">Ciudad</option>
          {ciudades.map((c, i) => (
            <option key={i} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="row g-4">
        {/* Lista de vacantes */}
        <div className="col-md-5 lista-vacantes">
          {vacantesFiltradas.length > 0 ? (
            vacantesFiltradas.map((v) => (
              <div
                key={v.id}
                className={`card mb-3 shadow-sm vacante-card ${
                  vacanteSeleccionada?.id === v.id ? "activa" : ""
                }`}
                onClick={() => handleSeleccionar(v)}
              >
                <div className="card-body">
                  <h5 className="card-title text-primary">{v.titulo}</h5>
                  <p className="card-text mb-1 fw-semibold text-secondary">
                    {v.empresa}
                  </p>
                  <p className="text-muted small mb-1">
                    {v.ciudad} • {v.modalidad}
                  </p>
                  <p className="text-success fw-semibold mb-1">💰 ${v.salario}</p>
                  <p className="text-muted small">{v.publicada}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted mt-3">
              No se encontraron vacantes.
            </p>
          )}
        </div>

        {/* Detalle de vacante */}
        <div className="col-md-7 detalle-vacante">
          {vacanteSeleccionada ? (
            <div className="card shadow-sm p-4 h-100">
              <h4 className="text-primary">{vacanteSeleccionada.titulo}</h4>
              <p className="text-muted mb-1">
                {vacanteSeleccionada.empresa} — {vacanteSeleccionada.ciudad}
              </p>
              <p className="small text-secondary mb-3">
                {vacanteSeleccionada.modalidad} |{" "}
                {vacanteSeleccionada.tipoContrato} |{" "}
                {vacanteSeleccionada.jornada}
              </p>

              <hr />
              <p>{vacanteSeleccionada.descripcion}</p>
              <hr />

              <p className="fw-semibold text-success">
                💰 Salario: ${vacanteSeleccionada.salario}
              </p>

              <div className="mt-auto text-center">
                {/* Solicitar CV antes de postular */}
                {!cvCargada && (
                  <>
                    <p className="text-muted small mb-2">
                      📎 Antes de postularte, por favor adjunta tu hoja de vida:
                    </p>
                    <input
                      type="file"
                      className="form-control form-control-sm mb-3 mx-auto"
                      accept=".pdf,.doc,.docx"
                      onChange={handleArchivo}
                    />
                  </>
                )}

                <button
                  className={`btn w-100 mt-2 ${
                    postulados.includes(vacanteSeleccionada.id)
                      ? "btn-success"
                      : "btn-primary"
                  }`}
                  disabled={
                    postulados.includes(vacanteSeleccionada.id) || !cvCargada
                  }
                  onClick={() => handlePostularse(vacanteSeleccionada)}
                >
                  {postulados.includes(vacanteSeleccionada.id)
                    ? "Postulado ✅"
                    : "Postularse"}
                </button>

                {mensaje && (
                  <div
                    className={`mt-2 small ${
                      mensaje.includes("⚠️") ? "text-warning" : "text-success"
                    }`}
                  >
                    {mensaje}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center text-muted mt-5">
              <p>Selecciona una vacante para ver los detalles.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuscarVacantes;
