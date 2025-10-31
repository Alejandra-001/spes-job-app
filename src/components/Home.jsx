import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "./../styles/Home.css";

export default function Home() {
  const navigate = useNavigate();

  const [busqueda, setBusqueda] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [showCategorias, setShowCategorias] = useState(false);
  const [showCiudades, setShowCiudades] = useState(false);

  // Detectar entorno (local o producción en GitHub Pages)
  const BASE_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:5173/spes-job-app"
      : "https://alejandra-001.github.io/spes-job-app";

  // Categorías relacionadas con construcción
  const categoriasConstruccion = [
    "Arquitecto",
    "Maestro de obra",
    "Ingeniero civil",
    "Electricista",
    "Plomero",
    "Soldador",
    "Albañil",
    "Diseñador estructural",
    "Topógrafo",
    "Contratista",
    "Ingeniero sanitario",
    "Técnico en instalaciones",
  ];

  // Ciudades principales de Colombia
  const ciudadesColombia = [
    "Bogotá",
    "Medellín",
    "Cali",
    "Barranquilla",
    "Cartagena",
    "Bucaramanga",
    "Cúcuta",
    "Manizales",
    "Pereira",
    "Santa Marta",
  ];

  // Acción del botón "Buscar"
  const handleBuscar = (e) => {
    e.preventDefault();
    window.location.href = `${BASE_URL}/#/c/vacantes?cargo=${busqueda}&ciudad=${ciudad}`;
  };

  // Filtros dinámicos
  const categoriasFiltradas = categoriasConstruccion
    .filter((cat) => cat.toLowerCase().includes(busqueda.toLowerCase()))
    .slice(0, 5);

  const ciudadesFiltradas = ciudadesColombia
    .filter((c) => c.toLowerCase().includes(ciudad.toLowerCase()))
    .slice(0, 5);

  return (
    <div className="inicio-container">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-light shadow-sm py-3 mb-1 fixed-top">
        <div className="csuperior container">
          <a className="navbar-brand fw-bold text-warning" href="/">
            SPES JOB
          </a>
          <div className="d-flex ms-auto">
            <button
              className="btn btn-outline-primary me-2"
              onClick={() => navigate("/login")}
            >
              Iniciar sesión
            </button>
            <button
              className="btn btn-register-home"
              onClick={() => navigate("/registro")}
            >
              <i className="bi bi-person-plus me-2"></i> Registrarse
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="cbusqueda hero-section text-center text-white d-flex align-items-center justify-content-center">
        <div className="container bg-transparent">
          <form
            onSubmit={handleBuscar}
            className="d-flex flex-column flex-md-row justify-content-center gap-2 position-relative mt-4"
          >
            {/* Campo Cargo o Categoría */}
            <div className="position-relative w-100 w-md-50">
              <input
                type="text"
                placeholder="Cargo o categoría"
                className="form-control"
                value={busqueda}
                onChange={(e) => {
                  setBusqueda(e.target.value);
                  setShowCategorias(true);
                }}
                onFocus={() => setShowCategorias(true)}
                onBlur={() => setTimeout(() => setShowCategorias(false), 150)}
                required
              />
              {showCategorias && categoriasFiltradas.length > 0 && (
                <ul
                  className="list-group position-absolute w-100 shadow-sm suggestion-list"
                  style={{
                    zIndex: 10,
                  }}
                >
                  {categoriasFiltradas.map((cat, i) => (
                    <li
                      key={i}
                      className="list-group-item list-group-item-action"
                      onClick={() => {
                        setBusqueda(cat);
                        setShowCategorias(false);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      {cat}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Campo Ciudad */}
            <div className="position-relative w-100 w-md-25">
              <input
                type="text"
                placeholder="Lugar"
                className="form-control"
                value={ciudad}
                onChange={(e) => {
                  setCiudad(e.target.value);
                  setShowCiudades(true);
                }}
                onFocus={() => setShowCiudades(true)}
                onBlur={() => setTimeout(() => setShowCiudades(false), 150)}
                required
              />
              {showCiudades && ciudadesFiltradas.length > 0 && (
                <ul
                  className="list-group position-absolute w-100 shadow-sm suggestion-list"
                  style={{
                    zIndex: 10,
                  }}
                >
                  {ciudadesFiltradas.map((c, i) => (
                    <li
                      key={i}
                      className="list-group-item list-group-item-action"
                      onClick={() => {
                        setCiudad(c);
                        setShowCiudades(false);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button type="submit" className="btn btn-warning fw-bold">
              Buscar
            </button>
          </form>
        </div>
      </header>

      {/* Ofertas destacadas */}
      <section className="container bg-transparent pt-4">
        <h3 className="tofertas text-center fw-bold mb-4">Ofertas destacadas</h3>
        <div className="row g-4 ">
          {[
            {
              titulo: "Arquitecto de obra",
              empresa: "Constructora Nova",
              ciudad: "Bogotá",
            },
            {
              titulo: "Maestro de obra",
              empresa: "Edifica S.A.",
              ciudad: "Medellín",
            },
            {
              titulo: "Electricista industrial",
              empresa: "ElectroPro",
              ciudad: "Cali",
            },
            {
              titulo: "Topógrafo",
              empresa: "GeoIngeniería",
              ciudad: "Barranquilla",
            },
          ].map((item, i) => (
            <div key={i} className="col-12 col-md-6 col-lg-3">
              <div className="bg-light card shadow-sm h-100 border-0">
                <div className="card-body">
                  <h5 className="card-title fw-bold">{item.titulo}</h5>
                  <p className="card-text text-muted mb-1">{item.empresa}</p>
                  <p className="text-secondary small mb-2">{item.ciudad}</p>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() =>
                      (window.location.href = `${BASE_URL}/#/c/vacantes`)
                    }
                  >
                    Ver detalles
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer  className="bg-transparent text-center mt-3 py-4">
        <p className="mb-0 text-secondary small text-warning">
          © 2025 SPES JOB — Tu portal de empleo confiable.
        </p>
      </footer>
    </div>
  );
}
