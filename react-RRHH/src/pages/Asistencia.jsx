import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles.css";
import { 
  faExclamationTriangle, 
  faCheckCircle, 
  faClock,
  faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { problemasAPI } from "../services/api";

const Asistencia = () => {
  const [problemas, setProblemas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nuevoProblema, setNuevoProblema] = useState({
    titulo: "",
    descripcion: "",
    categoria: "Vías",
    ubicacion: "",
    prioridad: "Media"
  });

  useEffect(() => {
    loadProblemas();
  }, []);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'dataUpdated') {
        loadProblemas();
        Swal.fire({
          icon: 'info',
          title: 'Actualización',
          text: 'Hay cambios en los reportes. Lista actualizada.',
          timer: 1400,
          showConfirmButton: false
        });
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const loadProblemas = async () => {
    try {
      setLoading(true);
      const data = await problemasAPI.getAll();
      setProblemas(data);
    } catch (error) {
      console.error("Error cargando problemas:", error);
      alert("Error al cargar reportes");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoProblema({
      ...nuevoProblema,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await problemasAPI.create(nuevoProblema);
      
      Swal.fire({
        title: "¡Problema Reportado!",
        text: "Tu reporte ha sido registrado y será atendido pronto",
        icon: "success",
        confirmButtonText: "Aceptar"
      });
      
      setShowModal(false);
      setNuevoProblema({
        titulo: "",
        descripcion: "",
        categoria: "Vías",
        ubicacion: "",
        prioridad: "Media"
      });
      
      loadProblemas();
    } catch (error) {
      console.error("Error reportando problema:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo reportar el problema. Intenta nuevamente.",
        icon: "error",
        confirmButtonText: "Aceptar"
      });
    }
  };

  const getEstadoIcon = (estado) => {
    switch(estado) {
      case "Reportado":
        return <FontAwesomeIcon icon={faExclamationTriangle} style={{color: "#f39c12"}} />;
      case "En proceso":
        return <FontAwesomeIcon icon={faClock} style={{color: "#3498db"}} />;
      case "Resuelto":
        return <FontAwesomeIcon icon={faCheckCircle} style={{color: "#27ae60"}} />;
      default:
        return null;
    }
  };

  const getPrioridadColor = (prioridad) => {
    switch(prioridad) {
      case "Alta":
        return "#e74c3c";
      case "Media":
        return "#f39c12";
      case "Baja":
        return "#3498db";
      default:
        return "#95a5a6";
    }
  };

  return (
    <main className="main-content">
      <div className="page-header">
        <h2>Reportar Problemas</h2>
        <button
          type="button"
          className="btn-primary"
          onClick={() => setShowModal(true)}
        >
          + Reportar Problema
        </button>
      </div>

      {loading && <p>Cargando reportes...</p>}

      <div className="stats-container" style={{marginBottom: "2rem"}}>
        <div className="stat-card" style={{background: "#fff3cd"}}>
          <h3>Reportados</h3>
          <p style={{color: "#f39c12"}}>
            {problemas.filter(p => p.estado === "Reportado").length}
          </p>
        </div>
        <div className="stat-card" style={{background: "#d1ecf1"}}>
          <h3>En Proceso</h3>
          <p style={{color: "#3498db"}}>
            {problemas.filter(p => p.estado === "En proceso").length}
          </p>
        </div>
        <div className="stat-card" style={{background: "#d4edda"}}>
          <h3>Resueltos</h3>
          <p style={{color: "#27ae60"}}>
            {problemas.filter(p => p.estado === "Resuelto").length}
          </p>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th className="tableHeads">Estado</th>
              <th className="tableHeads">Título</th>
              <th className="tableHeads">Categoría</th>
              <th className="tableHeads">Ubicación</th>
              <th className="tableHeads">Prioridad</th>
              <th className="tableHeads">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {problemas.map((problema) => (
              <tr key={problema.id}>
                <td>
                  <span style={{display: "flex", alignItems: "center", gap: "0.5rem"}}>
                    {getEstadoIcon(problema.estado)}
                    {problema.estado}
                  </span>
                </td>
                <td>{problema.titulo}</td>
                <td>{problema.categoria}</td>
                <td>
                  <FontAwesomeIcon icon={faMapMarkerAlt} /> {problema.ubicacion}
                </td>
                <td>
                  <span style={{
                    padding: "0.25rem 0.75rem",
                    borderRadius: "12px",
                    background: getPrioridadColor(problema.prioridad),
                    color: "white",
                    fontSize: "0.85rem"
                  }}>
                    {problema.prioridad}
                  </span>
                </td>
                <td>{problema.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowModal(false)}>
              ×
            </button>
            <h3>Reportar Nuevo Problema</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Título del Problema</label>
                <input
                  type="text"
                  name="titulo"
                  value={nuevoProblema.titulo}
                  onChange={handleInputChange}
                  required
                  placeholder="Ej: Bache en la calle principal"
                />
              </div>

              <div className="form-group">
                <label>Descripción</label>
                <textarea
                  name="descripcion"
                  value={nuevoProblema.descripcion}
                  onChange={handleInputChange}
                  required
                  placeholder="Describe el problema con detalle..."
                  rows="4"
                ></textarea>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Categoría</label>
                  <select
                    name="categoria"
                    value={nuevoProblema.categoria}
                    onChange={handleInputChange}
                  >
                    <option value="Vías">Vías</option>
                    <option value="Infraestructura">Infraestructura</option>
                    <option value="Limpieza">Limpieza</option>
                    <option value="Alumbrado">Alumbrado</option>
                    <option value="Seguridad">Seguridad</option>
                    <option value="Medio Ambiente">Medio Ambiente</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Prioridad</label>
                  <select
                    name="prioridad"
                    value={nuevoProblema.prioridad}
                    onChange={handleInputChange}
                  >
                    <option value="Baja">Baja</option>
                    <option value="Media">Media</option>
                    <option value="Alta">Alta</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Ubicación</label>
                <input
                  type="text"
                  name="ubicacion"
                  value={nuevoProblema.ubicacion}
                  onChange={handleInputChange}
                  required
                  placeholder="Indica la dirección exacta"
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  Reportar Problema
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Asistencia;
