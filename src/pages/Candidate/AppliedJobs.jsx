import React, { useState } from "react";
import "./../../styles/AppliedJobs.css";

const MisPostulaciones = () => {
  const [vacanteSeleccionada, setVacanteSeleccionada] = useState(null);

  const [postulaciones] = useState([
    {
      id: 1,
      titulo: "Arquitecto de Proyectos",
      empresa: "Constructora Horizonte",
      ciudad: "Bogotá",
      modalidad: "Presencial",
      salario: "4.200.000",
      descripcion:
        "Arquitecto con experiencia en diseño y supervisión de obras residenciales y comerciales. Conocimiento en AutoCAD, Revit y presupuestos de obra.",
      estado: "preseleccionado",
      fechaInicio: "01/11/2025",
      fechaFin: "30/11/2025",
    },
    {
      id: 3,
      titulo: "Técnico Electricista",
      empresa: "ElectroSistemas S.A.S.",
      ciudad: "Cali",
      modalidad: "Presencial",
      salario: "2.500.000",
      descripcion:
        "Técnico electricista con experiencia en instalaciones eléctricas de baja y media tensión. Conocimientos en planos eléctricos y normas RETIE.",
      estado: "pendiente",
      fechaInicio: "05/11/2025",
      fechaFin: "20/11/2025",
    },
    {
      id: 5,
      titulo: "Ayudante de Construcción",
      empresa: "Constructora Ideal",
      ciudad: "Bucaramanga",
      modalidad: "Presencial",
      salario: "1.600.000",
      descripcion:
        "Ayudante de obra para labores generales en construcción. No se requiere experiencia previa, pero sí disposición y compromiso.",
      estado: "no seleccionado",
      fechaInicio: "02/11/2025",
      fechaFin: "18/11/2025",
    },
  ]);

  return (    <div className="mis-postulaciones-container">
      <div className="container mt-5 text-center">
        <h2 className="text-primary mb-4">Mis Postulaciones</h2>

        <div className="row justify-content-center">
          {/* 📋 Lista de vacantes */}
          <div className="col-md-5 lista-postulaciones">
            {postulaciones.map((v) => (
              <div
                key={v.id}
                className={`card mb-3 shadow-sm vacante-card ${
                  vacanteSeleccionada?.id === v.id ? "activa" : ""
                }`}
                onClick={() => setVacanteSeleccionada(v)}
              >
                <div className="card-body text-start">
                  <h5 className="card-title">{v.titulo}</h5>
                  <p className="text-muted small mb-1">
                    {v.empresa} — {v.ciudad}
                  </p>
                  <p className="text-success fw-semibold mb-1">
                    💰 ${v.salario}
                  </p>
                  <p className="text-muted small">
                    Estado:{" "}
                    <span
                      className={`badge ${
                        v.estado === "preseleccionado"
                          ? "bg-success"
                          : v.estado === "no seleccionado"
                          ? "bg-danger"
                          : "bg-secondary"
                      }`}
                    >
                      {v.estado}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 🧠 Detalle de vacante */}
          <div className="col-md-6 detalle-vacante">
            {vacanteSeleccionada ? (
              <div className="card p-4 shadow-sm text-start">
                <h4 className="text-primary">{vacanteSeleccionada.titulo}</h4>
                <p className="text-muted mb-1">
                  {vacanteSeleccionada.empresa} — {vacanteSeleccionada.ciudad}
                </p>
                <p className="small text-secondary mb-3">
                  {vacanteSeleccionada.modalidad}
                </p>

                <p className="small text-muted mb-1">
                  <strong>Fecha de postulación:</strong>{" "}
                  {vacanteSeleccionada.fechaInicio}
                </p>

                {vacanteSeleccionada.estado === "pendiente" ? (
                  <p className="small text-muted mb-3">
                    <strong>Fecha de respuesta:</strong> Pendiente
                  </p>
                ) : (
                  <p className="small text-muted mb-3">
                    <strong>Fecha de respuesta:</strong>{" "}
                    {vacanteSeleccionada.fechaFin}
                  </p>
                )}

                <hr />
                <p>{vacanteSeleccionada.descripcion}</p>
                <hr />
                <p className="fw-semibold text-success">
                  💰 Salario: ${vacanteSeleccionada.salario}
                </p>
              </div>
            ) : (
              <div className="text-center text-muted mt-5 placeholder-card">
                <p>Selecciona una vacante para ver los detalles.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MisPostulaciones;
