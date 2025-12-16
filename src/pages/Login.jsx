import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usuariosAPI } from "../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faQuestionCircle,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Estados para bloqueo temporal
  const [intentosFallidos, setIntentosFallidos] = useState(0);
  const [bloqueado, setBloqueado] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(0);

  // Estado para tooltips de ayuda
  const [showHelp, setShowHelp] = useState({ email: false, password: false });

  useEffect(() => {
    document.body.classList.add("auth-no-scroll");

    // Cargar email guardado si existe
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setFormData((prev) => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }

    // Verificar si hay bloqueo activo
    const bloqueoData = localStorage.getItem("loginBloqueo");
    if (bloqueoData) {
      const { hasta, intentos } = JSON.parse(bloqueoData);
      const ahora = Date.now();
      if (ahora < hasta) {
        setBloqueado(true);
        setIntentosFallidos(intentos);
        setTiempoRestante(Math.ceil((hasta - ahora) / 1000));
      } else {
        localStorage.removeItem("loginBloqueo");
      }
    }

    return () => {
      document.body.classList.remove("auth-no-scroll");
    };
  }, []);

  // Contador regresivo para desbloqueo
  useEffect(() => {
    let interval;
    if (bloqueado && tiempoRestante > 0) {
      interval = setInterval(() => {
        setTiempoRestante((prev) => {
          if (prev <= 1) {
            setBloqueado(false);
            setIntentosFallidos(0);
            localStorage.removeItem("loginBloqueo");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [bloqueado, tiempoRestante]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si está bloqueado
    if (bloqueado) {
      Swal.fire({
        title: "⚠️ Cuenta Bloqueada",
        html: `Demasiados intentos fallidos.<br>Espera <strong>${tiempoRestante}</strong> segundos.`,
        icon: "warning",
        confirmButtonText: "Entendido",
        confirmButtonColor: "#e53e3e",
      });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const user = await usuariosAPI.login(formData.email, formData.password);
      localStorage.setItem("currentUser", JSON.stringify(user));

      // Limpiar intentos fallidos
      setIntentosFallidos(0);
      localStorage.removeItem("loginBloqueo");

      // Guardar o eliminar email según "Recordarme"
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", formData.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      // Notificación de inicio de sesión exitoso
      Swal.fire({
        title: "✅ Bienvenido",
        text: `Inicio de sesión exitoso. ${new Date().toLocaleString("es-EC")}`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Error en login:", error);

      // Incrementar intentos fallidos
      const nuevosIntentos = intentosFallidos + 1;
      setIntentosFallidos(nuevosIntentos);

      if (nuevosIntentos >= 3) {
        // Bloquear por 30 segundos
        const hasta = Date.now() + 30000;
        localStorage.setItem(
          "loginBloqueo",
          JSON.stringify({ hasta, intentos: nuevosIntentos })
        );
        setBloqueado(true);
        setTiempoRestante(30);

        Swal.fire({
          title: "🔒 Cuenta Bloqueada",
          html: `Has excedido el límite de intentos.<br>Tu cuenta está bloqueada por <strong>30 segundos</strong>.`,
          icon: "error",
          confirmButtonText: "Entendido",
          confirmButtonColor: "#e53e3e",
        });
      } else {
        Swal.fire({
          title: "Credenciales Incorrectas",
          html: `Intento ${nuevosIntentos} de 3.<br>Después de 3 intentos se bloqueará temporalmente.`,
          icon: "error",
          confirmButtonText: "Reintentar",
          confirmButtonColor: "#3b82f6",
        });
      }

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
            <span className="access-badge">
              <FontAwesomeIcon icon={faShieldAlt} /> ACCESO SEGURO
            </span>
            <p className="card-subtitle">
              Usa las credenciales asignadas por el municipio
            </p>
          </div>

          {/* Alerta de bloqueo */}
          {bloqueado && (
            <div className="bloqueo-alerta">
              <span className="bloqueo-icon">🔒</span>
              <div className="bloqueo-texto">
                <strong>Cuenta bloqueada temporalmente</strong>
                <p>Espera {tiempoRestante} segundos para reintentar</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="modern-login-form">
            <div className="modern-form-group">
              <label htmlFor="email">
                <FontAwesomeIcon icon={faEnvelope} /> Correo Electrónico
                <button
                  type="button"
                  className="help-tooltip-btn"
                  onClick={() =>
                    setShowHelp((prev) => ({ ...prev, email: !prev.email }))
                  }
                  aria-label="Ayuda sobre correo electrónico"
                >
                  <FontAwesomeIcon icon={faQuestionCircle} />
                </button>
              </label>
              {showHelp.email && (
                <div className="help-tooltip">
                  Ingresa el correo electrónico registrado en el sistema
                  municipal. Ej: ciudadano@manta.gob.ec
                </div>
              )}
              <input
                type="email"
                id="email"
                name="email"
                placeholder="ciudadano@manta.gob.ec"
                required
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "input-error" : ""}
                disabled={bloqueado}
              />
              {errors.email && (
                <span className="modern-error-message">{errors.email}</span>
              )}
            </div>

            <div className="modern-form-group">
              <label htmlFor="password">
                <FontAwesomeIcon icon={faLock} /> Contraseña
                <button
                  type="button"
                  className="help-tooltip-btn"
                  onClick={() =>
                    setShowHelp((prev) => ({
                      ...prev,
                      password: !prev.password,
                    }))
                  }
                  aria-label="Ayuda sobre contraseña"
                >
                  <FontAwesomeIcon icon={faQuestionCircle} />
                </button>
              </label>
              {showHelp.password && (
                <div className="help-tooltip">
                  Tu contraseña debe tener mínimo 6 caracteres. Si la olvidaste,
                  usa "¿Olvidó su contraseña?"
                </div>
              )}
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                required
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "input-error" : ""}
                disabled={bloqueado}
              />
              {errors.password && (
                <span className="modern-error-message">{errors.password}</span>
              )}
            </div>

            <div className="remember-me-container">
              <label className="remember-me-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="checkmark"></span>
                Recordar mi correo
              </label>
            </div>

            <div className="modern-login-actions">
              <button
                type="submit"
                className="modern-btn-primary"
                disabled={loading || bloqueado}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span> Iniciando sesión...
                  </>
                ) : bloqueado ? (
                  `Bloqueado (${tiempoRestante}s)`
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
            <Link to="/recuperar-password" className="forgot-link">
              ¿Olvidó su contraseña?
            </Link>
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
