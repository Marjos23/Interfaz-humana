import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { usuariosAPI } from "../services/api";
import Swal from "sweetalert2";
import {
  validarCedulaEcuatoriana,
  validarEmail,
  validarTelefono,
  formatearCedula,
  formatearTelefono,
} from "../utils/validations";
import MapSelector from "../components/MapSelector";
import "../styles.css";

const Registro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    cedula: "",
    nombre: "",
    apellidos: "",
    fechaNacimiento: "",
    email: "",
    telefono: "",
    ubicacion: null,
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [aceptaTerminos, setAceptaTerminos] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Limpiar errores previos
    setErrors({});
    const newErrors = {};

    // Validar cédula
    const resultadoCedula = validarCedulaEcuatoriana(formData.cedula);
    if (!resultadoCedula.valido) {
      newErrors.cedula = resultadoCedula.mensaje;
    }

    // Validar email
    if (!validarEmail(formData.email)) {
      newErrors.email = "Email inválido";
    }

    // Validar teléfono si se proporciona
    if (formData.telefono && !validarTelefono(formData.telefono)) {
      newErrors.telefono = "Teléfono debe ser: 09XXXXXXXX o 0XXXXXXXX";
    }

    // Validar contraseñas
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Mínimo 6 caracteres";
    }

    // Validar términos y condiciones
    if (!aceptaTerminos) {
      newErrors.terminos = "Debes aceptar los términos y condiciones";
    }

    // Si hay errores, mostrarlos
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      Swal.fire({
        title: "Errores de Validación",
        html: Object.values(newErrors)
          .map((err) => `• ${err}`)
          .join("<br>"),
        icon: "error",
        confirmButtonText: "Corregir",
        confirmButtonColor: "#e53e3e",
      });
      return;
    }

    try {
      setLoading(true);
      const nuevoCiudadano = {
        cedula: formData.cedula,
        nombre: `${formData.nombre} ${formData.apellidos}`,
        email: formData.email,
        telefono: formData.telefono || "",
        direccion: formData.ubicacion?.direccion || "",
        codigoPostal: formData.ubicacion?.codigoPostal || "",
        latitud: formData.ubicacion?.lat || null,
        longitud: formData.ubicacion?.lng || null,
        fechaNacimiento: formData.fechaNacimiento || "",
        password: formData.password,
        rol: "ciudadano",
        fechaRegistro: new Date().toLocaleDateString("es-EC"),
      };

      await usuariosAPI.create(nuevoCiudadano);

      Swal.fire({
        title: "¡Registro Exitoso!",
        text: "Tu cuenta ha sido creada. Ya puedes iniciar sesión.",
        icon: "success",
        confirmButtonText: "Ir al Login",
        confirmButtonColor: "#2c5282",
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      console.error("Error en registro:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo completar el registro. La cédula o email ya existe.",
        icon: "error",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#e53e3e",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    let processedValue = value;

    // Formatear según el campo
    if (name === "cedula") {
      processedValue = formatearCedula(value);
    } else if (name === "telefono") {
      processedValue = formatearTelefono(value);
    }

    setFormData({
      ...formData,
      [name]: processedValue,
    });

    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  return (
    <div className="modern-registro-page">
      <div className="registro-background"></div>
      <div className="registro-overlay"></div>
      <div className="registro-overlay"></div>

      {/* Panel izquierdo con información */}
      <div className="registro-info-panel">
        <div className="registro-info-content">
          <div className="registro-info-header">
            <div className="registro-logo-badge">
              <div className="logo-circle">MC</div>
            </div>
            <h1>PORTAL CIUDADANO</h1>
            <h2>MANTA</h2>
            <p className="registro-subtitle">Únete a nuestra comunidad</p>
          </div>

          <div className="registro-benefits">
            <div className="benefit-item">
              <div className="benefit-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </div>
              <div className="benefit-text">
                <h4>Propuestas Ciudadanas</h4>
                <p>Presenta tus ideas para mejorar Manta</p>
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </div>
              <div className="benefit-text">
                <h4>Votaciones Activas</h4>
                <p>Participa en las decisiones importantes</p>
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </div>
              <div className="benefit-text">
                <h4>Reportes en Tiempo Real</h4>
                <p>Informa problemas y da seguimiento</p>
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </div>
              <div className="benefit-text">
                <h4>Transparencia Total</h4>
                <p>Accede a información pública y estadísticas</p>
              </div>
            </div>
          </div>

          <div className="registro-footer-info">
            <p>🔒 Tus datos están protegidos y seguros</p>
          </div>
        </div>
      </div>

      {/* Panel derecho con formulario */}
      <div className="registro-form-panel">
        <div className="registro-form-container">
          <div className="registro-form-header">
            <h2>Crear Cuenta Nueva</h2>
            <p>Completa el formulario para unirte a la comunidad</p>
          </div>

          <form onSubmit={handleSubmit} className="modern-registro-form">
            {/* Cédula */}
            <div className="modern-form-group">
              <label htmlFor="cedula">
                Cédula de Identidad <span className="required">*</span>
              </label>
              <input
                type="text"
                id="cedula"
                name="cedula"
                required
                placeholder="Ej: 1312345678"
                value={formData.cedula}
                onChange={handleChange}
                className={errors.cedula ? "input-error" : ""}
                maxLength="10"
                autoComplete="off"
              />
              {errors.cedula && (
                <span className="modern-error-message">{errors.cedula}</span>
              )}
            </div>

            {/* Nombres y Apellidos en fila */}
            <div className="registro-form-row">
              <div className="modern-form-group">
                <label htmlFor="nombre">
                  Nombres <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  required
                  placeholder="Ej: Juan Carlos"
                  value={formData.nombre}
                  onChange={handleChange}
                />
              </div>
              <div className="modern-form-group">
                <label htmlFor="apellidos">
                  Apellidos <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="apellidos"
                  name="apellidos"
                  required
                  placeholder="Ej: García López"
                  value={formData.apellidos}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email */}
            <div className="modern-form-group">
              <label htmlFor="email">
                Correo Electrónico <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="tu.correo@ejemplo.com"
                required
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "input-error" : ""}
                autoComplete="email"
              />
              {errors.email && (
                <span className="modern-error-message">{errors.email}</span>
              )}
            </div>

            {/* Teléfono y Fecha */}
            <div className="registro-form-row">
              <div className="modern-form-group">
                <label htmlFor="telefono">Teléfono</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  placeholder="0987654321"
                  value={formData.telefono}
                  onChange={handleChange}
                  className={errors.telefono ? "input-error" : ""}
                  maxLength="10"
                />
                {errors.telefono && (
                  <span className="modern-error-message">
                    {errors.telefono}
                  </span>
                )}
              </div>
              <div className="modern-form-group">
                <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
                <input
                  type="date"
                  id="fechaNacimiento"
                  name="fechaNacimiento"
                  value={formData.fechaNacimiento}
                  onChange={handleChange}
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>

            {/* Ubicación con Mapa */}
            <div className="modern-form-group">
              <label htmlFor="ubicacion">📍 Ubicación en Manta</label>
              <MapSelector
                value={formData.ubicacion}
                onChange={(ubicacion) =>
                  setFormData({ ...formData, ubicacion })
                }
                disabled={loading}
              />
            </div>

            {/* Contraseñas */}
            <div className="registro-form-row">
              <div className="modern-form-group">
                <label htmlFor="password">
                  Contraseña <span className="required">*</span>
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
                  minLength="6"
                />
                {errors.password && (
                  <span className="modern-error-message">
                    {errors.password}
                  </span>
                )}
              </div>
              <div className="modern-form-group">
                <label htmlFor="confirmPassword">
                  Confirmar <span className="required">*</span>
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="••••••••"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? "input-error" : ""}
                />
                {errors.confirmPassword && (
                  <span className="modern-error-message">
                    {errors.confirmPassword}
                  </span>
                )}
              </div>
            </div>

            {/* Términos y Condiciones */}
            <div className="terminos-checkbox-container">
              <label
                className={`terminos-checkbox-label ${
                  errors.terminos ? "terminos-error" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={aceptaTerminos}
                  onChange={(e) => {
                    setAceptaTerminos(e.target.checked);
                    if (errors.terminos) {
                      setErrors({ ...errors, terminos: null });
                    }
                  }}
                  className="terminos-checkbox-input"
                />
                <span className="terminos-checkbox-custom"></span>
                <span className="terminos-checkbox-text">
                  He leído y acepto los{" "}
                  <Link
                    to="/terminos"
                    target="_blank"
                    className="terminos-link"
                  >
                    Términos y Condiciones de Uso
                  </Link>
                </span>
              </label>
              {errors.terminos && (
                <span className="modern-error-message terminos-error-msg">
                  {errors.terminos}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="modern-btn-primary registro-submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span> Creando cuenta...
                </>
              ) : (
                "Crear Cuenta Ahora"
              )}
            </button>
          </form>

          <div className="modern-form-links">
            <div className="divider">
              <span>¿Ya tienes una cuenta?</span>
            </div>
            <Link to="/" className="modern-register-link login-redirect">
              Iniciar Sesión
            </Link>
          </div>

          <div className="login-footer">
            <p>© 2025 Municipio de Manta - Todos los derechos reservados</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;
