import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { propuestasAPI } from "../services/api";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles.css";
import {
  faArrowLeft,
  faLightbulb,
  faThumbsUp,
  faThumbsDown,
  faComment,
  faFlag,
  faCheckCircle,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

const DetallePropuesta = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [propuesta, setPropuesta] = useState(null);
  const [loading, setLoading] = useState(false);
  const [comentarioInput, setComentarioInput] = useState("");
  const [votosUsuario, setVotosUsuario] = useState({});
  const [comentariosOrdenados, setComentariosOrdenados] = useState([]);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    cargarPropuesta();
    loadVotosUsuario();
  }, [id]);

  useEffect(() => {
    if (propuesta?.comments) {
      const ordenados = [...propuesta.comments].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setComentariosOrdenados(ordenados);
    }
  }, [propuesta]);

  const cargarPropuesta = async () => {
    try {
      setLoading(true);
      const data = await propuestasAPI.getAll();
      const prop = data.find((p) => p.id === id);
      if (prop) {
        setPropuesta(prop);
      } else {
        Swal.fire("Error", "Propuesta no encontrada", "error");
        navigate("/propuestas");
      }
    } catch (error) {
      console.error("Error cargando propuesta:", error);
      Swal.fire("Error", "No se pudo cargar la propuesta", "error");
    } finally {
      setLoading(false);
    }
  };

  const loadVotosUsuario = () => {
    const votos =
      JSON.parse(
        localStorage.getItem(
          `votos_propuestas_${currentUser?.id || currentUser?.email}`
        )
      ) || {};
    setVotosUsuario(votos);
  };

  const vote = async (type) => {
    if (votosUsuario[id]) {
      Swal.fire({
        icon: "info",
        title: "Ya has votado",
        text: "Solo puedes votar una vez por propuesta",
        confirmButtonColor: "#2c5282",
      });
      return;
    }

    try {
      const nuevoVoto = type === "yes" ? 1 : -1;
      await propuestasAPI.vote(id, nuevoVoto);

      const nuevoVotos = { ...votosUsuario };
      nuevoVotos[id] = type;
      localStorage.setItem(
        `votos_propuestas_${currentUser?.id || currentUser?.email}`,
        JSON.stringify(nuevoVotos)
      );
      setVotosUsuario(nuevoVotos);

      Swal.fire({
        icon: "success",
        title: `Votaste ${type === "yes" ? "a favor" : "en contra"}`,
        timer: 1500,
        showConfirmButton: false,
      });

      cargarPropuesta();
    } catch (error) {
      console.error("Error votando:", error);
      Swal.fire("Error", "No se pudo registrar tu voto", "error");
    }
  };

  const agregarComentario = async () => {
    if (!comentarioInput.trim()) {
      Swal.fire("Error", "El comentario no puede estar vacío", "warning");
      return;
    }

    try {
      await propuestasAPI.addComment(id, comentarioInput);

      Swal.fire({
        icon: "success",
        title: "Comentario agregado",
        timer: 1500,
        showConfirmButton: false,
      });

      setComentarioInput("");
      cargarPropuesta();
    } catch (error) {
      console.error("Error agregando comentario:", error);
      Swal.fire("Error", "No se pudo agregar el comentario", "error");
    }
  };

  const reportarComentario = async (comentarioIndex) => {
    const confirm = await Swal.fire({
      title: "¿Reportar comentario?",
      text: "Este comentario será revisado por los moderadores",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, reportar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#ef4444",
    });

    if (!confirm.isConfirmed) return;

    try {
      if (!propuesta.comments[comentarioIndex].reportado) {
        propuesta.comments[comentarioIndex].reportado = true;
        propuesta.comments[comentarioIndex].reportadoEn =
          new Date().toLocaleString("es-EC");

        await propuestasAPI.update(id, propuesta);

        Swal.fire({
          icon: "success",
          title: "Comentario reportado",
          text: "Los moderadores lo revisarán pronto",
          timer: 1500,
          showConfirmButton: false,
        });

        cargarPropuesta();
      }
    } catch (error) {
      console.error("Error reportando comentario:", error);
      Swal.fire("Error", "No se pudo reportar el comentario", "error");
    }
  };

  if (loading) {
    return (
      <div className="detalle-propuesta-container">
        <div className="loading-container">
          <p>Cargando propuesta...</p>
        </div>
      </div>
    );
  }

  if (!propuesta) {
    return (
      <div className="detalle-propuesta-container">
        <div className="empty-state">
          <p>Propuesta no encontrada</p>
        </div>
      </div>
    );
  }

  return (
    <div className="detalle-propuesta-container">
      {/* Header con botón volver */}
      <div className="detalle-header">
        <button className="btn-volver" onClick={() => navigate("/propuestas")}>
          <FontAwesomeIcon icon={faArrowLeft} /> Volver a Propuestas
        </button>
      </div>

      {/* Propuesta Principal */}
      <div className="propuesta-detalle-card">
        <div className="propuesta-detalle-header">
          <div className="propuesta-detalle-titulo">
            <FontAwesomeIcon icon={faLightbulb} />
            <h1>{propuesta.titulo}</h1>
          </div>
          <span className={`categoria-badge ${propuesta.categoria}`}>
            {propuesta.categoria}
          </span>
        </div>

        <p className="propuesta-detalle-descripcion">{propuesta.descripcion}</p>

        {/* Información */}
        <div className="propuesta-detalle-info">
          <div className="info-item">
            <FontAwesomeIcon icon={faClock} />
            <span>{propuesta.createdAt}</span>
          </div>
          {propuesta.approved && (
            <div className="info-item">
              <FontAwesomeIcon icon={faCheckCircle} />
              <span>Aprobada</span>
            </div>
          )}
        </div>

        {/* Votación */}
        <div className="propuesta-detalle-votos">
          <button
            className={`btn-voto btn-voto-si ${
              votosUsuario[id] === "yes" ? "votado" : ""
            }`}
            onClick={() => vote("yes")}
            disabled={!!votosUsuario[id]}
          >
            <FontAwesomeIcon icon={faThumbsUp} />
            <span>A Favor ({propuesta.votesYes})</span>
          </button>

          <div className="votos-barra">
            <div className="votos-progreso">
              <div
                className="votos-si"
                style={{
                  width: `${
                    (propuesta.votesYes /
                      (propuesta.votesYes + propuesta.votesNo)) *
                    100
                  }%`,
                }}
              />
            </div>
            <span className="votos-porcentaje">
              {propuesta.votesYes + propuesta.votesNo} votos
            </span>
          </div>

          <button
            className={`btn-voto btn-voto-no ${
              votosUsuario[id] === "no" ? "votado" : ""
            }`}
            onClick={() => vote("no")}
            disabled={!!votosUsuario[id]}
          >
            <FontAwesomeIcon icon={faThumbsDown} />
            <span>En Contra ({propuesta.votesNo})</span>
          </button>
        </div>
      </div>

      {/* Foro de Discusión */}
      <div className="foro-discusion-container">
        <div className="foro-header">
          <FontAwesomeIcon icon={faComment} />
          <h2>Foro de Discusión</h2>
          <span className="comentarios-contador">
            {comentariosOrdenados.length} comentarios
          </span>
        </div>

        {/* Formulario de Comentario */}
        <div className="foro-form-section">
          <textarea
            className="foro-textarea"
            placeholder="Comparte tu opinión... (máximo 500 caracteres)"
            value={comentarioInput}
            onChange={(e) => setComentarioInput(e.target.value.slice(0, 500))}
            maxLength="500"
          />
          <div className="foro-form-footer">
            <span className="char-counter">{comentarioInput.length}/500</span>
            <button
              className="btn-enviar-comentario"
              onClick={agregarComentario}
              disabled={!comentarioInput.trim()}
            >
              Enviar Comentario
            </button>
          </div>
        </div>

        {/* Lista de Comentarios */}
        <div className="foro-comentarios-list">
          {comentariosOrdenados.length > 0 ? (
            comentariosOrdenados.map((comentario, idx) => (
              <div
                key={idx}
                className={`foro-comentario-item ${
                  comentario.reportado ? "comentario-reportado" : ""
                } ${comentario.aprobado ? "comentario-aprobado" : ""}`}
              >
                <div className="comentario-avatar">
                  {comentario.author?.charAt(0).toUpperCase() || "U"}
                </div>

                <div className="comentario-contenido">
                  <div className="comentario-header">
                    <span className="comentario-autor">
                      {comentario.author || "Usuario Anónimo"}
                    </span>
                    <span className="comentario-fecha">{comentario.date}</span>
                  </div>

                  <p className="comentario-texto">{comentario.text}</p>

                  <div className="comentario-acciones">
                    {comentario.reportado ? (
                      <span className="badge-reportado">
                        🚩 Reportado (En revisión)
                      </span>
                    ) : (
                      <button
                        className="btn-reportar-comentario"
                        onClick={() => reportarComentario(idx)}
                        title="Reportar comentario inapropiado"
                      >
                        <FontAwesomeIcon icon={faFlag} /> Reportar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="sin-comentarios">
              <FontAwesomeIcon icon={faComment} />
              <p>Sin comentarios aún</p>
              <small>Sé el primero en comentar</small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetallePropuesta;
