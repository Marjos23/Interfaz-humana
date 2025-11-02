import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usuariosAPI } from "../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faEnvelope, 
  faLock
} from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.classList.add("auth-no-scroll");
    return () => {
      document.body.classList.remove("auth-no-scroll");
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const user = await usuariosAPI.login(formData.email, formData.password);
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/dashboard");
    } catch (error) {
      console.error("Error en login:", error);
      setErrors({
        email: "Credenciales inválidas",
        password: "Credenciales inválidas",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modern-login-page">
      <div className="modern-login-content">
        <div className="modern-login-header">
          <h1>🏛️ MANTA</h1>
          <p>Portal de Participación Ciudadana</p>
          <div className="modern-login-badges">
            <span className="login-pill">Transparencia en tiempo real</span>
            <span className="login-pill">Atención 24/7</span>
          </div>
        </div>

        <div className="modern-login-card">
          <div className="modern-card-header">
            <span className="access-badge">ACCESO SEGURO</span>
            <p className="card-subtitle">Usa las credenciales asignadas por el municipio</p>
          </div>
          <form onSubmit={handleSubmit} className="modern-login-form">
            <div className="modern-form-group">
              <label htmlFor="email">
                <FontAwesomeIcon icon={faEnvelope} /> Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="ciudadano@manta.gob.ec"
                required
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "input-error" : ""}
              />
              {errors.email && (
                <span className="modern-error-message">{errors.email}</span>
              )}
            </div>

            <div className="modern-form-group">
              <label htmlFor="password">
                <FontAwesomeIcon icon={faLock} /> Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                required
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "input-error" : ""}
              />
              {errors.password && (
                <span className="modern-error-message">{errors.password}</span>
              )}
            </div>

            <div className="modern-login-actions">
              <button type="submit" className="modern-btn-primary" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner"></span> Iniciando sesión...
                  </>
                ) : (
                  "Ingresar al Portal"
                )}
              </button>
              <Link to="/register" className="modern-btn-secondary">
                Crear nueva cuenta
              </Link>
            </div>
          </form>

          <div className="modern-form-links">
            <a href="#" className="forgot-link">
              ¿Olvidó su contraseña?
            </a>
          </div>

          <div className="login-footer">
            <p>© 2025 Municipio de Manta</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
