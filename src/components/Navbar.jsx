import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [rol, setRol] = useState("");
  const [navbarColapsada, setNavbarColapsada] = useState(true);
  const menuRef = useRef(null);

  useEffect(() => {
    const rolGuardado = (localStorage.getItem("rol") || "candidato").toLowerCase();
    setRol(rolGuardado);
  }, []);

  useEffect(() => {
    const handleClickFuera = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuAbierto(false);
      }
    };
    document.addEventListener("mousedown", handleClickFuera);
    return () => document.removeEventListener("mousedown", handleClickFuera);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    navigate("/login");
  };

  const handlePerfil = () => {
    navigate(rol === "admin" ? "/a/perfil" : "/c/perfil");
  };

  const cerrarMenuResponsive = () => {
    const navbarCollapse = document.getElementById("navbarNav");
    if (navbarCollapse.classList.contains("show")) {
      navbarCollapse.classList.remove("show");
      setNavbarColapsada(true);
    }
  };

  const toggleNavbar = () => {
    setNavbarColapsada(!navbarColapsada);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top shadow-sm w-100">
      <div className="container-fluid">
        {/* LOGO */}
        <Link className="navbar-brand fw-bold ms-2" to="/" onClick={cerrarMenuResponsive}>
          <i className="bi bi-briefcase-fill me-2"></i>SPES-JOB
        </Link>

        {/* Botón responsive */}
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarNav"
          aria-expanded={!navbarColapsada}
          aria-label="Toggle navigation"
          onClick={toggleNavbar}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenido */}
        <div className={`collapse navbar-collapse ${navbarColapsada ? "" : "show"}`} id="navbarNav">
          {/* LINKS A LA IZQUIERDA */}
          <ul className="navbar-nav me-auto align-items-center">
            {rol === "admin" ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/a/crearVacante" onClick={cerrarMenuResponsive}>
                    Crear Vacante
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/a/gestionarVacantes" onClick={cerrarMenuResponsive}>
                    Gestionar Vacantes
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/c/vacantes" onClick={cerrarMenuResponsive}>
                    Vacantes
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/c/vacantesAplicadas" onClick={cerrarMenuResponsive}>
                    Mis Postulaciones
                  </Link>
                </li>
              </>
            )}

            {/* Cuando está en modo hamburguesa, mostrar Perfil/Cerrar dentro */}
            {!navbarColapsada && (
              <>
                <li className="nav-item">
                  <button className="nav-link btn btn-link text-white" onClick={() => { handlePerfil(); cerrarMenuResponsive(); }}>
                    <i className="bi bi-person me-2"></i> Perfil
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link text-white"
                    onClick={() => { handleLogout(); cerrarMenuResponsive(); }}
                  >
                    <i className="bi bi-box-arrow-right me-2"></i> Cerrar sesión
                  </button>
                </li>
              </>
            )}
          </ul>

          {/* ICONO PERFIL A LA DERECHA (solo cuando no está colapsado) */}
          {navbarColapsada && (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item position-relative" ref={menuRef}>
                <div
                  className="perfil-icono text-white me-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => setMenuAbierto(!menuAbierto)}
                >
                  <i className="bi bi-person-circle fs-4"></i>
                </div>

                {menuAbierto && (
                  <div
                    className="dropdown-menu dropdown-menu-end show mt-2"
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "100%",
                    }}
                  >
                    <button className="dropdown-item" onClick={() => { handlePerfil(); setMenuAbierto(false); }}>
                      <i className="bi bi-person me-2"></i> Perfil
                    </button>
                    <button
                      className="dropdown-item text-danger"
                      onClick={() => { handleLogout(); setMenuAbierto(false); }}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i> Cerrar sesión
                    </button>
                  </div>
                )}
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
