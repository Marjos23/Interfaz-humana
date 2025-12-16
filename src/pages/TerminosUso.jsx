import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faShieldAlt,
  faUserShield,
  faDatabase,
  faGavel,
} from "@fortawesome/free-solid-svg-icons";
import "../styles.css";

const TerminosUso = () => {
  useEffect(() => {
    document.body.classList.add("auth-no-scroll");
    window.scrollTo(0, 0);
    return () => {
      document.body.classList.remove("auth-no-scroll");
    };
  }, []);

  return (
    <div className="terminos-page">
      <div className="terminos-container">
        <div className="terminos-header">
          <Link to="/register" className="back-to-login">
            <FontAwesomeIcon icon={faArrowLeft} /> Volver al Registro
          </Link>
          <h1>📜 Términos y Condiciones de Uso</h1>
          <p className="terminos-subtitle">
            Portal de Participación Ciudadana - Municipio de Manta
          </p>
          <p className="terminos-fecha">Última actualización: Diciembre 2025</p>
        </div>

        <div className="terminos-content">
          <section className="terminos-section">
            <h2>
              <FontAwesomeIcon icon={faGavel} /> 1. Aceptación de los Términos
            </h2>
            <p>
              Al acceder y utilizar el Portal de Participación Ciudadana del
              Municipio de Manta, usted acepta cumplir con estos términos y
              condiciones de uso. Si no está de acuerdo con alguna parte de
              estos términos, no podrá acceder al servicio.
            </p>
          </section>

          <section className="terminos-section">
            <h2>
              <FontAwesomeIcon icon={faUserShield} /> 2. Registro y Cuenta de
              Usuario
            </h2>
            <ul>
              <li>
                Debe proporcionar información veraz y actualizada durante el
                registro.
              </li>
              <li>
                Es responsable de mantener la confidencialidad de su contraseña.
              </li>
              <li>
                Debe notificar inmediatamente cualquier uso no autorizado de su
                cuenta.
              </li>
              <li>Solo se permite una cuenta por cédula de identidad.</li>
              <li>
                El municipio se reserva el derecho de suspender cuentas que
                violen estos términos.
              </li>
            </ul>
          </section>

          <section className="terminos-section">
            <h2>
              <FontAwesomeIcon icon={faDatabase} /> 3. Privacidad y Protección
              de Datos
            </h2>
            <p>
              Sus datos personales serán tratados conforme a la Ley Orgánica de
              Protección de Datos Personales del Ecuador:
            </p>
            <ul>
              <li>
                Solo recopilamos datos necesarios para el funcionamiento del
                portal.
              </li>
              <li>
                Sus datos no serán compartidos con terceros sin su
                consentimiento.
              </li>
              <li>
                Tiene derecho a acceder, rectificar y eliminar sus datos
                personales.
              </li>
              <li>
                Implementamos medidas de seguridad para proteger su información.
              </li>
            </ul>
          </section>

          <section className="terminos-section">
            <h2>
              <FontAwesomeIcon icon={faShieldAlt} /> 4. Uso Aceptable
            </h2>
            <p>Al utilizar este portal, usted se compromete a:</p>
            <ul>
              <li>No publicar contenido ofensivo, difamatorio o ilegal.</li>
              <li>No intentar acceder a cuentas o datos de otros usuarios.</li>
              <li>No utilizar el sistema para actividades fraudulentas.</li>
              <li>
                Participar de manera respetuosa en propuestas y votaciones.
              </li>
              <li>Reportar problemas reales y verificables.</li>
            </ul>
          </section>

          <section className="terminos-section">
            <h2>5. Propuestas y Votaciones</h2>
            <ul>
              <li>Las propuestas ciudadanas están sujetas a moderación.</li>
              <li>
                El municipio no garantiza la implementación de propuestas
                aprobadas.
              </li>
              <li>Cada ciudadano tiene derecho a un voto por propuesta.</li>
              <li>
                Los resultados de votaciones son informativos y no vinculantes.
              </li>
            </ul>
          </section>

          <section className="terminos-section">
            <h2>6. Limitación de Responsabilidad</h2>
            <p>El Municipio de Manta no será responsable por:</p>
            <ul>
              <li>Interrupciones temporales del servicio por mantenimiento.</li>
              <li>Pérdida de datos debido a fallas técnicas imprevistas.</li>
              <li>Contenido publicado por los usuarios.</li>
              <li>
                Decisiones tomadas basándose en la información del portal.
              </li>
            </ul>
          </section>

          <section className="terminos-section">
            <h2>7. Modificaciones</h2>
            <p>
              El Municipio de Manta se reserva el derecho de modificar estos
              términos en cualquier momento. Los cambios serán notificados a
              través del portal y entrarán en vigencia inmediatamente después de
              su publicación.
            </p>
          </section>

          <section className="terminos-section">
            <h2>8. Contacto</h2>
            <p>Para consultas sobre estos términos, puede contactarnos en:</p>
            <ul>
              <li>📧 Email: participacion@manta.gob.ec</li>
              <li>📞 Teléfono: (05) 262-0200</li>
              <li>📍 Dirección: Av. 4 de Noviembre, Manta, Ecuador</li>
            </ul>
          </section>
        </div>

        <div className="terminos-footer">
          <p>© 2025 Municipio de Manta - Todos los derechos reservados</p>
          <Link to="/register" className="modern-btn-primary">
            Volver al Registro
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TerminosUso;
