import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle, faClock, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const Permisos = () => {
  const [votaciones, setVotaciones] = useState([
    {
      id: 1,
      titulo: "Construcción de ciclovías en Av. 4 de Noviembre",
      descripcion: "Propuesta para implementar ciclovías en la avenida principal",
      categoria: "Movilidad",
      fechaInicio: "2025-10-20",
      fechaFin: "2025-10-30",
      votosSi: 512,
      votosNo: 89,
      estado: "Activa",
      miVoto: null
    },
    {
      id: 2,
      titulo: "Mejora del alumbrado público en Los Esteros",
      descripcion: "Instalación de nuevas luminarias LED en el sector",
      categoria: "Infraestructura",
      fechaInicio: "2025-10-18",
      fechaFin: "2025-10-28",
      votosSi: 234,
      votosNo: 45,
      estado: "Activa",
      miVoto: null
    },
    {
      id: 3,
      titulo: "Programa de reciclaje comunitario",
      descripcion: "Implementación de puntos de reciclaje en toda la ciudad",
      categoria: "Medio Ambiente",
      fechaInicio: "2025-10-15",
      fechaFin: "2025-10-25",
      votosSi: 687,
      votosNo: 123,
      estado: "Aprobada",
      miVoto: "si"
    },
  ]);

  const [tabActiva, setTabActiva] = useState("activas");

  const categoriaClass = (categoria) => {
    if (!categoria) return 'otro';
    const key = categoria
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9\s-]/g, '')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-');
    return key || 'otro';
  };

  const estadoClass = (estado) => {
    if (!estado) return 'activa';
    const key = estado
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9\s-]/g, '')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-');
    return key || 'activa';
  };

  useEffect(() => {
    const votacionesGuardadas = JSON.parse(localStorage.getItem("votaciones"));
    if (votacionesGuardadas && votacionesGuardadas.length > 0) {
      setVotaciones(votacionesGuardadas);
    }
  }, []);

  const handleVotar = (id, voto) => {
    Swal.fire({
      title: `¿Votar ${voto === 'si' ? 'A FAVOR' : 'EN CONTRA'}?`,
      text: "Tu voto será registrado y no podrá ser cambiado",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirmar Voto",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const votacionesActualizadas = votaciones.map((votacion) => {
          if (votacion.id === id) {
            return {
              ...votacion,
              votosSi: votacion.votosSi + (voto === 'si' ? 1 : 0),
              votosNo: votacion.votosNo + (voto === 'no' ? 1 : 0),
              miVoto: voto
            };
          }
          return votacion;
        });
        setVotaciones(votacionesActualizadas);
        localStorage.setItem("votaciones", JSON.stringify(votacionesActualizadas));
        Swal.fire({
          title: "¡Voto Registrado!",
          text: "Gracias por participar en la decisión ciudadana",
          icon: "success",
        });
      }
    });
  };

  const votacionesFiltradas = votaciones.filter((votacion) => {
    if (tabActiva === "activas") {
      return votacion.estado === "Activa";
    }
    if (tabActiva === "finalizadas") {
      return votacion.estado === "Aprobada" || votacion.estado === "Rechazada";
    }
    return true;
  });

  const calcularPorcentaje = (votosSi, votosNo) => {
    const total = votosSi + votosNo;
    if (total === 0) return { si: 0, no: 0 };
    return {
      si: Math.round((votosSi / total) * 100),
      no: Math.round((votosNo / total) * 100)
    };
  };

  return (
    <main className="main-content">
      <div className="page-header votaciones-hero">
        <h2>Votaciones Ciudadanas</h2>
        <p className="page-description">Participa y conoce el estado de las propuestas en curso.</p>
      </div>

      <div className="tabs">
        <button
          className={`tab-btn${tabActiva === "activas" ? " active" : ""}`}
          onClick={() => setTabActiva("activas")}
        >
          <FontAwesomeIcon icon={faClock} /> Votaciones Activas
        </button>
        <button
          className={`tab-btn${tabActiva === "finalizadas" ? " active" : ""}`}
          onClick={() => setTabActiva("finalizadas")}
        >
          <FontAwesomeIcon icon={faCheckCircle} /> Finalizadas
        </button>
      </div>

      <div className="votaciones-container mt-3">
        {votacionesFiltradas.map((votacion) => {
          const porcentajes = calcularPorcentaje(votacion.votosSi, votacion.votosNo);
          const categoria = categoriaClass(votacion.categoria);
          const estado = estadoClass(votacion.estado);

          return (
            <div key={votacion.id} className="votacion-card">
              <div className="votacion-header">
                <h3>{votacion.titulo}</h3>
                <span className={`badge-status ${estado}`}>{votacion.estado}</span>
              </div>

              <p className="votacion-descripcion">{votacion.descripcion}</p>

              <div className="votacion-meta">
                <span className={`category-pill ${categoria}`}>
                  {votacion.categoria}
                </span>
                <small className="votacion-deadline">
                  <FontAwesomeIcon icon={faCalendarAlt} /> Finaliza: {new Date(votacion.fechaFin).toLocaleDateString('es-EC')}
                </small>
              </div>

              <div className="votacion-stats">
                <div className="stat-item stat-yes">
                  <div className="stat-label">
                    <FontAwesomeIcon icon={faCheckCircle} /> A Favor
                  </div>
                  <div className="stat-value">{votacion.votosSi}</div>
                  <div className="stat-bar">
                    <div className="stat-bar-fill yes" style={{ width: `${porcentajes.si}%` }}></div>
                  </div>
                  <div className="stat-percent">{porcentajes.si}%</div>
                </div>

                <div className="stat-item stat-no">
                  <div className="stat-label">
                    <FontAwesomeIcon icon={faTimesCircle} /> En Contra
                  </div>
                  <div className="stat-value">{votacion.votosNo}</div>
                  <div className="stat-bar">
                    <div className="stat-bar-fill no" style={{ width: `${porcentajes.no}%` }}></div>
                  </div>
                  <div className="stat-percent">{porcentajes.no}%</div>
                </div>
              </div>

              {votacion.estado === "Activa" ? (
                votacion.miVoto ? (
                  <p className="votacion-note">
                    Ya registraste tu voto {votacion.miVoto === 'si' ? 'a favor' : 'en contra'}.
                  </p>
                ) : (
                  <div className="votacion-actions">
                    <button
                      className="btn-rustico-success btn-rustico-icon"
                      onClick={() => handleVotar(votacion.id, 'si')}
                    >
                      <FontAwesomeIcon icon={faCheckCircle} />
                      <span>Votar A Favor</span>
                    </button>
                    <button
                      className="btn-rustico-danger btn-rustico-icon"
                      onClick={() => handleVotar(votacion.id, 'no')}
                    >
                      <FontAwesomeIcon icon={faTimesCircle} />
                      <span>Votar En Contra</span>
                    </button>
                  </div>
                )
              ) : (
                <p className="votacion-note">
                  Esta votación concluyó con {votacion.votosSi} votos a favor y {votacion.votosNo} en contra.
                </p>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Permisos;
