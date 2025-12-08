import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVoteYea,
  faUsers,
  faChartLine,
  faLightbulb,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const Principal = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="principal-page">
      {/* Hero Section */}
      <section className="principal-hero">
        <div className="principal-hero-content">
          <h1 className="principal-title">🏛️ MANTA</h1>
          <h2 className="principal-subtitle">
            Portal de Participación Ciudadana
          </h2>
          <p className="principal-description">
            Transparencia, democracia participativa y empoderamiento ciudadano
            en el municipio de Manta. Tu voz importa.
          </p>
          <button
            className="principal-btn-login"
            onClick={handleLoginClick}
            aria-label="Acceder al portal"
          >
            Acceder al Portal
            <FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: "0.5rem" }} />
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="principal-features">
        <div className="principal-features-container">
          <h2 className="principal-section-title">¿Por qué participar?</h2>

          <div className="principal-features-grid">
            {/* Feature 1 */}
            <div className="principal-feature-card">
              <div className="principal-feature-icon participacion">
                <FontAwesomeIcon icon={faVoteYea} />
              </div>
              <h3>Vota en Decisiones</h3>
              <p>
                Tu voto cuenta. Participa en encuestas y votaciones sobre temas
                importantes del municipio.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="principal-feature-card">
              <div className="principal-feature-icon mejora">
                <FontAwesomeIcon icon={faLightbulb} />
              </div>
              <h3>Propuestas de Mejora</h3>
              <p>
                Comparte tus ideas para mejorar Manta. Todos los ciudadanos
                pueden crear y apoyar propuestas.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="principal-feature-card">
              <div className="principal-feature-icon transparencia">
                <FontAwesomeIcon icon={faChartLine} />
              </div>
              <h3>Transparencia Total</h3>
              <p>
                Acceso a información municipal, reportes ciudadanos y
                estadísticas en tiempo real.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="principal-feature-card">
              <div className="principal-feature-icon comunidad">
                <FontAwesomeIcon icon={faUsers} />
              </div>
              <h3>Comunidad Activa</h3>
              <p>
                Únete a miles de ciudadanos comprometidos con el desarrollo y
                bienestar de Manta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="principal-stats">
        <div className="principal-stats-container">
          <div className="principal-stat">
            <h4 className="principal-stat-value">12,450</h4>
            <p className="principal-stat-label">Ciudadanos Participando</p>
          </div>
          <div className="principal-stat">
            <h4 className="principal-stat-value">387</h4>
            <p className="principal-stat-label">Propuestas Activas</p>
          </div>
          <div className="principal-stat">
            <h4 className="principal-stat-value">95%</h4>
            <p className="principal-stat-label">Satisfacción</p>
          </div>
          <div className="principal-stat">
            <h4 className="principal-stat-value">24/7</h4>
            <p className="principal-stat-label">Disponibilidad</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="principal-cta">
        <div className="principal-cta-content">
          <h2>¿Listo para hacer la diferencia?</h2>
          <p>
            Accede al portal y comienza a participar en las decisiones que
            moldean el futuro de Manta.
          </p>
          <button
            className="principal-btn-login-large"
            onClick={handleLoginClick}
          >
            Ingresar al Portal
            <FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: "0.6rem" }} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="principal-footer">
        <div className="principal-footer-content">
          <p>&copy; 2025 Municipio de Manta. Todos los derechos reservados.</p>
          <p>Portal de Participación Ciudadana | Transparencia y Democracia</p>
        </div>
      </footer>
    </div>
  );
};

export default Principal;
