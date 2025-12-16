import React, { useState } from "react";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPoll,
  faStar,
  faCheckCircle,
  faClipboardCheck,
  faHeart,
  faLightbulb,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import { notificacionesAPI } from "../services/api";

const Encuesta = () => {
  const [encuesta, setEncuesta] = useState({
    satisfaccion: "",
    facilidadUso: "",
    utilidadPropuestas: "",
    calidadInformacion: "",
    recomendaria: "",
    aspectoMejor: "",
    aspectoMejorar: "",
    comentarios: "",
  });

  const [enviado, setEnviado] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEncuesta({ ...encuesta, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que todos los campos requeridos estén completos
    if (
      !encuesta.satisfaccion ||
      !encuesta.facilidadUso ||
      !encuesta.utilidadPropuestas ||
      !encuesta.calidadInformacion ||
      !encuesta.recomendaria
    ) {
      Swal.fire({
        icon: "warning",
        title: "Campos Incompletos",
        text: "Por favor completa todas las calificaciones requeridas",
        confirmButtonColor: "#2c5282",
      });
      return;
    }

    try {
      // Guardar en localStorage (o podrías enviar a una API)
      const encuestas = JSON.parse(localStorage.getItem("encuestas")) || [];
      const nuevaEncuesta = {
        ...encuesta,
        id: Date.now(),
        fecha: new Date().toLocaleString(),
      };
      encuestas.push(nuevaEncuesta);
      localStorage.setItem("encuestas", JSON.stringify(encuestas));

      try {
        await notificacionesAPI.create({
          titulo: "Nueva encuesta completada",
          mensaje: `El ciudadano ${currentUser?.nombre || currentUser?.email || "Ciudadano"} envió feedback en la encuesta de satisfacción`,
          tipo: "encuesta",
          destinatario: "admin",
          ciudadanoId: currentUser?.id || currentUser?.email || null,
          ciudadanoNombre: currentUser?.nombre || currentUser?.email || null,
        });
        localStorage.setItem("notificationsUpdated", Date.now().toString());
      } catch (notifyError) {
        console.error("Error enviando notificación de encuesta:", notifyError);
      }

      setEnviado(true);

      Swal.fire({
        icon: "success",
        title: "¡Gracias por tu Opinión!",
        text: "Tu encuesta ha sido registrada exitosamente. Tu feedback nos ayuda a mejorar.",
        confirmButtonColor: "#2c5282",
      });

      // Reset form
      setEncuesta({
        satisfaccion: "",
        facilidadUso: "",
        utilidadPropuestas: "",
        calidadInformacion: "",
        recomendaria: "",
        aspectoMejor: "",
        aspectoMejorar: "",
        comentarios: "",
      });

      setTimeout(() => setEnviado(false), 3000);
    } catch (error) {
      console.error("Error guardando encuesta:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo guardar la encuesta. Intenta nuevamente.",
        confirmButtonColor: "#e53e3e",
      });
    }
  };

  const renderStarRating = (name, value) => {
    const stars = [1, 2, 3, 4, 5];
    return (
      <div className="star-rating">
        {stars.map((star) => (
          <label key={star} className={`star ${value >= star ? "active" : ""}`}>
            <input
              type="radio"
              name={name}
              value={star}
              checked={value == star}
              onChange={handleChange}
              style={{ display: "none" }}
            />
            <FontAwesomeIcon icon={faStar} />
          </label>
        ))}
      </div>
    );
  };

  return (
    <div className="encuesta-page-modern">
      {/* Hero Section con Imagen del Portal */}
      <div className="encuesta-hero">
        <div className="encuesta-hero-overlay">
          <div className="encuesta-hero-content">
            <div className="encuesta-hero-icon">
              <FontAwesomeIcon icon={faPoll} />
            </div>
            <div>
              <h1>Encuesta de Satisfacción</h1>
              <p>
                Tu opinión es fundamental para mejorar el Portal de Participación
                Ciudadana de Manta
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="encuesta-info-section">
        <div className="encuesta-info-grid">
          <div className="info-card">
            <div className="info-icon participacion">
              <FontAwesomeIcon icon={faHeart} />
            </div>
            <h3>Tu Voz Importa</h3>
            <p>
              Cada opinión nos ayuda a construir un mejor portal para todos los
              ciudadanos
            </p>
          </div>

          <div className="info-card">
            <div className="info-icon mejora">
              <FontAwesomeIcon icon={faLightbulb} />
            </div>
            <h3>Mejora Continua</h3>
            <p>
              Tus sugerencias se implementan para optimizar tu experiencia en el
              portal
            </p>
          </div>

          <div className="info-card">
            <div className="info-icon transparencia">
              <FontAwesomeIcon icon={faComments} />
            </div>
            <h3>Comunicación Directa</h3>
            <p>
              Valoramos tu feedback para fortalecer la participación ciudadana
            </p>
          </div>
        </div>
      </div>

      {/* Formulario de Encuesta */}
      <div className="encuesta-form-container">
        <div className="encuesta-form-card">
          <div className="form-header">
            <div className="form-header-icon">
              <FontAwesomeIcon icon={faClipboardCheck} />
            </div>
            <h2>Cuestionario de Evaluación</h2>
            <p className="form-subtitle">
              Por favor califica los siguientes aspectos del portal (1 estrella =
              Muy Insatisfecho, 5 estrellas = Muy Satisfecho)
            </p>
          </div>

          <form onSubmit={handleSubmit} className="encuesta-form">
            {/* Pregunta 1 */}
            <div className="encuesta-question">
              <label className="question-label">
                1. ¿Qué tan satisfecho estás con el Portal de Participación
                Ciudadana en general?
                <span className="required">*</span>
              </label>
              {renderStarRating("satisfaccion", encuesta.satisfaccion)}
            </div>

            {/* Pregunta 2 */}
            <div className="encuesta-question">
              <label className="question-label">
                2. ¿Qué tan fácil es navegar y usar el portal?
                <span className="required">*</span>
              </label>
              {renderStarRating("facilidadUso", encuesta.facilidadUso)}
            </div>

            {/* Pregunta 3 */}
            <div className="encuesta-question">
              <label className="question-label">
                3. ¿Qué tan útil consideras la función de Propuestas Ciudadanas?
                <span className="required">*</span>
              </label>
              {renderStarRating(
                "utilidadPropuestas",
                encuesta.utilidadPropuestas
              )}
            </div>

            {/* Pregunta 4 */}
            <div className="encuesta-question">
              <label className="question-label">
                4. ¿Cómo calificarías la calidad de la información presentada?
                <span className="required">*</span>
              </label>
              {renderStarRating(
                "calidadInformacion",
                encuesta.calidadInformacion
              )}
            </div>

            {/* Pregunta 5 */}
            <div className="encuesta-question">
              <label className="question-label">
                5. ¿Recomendarías este portal a otros ciudadanos?
                <span className="required">*</span>
              </label>
              <div className="radio-options">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="recomendaria"
                    value="si"
                    checked={encuesta.recomendaria === "si"}
                    onChange={handleChange}
                  />
                  <span className="radio-custom"></span>
                  <span className="radio-label">
                    Sí, definitivamente lo recomendaría
                  </span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="recomendaria"
                    value="tal-vez"
                    checked={encuesta.recomendaria === "tal-vez"}
                    onChange={handleChange}
                  />
                  <span className="radio-custom"></span>
                  <span className="radio-label">Tal vez</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="recomendaria"
                    value="no"
                    checked={encuesta.recomendaria === "no"}
                    onChange={handleChange}
                  />
                  <span className="radio-custom"></span>
                  <span className="radio-label">No lo recomendaría</span>
                </label>
              </div>
            </div>

            {/* Pregunta 6 - Texto */}
            <div className="encuesta-question">
              <label className="question-label">
                6. ¿Qué es lo que más te gusta del portal?
              </label>
              <textarea
                name="aspectoMejor"
                value={encuesta.aspectoMejor}
                onChange={handleChange}
                placeholder="Ej: La facilidad para crear propuestas, el diseño moderno, la transparencia..."
                rows="3"
              />
            </div>

            {/* Pregunta 7 - Texto */}
            <div className="encuesta-question">
              <label className="question-label">
                7. ¿Qué aspecto crees que deberíamos mejorar?
              </label>
              <textarea
                name="aspectoMejorar"
                value={encuesta.aspectoMejorar}
                onChange={handleChange}
                placeholder="Ej: Más funcionalidades, mejor velocidad, más información..."
                rows="3"
              />
            </div>

            {/* Pregunta 8 - Comentarios */}
            <div className="encuesta-question">
              <label className="question-label">
                8. Comentarios adicionales (opcional)
              </label>
              <textarea
                name="comentarios"
                value={encuesta.comentarios}
                onChange={handleChange}
                placeholder="Comparte cualquier sugerencia, idea o comentario adicional..."
                rows="4"
              />
            </div>

            {/* Botón de Envío */}
            <div className="form-actions">
              <button type="submit" className="btn-rustico-primary btn-rustico-icon">
                <FontAwesomeIcon icon={faCheckCircle} />
                Enviar Encuesta
              </button>
            </div>

            {enviado && (
              <div className="success-message">
                <FontAwesomeIcon icon={faCheckCircle} />
                ¡Encuesta enviada exitosamente! Gracias por tu participación.
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Estadísticas Generales (opcional) */}
      <div className="encuesta-stats-section">
        <div className="stats-container">
          <h3>
            <FontAwesomeIcon icon={faPoll} /> Impacto de tu Participación
          </h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">
                {JSON.parse(localStorage.getItem("encuestas") || "[]").length}
              </div>
              <div className="stat-label">Encuestas Recibidas</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Analizadas</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24h</div>
              <div className="stat-label">Tiempo de Respuesta</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Encuesta;
