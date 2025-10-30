import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|com\.co)$/;
    return regex.test(email);
  };

  useEffect(() => {
    const newErrors = {};

    if (touched.email) {
      if (!email) newErrors.email = "Campo obligatorio, por favor diligenciar.";
      else if (!email.includes("@"))
        newErrors.email = "El correo debe incluir el símbolo '@'.";
      else if (!validateEmail(email))
        newErrors.email =
          "Verifica el correo (debe terminar en .com o .com.co).";
    }

    if (touched.password) {
      if (!password)
        newErrors.password = "Campo obligatorio, por favor diligenciar.";
      else if (password.length < 6)
        newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
    }

    setErrors(newErrors);
  }, [email, password, touched]);

  useEffect(() => {
    if (!loginError) return;
    const timer = setTimeout(() => setLoginError(""), 3000);
    return () => clearTimeout(timer);
  }, [loginError]);

  const isFormValid =
    Object.keys(errors).length === 0 &&
    email &&
    password &&
    validateEmail(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    const usuarios = [
      { email: "admin@spes.com.co", password: "123456", rol: "admin" },
      { email: "juan@gmail.com", password: "123456", rol: "candidato" },
    ];

    const user = usuarios.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      // 🔹 Guardar el usuario en localStorage
      localStorage.setItem("rol", user.rol.toLowerCase());
      localStorage.setItem("usuario", JSON.stringify(user));

      setLoginError("");
      if (user.rol === "admin") navigate("/a/crearVacante");
      else navigate("/c/vacantes");
    } else
      window.location.reload();
       {
      setLoginError(
        "Los datos de inicio de sesión son incorrectos. Por favor verifícalos e intenta nuevamente."
      );
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-90 bg-light">
      <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Portal de Empleo SPES</h3>

        <form onSubmit={handleSubmit}>
          {/* Correo */}
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              className={`form-control ${
                touched.email
                  ? errors.email
                    ? "is-invalid"
                    : "is-valid"
                  : ""
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
              placeholder="ejemplo@correo.com"
            />
            {touched.email && errors.email && (
              <small className="text-danger">{errors.email}</small>
            )}
          </div>

          {/* Contraseña */}
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className={`form-control ${
                touched.password
                  ? errors.password
                    ? "is-invalid"
                    : "is-valid"
                  : ""
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
              placeholder="Ingresa tu contraseña"
            />
            {touched.password && errors.password && (
              <small className="text-danger">{errors.password}</small>
            )}
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={!isFormValid}
          >
            Iniciar sesión
          </button>

          {/* Error general */}
          {loginError && (
            <div
              className="mt-3 text-danger text-center"
              role="alert"
              aria-live="polite"
            >
              {loginError}
            </div>
          )}
        </form>

        {/* Enlace registro */}
        <p className="mt-3 text-center">
          ¿No estás registrado?{" "}
          <span
            className="text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/registro")}
          >
            Regístrate aquí
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
