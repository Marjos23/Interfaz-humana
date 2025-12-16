import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faArrowLeft,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import "../styles.css";

const RecuperarPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.body.classList.add("auth-no-scroll");
    return () => {
      document.body.classList.remove("auth-no-scroll");
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor ingrese un correo electrónico válido");
      setLoading(false);
      return;
    }

    // Simular envío de correo (sin lógica real de backend)
    setTimeout(() => {
      setLoading(false);
      setEnviado(true);
      Swal.fire({
        title: "¡Correo Enviado!",
        text: "Si el correo existe en nuestro sistema, recibirás instrucciones para restablecer tu contraseña.",
        icon: "success",
        confirmButtonText: "Entendido",
        confirmButtonColor: "#3b82f6",
      });
    }, 1500);
  };

  return (
    <div className="modern-login-page">
      <div className="modern-login-content">
        <div className="modern-login-header">
          <h1>🏛️ MANTA</h1>
          <p>Portal de Participación Ciudadana</p>
        </div>

        <div className="modern-login-card">
          <div className="modern-card-header">
            <span className="access-badge">RECUPERAR ACCESO</span>
            <p className="card-subtitle">
              {enviado
                ? "Revisa tu bandeja de entrada"
                : "Ingresa tu correo para recuperar tu contraseña"}
            </p>
          </div>

          {!enviado ? (
            <form onSubmit={handleSubmit} className="modern-login-form">
              <div className="modern-form-group">
                <label htmlFor="email">
                  <FontAwesomeIcon icon={faEnvelope} /> Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="tu.correo@ejemplo.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={error ? "input-error" : ""}
                />
                {error && <span className="modern-error-message">{error}</span>}
              </div>

              <div className="recuperar-info">
                <p>
                  📧 Te enviaremos un enlace para restablecer tu contraseña.
                </p>
              </div>

              <div className="modern-login-actions">
                <button
                  type="submit"
                  className="modern-btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner"></span> Enviando...
                    </>
                  ) : (
                    "Enviar Instrucciones"
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="recuperar-exito">
              <div className="exito-icon">
                <FontAwesomeIcon icon={faCheckCircle} />
              </div>
              <h3>¡Revisa tu correo!</h3>
              <p>
                Hemos enviado instrucciones a <strong>{email}</strong> para
                restablecer tu contraseña.
              </p>
              <p className="exito-nota">
                Si no encuentras el correo, revisa tu carpeta de spam.
              </p>
            </div>
          )}

          <div className="modern-form-links">
            <Link to="/" className="back-to-login">
              <FontAwesomeIcon icon={faArrowLeft} /> Volver al inicio de sesión
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

export default RecuperarPassword;
