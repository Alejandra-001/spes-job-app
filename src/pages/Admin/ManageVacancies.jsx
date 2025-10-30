import React, { useState } from "react";
import "./../../styles/ManageVacancies.css";

const AdministrarVacantes = () => {
  const [vacantes, setVacantes] = useState([
    {
      id: 1,
      titulo: "Arquitecto de Proyectos",
      descripcion:
        "Se requiere arquitecto con experiencia en diseño y supervisión de obras residenciales y comerciales. Conocimiento en AutoCAD, Revit y presupuestos de obra.",
      salario: "4200000",
      modalidad: "Presencial",
      ciudad: "Bogotá",
      fechaLimite: "2025-11-30",
      aplicantes: [
        { id: 201, nombre: "Juan Pérez", hojaVida: "/cv/juan_perez.pdf", estado: "pendiente" },
        { id: 202, nombre: "Laura Gómez", hojaVida: "/cv/laura_gomez.pdf", estado: "pendiente" },
      ],
    },
    {
      id: 2,
      titulo: "Maestro de Obra",
      descripcion:
        "Buscamos maestro de obra con experiencia comprobada en construcción de vivienda multifamiliar. Capacidad de coordinar equipos y velar por la calidad del proyecto.",
      salario: "3000000",
      modalidad: "Presencial",
      ciudad: "Medellín",
      fechaLimite: "2025-11-25",
      aplicantes: [
        { id: 203, nombre: "Carlos Ruiz", hojaVida: "/cv/carlos_ruiz.pdf", estado: "pendiente" },
        { id: 204, nombre: "Andrés López", hojaVida: "/cv/andres_lopez.pdf", estado: "pendiente" },
      ],
    },
    {
      id: 3,
      titulo: "Técnico Electricista",
      descripcion:
        "Empresa del sector industrial requiere técnico electricista con experiencia en instalaciones eléctricas de baja y media tensión. Conocimientos en planos eléctricos y normas RETIE.",
      salario: "2500000",
      modalidad: "Presencial",
      ciudad: "Cali",
      fechaLimite: "2025-11-20",
      aplicantes: [
        { id: 205, nombre: "Sofía Torres", hojaVida: "/cv/sofia_torres.pdf", estado: "pendiente" },
      ],
    },
    {
      id: 4,
      titulo: "Ingeniero Civil Residente de Obra",
      descripcion:
        "Se busca ingeniero civil con mínimo 3 años de experiencia en obras de infraestructura. Conocimiento en presupuestos, control de avance y manejo de contratistas.",
      salario: "5000000",
      modalidad: "Híbrido",
      ciudad: "Barranquilla",
      fechaLimite: "2025-11-30",
      aplicantes: [
        { id: 206, nombre: "Diego Martínez", hojaVida: "/cv/diego_martinez.pdf", estado: "pendiente" },
      ],
    },
    {
      id: 5,
      titulo: "Ayudante de Construcción",
      descripcion:
        "Se requieren ayudantes de obra para labores generales en construcción de edificaciones. No se requiere experiencia previa, pero sí disposición y compromiso.",
      salario: "1600000",
      modalidad: "Presencial",
      ciudad: "Bucaramanga",
      fechaLimite: "2025-11-18",
      aplicantes: [
        { id: 207, nombre: "Luis Ramírez", hojaVida: "/cv/luis_ramirez.pdf", estado: "pendiente" },
        { id: 208, nombre: "Jorge Castro", hojaVida: "/cv/jorge_castro.pdf", estado: "pendiente" },
      ],
    },
  ]);

  const [modoEdicion, setModoEdicion] = useState(null);
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    salario: "",
    modalidad: "",
    ciudad: "",
    fechaLimite: "",
  });

  const [vacanteSeleccionada, setVacanteSeleccionada] = useState(null);

  const handleEdit = (vacante) => {
    setModoEdicion(vacante.id);
    setFormData(vacante);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = (id) => {
    const actualizadas = vacantes.map((v) =>
      v.id === id ? { ...formData, id, aplicantes: v.aplicantes } : v
    );
    setVacantes(actualizadas);
    setModoEdicion(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar esta vacante?")) {
      setVacantes(vacantes.filter((v) => v.id !== id));
    }
  };

  const handleVerAplicantes = (vacanteId) => {
    setVacanteSeleccionada(vacanteSeleccionada === vacanteId ? null : vacanteId);
  };

  const handleActualizarEstado = (vacanteId, aplicanteId, nuevoEstado) => {
    const actualizadas = vacantes.map((vac) => {
      if (vac.id === vacanteId) {
        const nuevosAplicantes = vac.aplicantes.map((ap) =>
          ap.id === aplicanteId ? { ...ap, estado: nuevoEstado } : ap
        );
        return { ...vac, aplicantes: nuevosAplicantes };
      }
      return vac;
    });
    setVacantes(actualizadas);
  };

  return (
    <div className="container administrar-vacantes mt-5">
      <h2 className="text-center text-primary mb-4">Administrar Vacantes de Construcción</h2>

      {vacantes.length === 0 ? (
        <p className="text-muted text-center">
          No hay vacantes registradas actualmente.
        </p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>Título</th>
                <th>Descripción</th>
                <th>Ciudad</th>
                <th>Modalidad</th>
                <th>Salario</th>
                <th>Fecha Límite</th>
                <th>Aplicaciones</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {vacantes.map((vac, index) => (
                <React.Fragment key={vac.id}>
                  <tr>
                    <td>{index + 1}</td>
                    {modoEdicion === vac.id ? (
                      <>
                        <td>
                          <input
                            type="text"
                            name="titulo"
                            className="form-control"
                            value={formData.titulo}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <textarea
                            name="descripcion"
                            className="form-control"
                            rows="2"
                            value={formData.descripcion}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="ciudad"
                            className="form-control"
                            value={formData.ciudad}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <select
                            name="modalidad"
                            className="form-select"
                            value={formData.modalidad}
                            onChange={handleChange}
                          >
                            <option>Presencial</option>
                            <option>Remoto</option>
                            <option>Híbrido</option>
                          </select>
                        </td>
                        <td>
                          <input
                            type="number"
                            name="salario"
                            className="form-control"
                            value={formData.salario}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <input
                            type="date"
                            name="fechaLimite"
                            className="form-control"
                            value={formData.fechaLimite}
                            onChange={handleChange}
                          />
                        </td>
                        <td>{vac.aplicantes.length}</td>
                        <td className="text-center">
                          <div className="d-flex flex-column align-items-center gap-2">
                            <button
                              className="btn btn-primary btn-sm w-100"
                              onClick={() => handleSave(vac.id)}
                            >
                              Guardar
                            </button>
                            <button
                              className="btn btn-secondary btn-sm w-100"
                              onClick={() => setModoEdicion(null)}
                            >
                              Cancelar
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{vac.titulo}</td>
                        <td>{vac.descripcion}</td>
                        <td>{vac.ciudad}</td>
                        <td>{vac.modalidad}</td>
                        <td>${vac.salario}</td>
                        <td>{vac.fechaLimite}</td>
                        <td>
                          <button
                            className="btn btn-info btn-sm"
                            onClick={() => handleVerAplicantes(vac.id)}
                          >
                            {vacanteSeleccionada === vac.id
                              ? "Ocultar"
                              : `Ver (${vac.aplicantes.length})`}
                          </button>
                        </td>
                        <td>
                          <div className="d-flex flex-column align-items-center gap-2">
                            <button
                              className="btn btn-warning btn-sm w-100"
                              onClick={() => handleEdit(vac)}
                            >
                              Editar
                            </button>
                            <button
                              className="btn btn-danger btn-sm w-100"
                              onClick={() => handleDelete(vac.id)}
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>

                  {/* Aplicantes */}
                  {vacanteSeleccionada === vac.id && (
                    <tr>
                      <td colSpan="9">
                        <div className="aplicantes mt-3">
                          <h5 className="text-secondary mb-3">
                            Aplicantes de "{vac.titulo}"
                          </h5>
                          {vac.aplicantes.length === 0 ? (
                            <p className="text-muted">
                              No hay aplicantes para esta vacante.
                            </p>
                          ) : (
                            <table className="table table-bordered">
                              <thead className="table-light">
                                <tr>
                                  <th>Nombre</th>
                                  <th>Hoja de Vida</th>
                                  <th>Estado</th>
                                  <th>Acciones</th>
                                </tr>
                              </thead>
                              <tbody>
                                {vac.aplicantes.map((ap) => (
                                  <tr key={ap.id}>
                                    <td>{ap.nombre}</td>
                                    <td>
                                      <a
                                        href={ap.hojaVida}
                                        download
                                        className="btn btn-outline-primary btn-sm"
                                      >
                                        Descargar CV
                                      </a>
                                    </td>
                                    <td>
                                      <span
                                        className={`badge ${
                                          ap.estado === "preseleccionado"
                                            ? "bg-success"
                                            : ap.estado === "no seleccionado"
                                            ? "bg-danger"
                                            : "bg-secondary"
                                        }`}
                                      >
                                        {ap.estado}
                                      </span>
                                    </td>
                                    <td>
                                      <button
                                        className="btn btn-success btn-sm me-2"
                                        onClick={() =>
                                          handleActualizarEstado(
                                            vac.id,
                                            ap.id,
                                            "preseleccionado"
                                          )
                                        }
                                      >
                                        Preseleccionar
                                      </button>
                                      <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                          handleActualizarEstado(
                                            vac.id,
                                            ap.id,
                                            "no seleccionado"
                                          )
                                        }
                                      >
                                        No Seleccionar
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdministrarVacantes;
