import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faEye,
  faTrash,
  faFlag,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { propuestasAPI } from "../services/api";
import "../styles.css";

const ModerarComentarios = () => {
  const [propuestas, setPropuestas] = useState([]);
  const [comentariosFiltrados, setComentariosFiltrados] = useState([]);
  const [filtro, setFiltro] = useState("reportados"); // "reportados", "aprobados", "todos"
  const [loading, setLoading] = useState(false);
  const [expandedPropuestas, setExpandedPropuestas] = useState(new Set());

  useEffect(() => {
    cargarDatos();
  }, []);

  useEffect(() => {
    filtrarComentarios();
  }, [propuestas, filtro]);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const data = await propuestasAPI.getAll();
      setPropuestas(data);
    } catch (error) {
      console.error("Error cargando propuestas:", error);
      Swal.fire("Error", "No se pudieron cargar las propuestas", "error");
    } finally {
      setLoading(false);
    }
  };

  const filtrarComentarios = () => {
    const comentarios = [];

    propuestas.forEach((propuesta) => {
      if (propuesta.comments && propuesta.comments.length > 0) {
        propuesta.comments.forEach((comentario) => {
          if (filtro === "reportados" && comentario.reportado) {
            comentarios.push({
              ...comentario,
              propuestaId: propuesta.id,
              propuestaTitulo: propuesta.titulo,
            });
          } else if (
            filtro === "aprobados" &&
            !comentario.reportado &&
            comentario.aprobado
          ) {
            comentarios.push({
              ...comentario,
              propuestaId: propuesta.id,
              propuestaTitulo: propuesta.titulo,
            });
          } else if (filtro === "todos") {
            comentarios.push({
              ...comentario,
              propuestaId: propuesta.id,
              propuestaTitulo: propuesta.titulo,
            });
          }
        });
      }
    });

    setComentariosFiltrados(comentarios);
  };

  const obtenerContadores = () => {
    let reportados = 0;
    let aprobados = 0;
    let total = 0;

    propuestas.forEach((propuesta) => {
      if (propuesta.comments && propuesta.comments.length > 0) {
        propuesta.comments.forEach((comentario) => {
          total++;
          if (comentario.reportado) {
            reportados++;
          } else if (comentario.aprobado) {
            aprobados++;
          }
        });
      }
    });

    return { reportados, aprobados, total };
  };

  const toggleExpanded = (propuestaId) => {
    const newExpanded = new Set(expandedPropuestas);
    if (newExpanded.has(propuestaId)) {
      newExpanded.delete(propuestaId);
    } else {
      newExpanded.add(propuestaId);
    }
    setExpandedPropuestas(newExpanded);
  };

  const aprobarComentario = async (propuestaId, comentarioId) => {
    const confirm = await Swal.fire({
      title: "¿Aprobar comentario?",
      text: "El comentario será visible para todos los usuarios",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, aprobar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#10b981",
    });

    if (!confirm.isConfirmed) return;

    try {
      // Actualizar en la BD
      const propuesta = propuestas.find((p) => p.id === propuestaId);
      const comentario = propuesta.comments.find((c) => c.id === comentarioId);

      if (comentario) {
        comentario.aprobado = true;
        comentario.reportado = false;
        comentario.moderadoEn = new Date().toLocaleString("es-EC");

        await propuestasAPI.update(propuestaId, propuesta);

        Swal.fire({
          icon: "success",
          title: "Comentario aprobado",
          timer: 1500,
          showConfirmButton: false,
        });

        cargarDatos();
      }
    } catch (error) {
      console.error("Error aprobando comentario:", error);
      Swal.fire("Error", "No se pudo aprobar el comentario", "error");
    }
  };

  const eliminarComentario = async (propuestaId, comentarioId) => {
    const confirm = await Swal.fire({
      title: "¿Eliminar comentario?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#ef4444",
    });

    if (!confirm.isConfirmed) return;

    try {
      const propuesta = propuestas.find((p) => p.id === propuestaId);
      propuesta.comments = propuesta.comments.filter(
        (c) => c.id !== comentarioId
      );

      await propuestasAPI.update(propuestaId, propuesta);

      Swal.fire({
        icon: "success",
        title: "Comentario eliminado",
        timer: 1500,
        showConfirmButton: false,
      });

      cargarDatos();
    } catch (error) {
      console.error("Error eliminando comentario:", error);
      Swal.fire("Error", "No se pudo eliminar el comentario", "error");
    }
  };

  const marcarComoReportado = async (propuestaId, comentarioId) => {
    try {
      const propuesta = propuestas.find((p) => p.id === propuestaId);
      const comentario = propuesta.comments.find((c) => c.id === comentarioId);

      if (comentario) {
        comentario.reportado = true;
        comentario.reportadoEn = new Date().toLocaleString("es-EC");

        await propuestasAPI.update(propuestaId, propuesta);

        Swal.fire({
          icon: "success",
          title: "Comentario marcado como reportado",
          timer: 1500,
          showConfirmButton: false,
        });

        cargarDatos();
      }
    } catch (error) {
      console.error("Error reportando comentario:", error);
      Swal.fire("Error", "No se pudo reportar el comentario", "error");
    }
  };

  const getEstadoBadge = (comentario) => {
    if (comentario.reportado) {
      return <span className="badge-danger">Reportado</span>;
    } else if (comentario.aprobado) {
      return <span className="badge-success">Aprobado</span>;
    } else {
      return <span className="badge-warning">Pendiente</span>;
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <p>Cargando comentarios...</p>
      </div>
    );
  }

  return (
    <div className="moderar-comentarios-container">
      <div className="moderar-header">
        <h1>
          <FontAwesomeIcon icon={faComments} /> Moderación de Comentarios
        </h1>
        <p>Revisa, aprueba o elimina comentarios en los foros de discusión</p>
      </div>

      {/* Filtros */}
      <div className="filtros-moderar">
        <button
          className={`btn-filtro ${filtro === "reportados" ? "active" : ""}`}
          onClick={() => setFiltro("reportados")}
        >
          <FontAwesomeIcon icon={faFlag} /> Reportados
          <span className="contador">{obtenerContadores().reportados}</span>
        </button>
        <button
          className={`btn-filtro ${filtro === "aprobados" ? "active" : ""}`}
          onClick={() => setFiltro("aprobados")}
        >
          <FontAwesomeIcon icon={faCheckCircle} /> Aprobados
          <span className="contador">{obtenerContadores().aprobados}</span>
        </button>
        <button
          className={`btn-filtro ${filtro === "todos" ? "active" : ""}`}
          onClick={() => setFiltro("todos")}
        >
          <FontAwesomeIcon icon={faEye} /> Todos
          <span className="contador">{obtenerContadores().total}</span>
        </button>
      </div>

      {/* Lista de Comentarios */}
      <div className="comentarios-list">
        {comentariosFiltrados.length === 0 ? (
          <div className="empty-state">
            <FontAwesomeIcon icon={faComments} />
            <p>
              No hay comentarios{" "}
              {filtro === "reportados"
                ? "reportados"
                : filtro === "aprobados"
                ? "aprobados"
                : ""}
            </p>
          </div>
        ) : (
          comentariosFiltrados.map((comentario) => (
            <div
              key={`${comentario.propuestaId}-${comentario.id}`}
              className={`comentario-card ${
                comentario.reportado ? "comentario-reportado" : ""
              } ${comentario.aprobado ? "comentario-aprobado" : ""}`}
            >
              <div className="comentario-header">
                <div className="comentario-info">
                  <h3>{comentario.author || "Usuario Anónimo"}</h3>
                  <p className="comentario-propuesta">
                    En: <strong>{comentario.propuestaTitulo}</strong>
                  </p>
                  <p className="comentario-fecha">
                    {comentario.date ||
                      comentario.fecha ||
                      "Fecha no especificada"}
                  </p>
                </div>
                <div className="comentario-estado">
                  {getEstadoBadge(comentario)}
                </div>
              </div>

              <div className="comentario-contenido">
                <p>
                  {comentario.text || comentario.contenido || "Sin contenido"}
                </p>
              </div>

              <div className="comentario-acciones">
                {comentario.reportado ? (
                  <>
                    <button
                      className="btn-accion btn-aprobar"
                      onClick={() =>
                        aprobarComentario(comentario.propuestaId, comentario.id)
                      }
                      title="Aprobar comentario"
                    >
                      <FontAwesomeIcon icon={faCheckCircle} /> Aprobar
                    </button>
                    <button
                      className="btn-accion btn-eliminar"
                      onClick={() =>
                        eliminarComentario(
                          comentario.propuestaId,
                          comentario.id
                        )
                      }
                      title="Eliminar comentario"
                    >
                      <FontAwesomeIcon icon={faTrash} /> Eliminar
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn-accion btn-reportar"
                      onClick={() =>
                        marcarComoReportado(
                          comentario.propuestaId,
                          comentario.id
                        )
                      }
                      title="Reportar comentario"
                    >
                      <FontAwesomeIcon icon={faFlag} /> Reportar
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ModerarComentarios;
