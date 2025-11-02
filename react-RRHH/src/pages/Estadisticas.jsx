import React, { useEffect, useState } from "react";
import { propuestasAPI, problemasAPI, usuariosAPI } from "../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles.css";
import {
  faLightbulb,
  faExclamationTriangle,
  faVoteYea,
  faUsers,
  faChartLine,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

const Estadisticas = () => {
  const [stats, setStats] = useState({
    totalPropuestas: 0,
    propuestasAprobadas: 0,
    propuestasPendientes: 0,
    totalProblemas: 0,
    problemasResueltos: 0,
    problemasEnProceso: 0,
    totalUsuarios: 0,
    totalVotos: 0,
  });
  const [loading, setLoading] = useState(true);
  const [topPropuestas, setTopPropuestas] = useState([]);

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      setLoading(true);
      const [propuestas, problemas, usuarios] = await Promise.all([
        propuestasAPI.getAll(),
        problemasAPI.getAll(),
        usuariosAPI.getAll(),
      ]);

      // Calcular estadísticas de propuestas
      const aprobadas = propuestas.filter((p) => p.approved).length;
      const pendientes = propuestas.filter((p) => !p.approved).length;
      const totalVotos = propuestas.reduce(
        (sum, p) => sum + (p.votesYes || 0) + (p.votesNo || 0),
        0
      );

      // Calcular estadísticas de problemas
      const resueltos = problemas.filter((p) => p.estado === "Resuelto").length;
      const enProceso = problemas.filter((p) => p.estado === "En proceso").length;

      // Top 5 propuestas más votadas
      const top = [...propuestas]
        .sort((a, b) => {
          const votosA = (a.votesYes || 0) + (a.votesNo || 0);
          const votosB = (b.votesYes || 0) + (b.votesNo || 0);
          return votosB - votosA;
        })
        .slice(0, 5);

      setStats({
        totalPropuestas: propuestas.length,
        propuestasAprobadas: aprobadas,
        propuestasPendientes: pendientes,
        totalProblemas: problemas.length,
        problemasResueltos: resueltos,
        problemasEnProceso: enProceso,
        totalUsuarios: usuarios.length,
        totalVotos,
      });

      setTopPropuestas(top);
    } catch (error) {
      console.error("Error cargando estadísticas:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPercentage = (value, total) => {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  };

  if (loading) {
    return (
      <main className="main-content">
        <div className="page-header">
          <h2>Estadísticas de Participación Ciudadana</h2>
        </div>
        <p>Cargando estadísticas...</p>
      </main>
    );
  }

  return (
    <main className="main-content estadisticas-page">
      <div className="page-header">
        <h2>📊 Estadísticas de Participación Ciudadana</h2>
      </div>

      <div className="estadisticas-content-wrapper">
        {/* Métricas principales */}
        <div className="stats-container" style={{ marginBottom: "2rem" }}>
        <div className="stat-card" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
          <FontAwesomeIcon icon={faLightbulb} size="2x" style={{ color: "white", marginBottom: "0.5rem" }} />
          <h3 style={{ color: "white" }}>Propuestas</h3>
          <p style={{ color: "white", fontSize: "2rem", margin: "0.5rem 0" }}>
            {stats.totalPropuestas}
          </p>
          <small style={{ color: "rgba(255,255,255,0.8)" }}>
            {stats.propuestasAprobadas} aprobadas
          </small>
        </div>

        <div className="stat-card" style={{ background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" }}>
          <FontAwesomeIcon icon={faExclamationTriangle} size="2x" style={{ color: "white", marginBottom: "0.5rem" }} />
          <h3 style={{ color: "white" }}>Reportes</h3>
          <p style={{ color: "white", fontSize: "2rem", margin: "0.5rem 0" }}>
            {stats.totalProblemas}
          </p>
          <small style={{ color: "rgba(255,255,255,0.8)" }}>
            {stats.problemasResueltos} resueltos
          </small>
        </div>

        <div className="stat-card" style={{ background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" }}>
          <FontAwesomeIcon icon={faVoteYea} size="2x" style={{ color: "white", marginBottom: "0.5rem" }} />
          <h3 style={{ color: "white" }}>Votos Totales</h3>
          <p style={{ color: "white", fontSize: "2rem", margin: "0.5rem 0" }}>
            {stats.totalVotos}
          </p>
          <small style={{ color: "rgba(255,255,255,0.8)" }}>
            Participación activa
          </small>
        </div>

        <div className="stat-card" style={{ background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)" }}>
          <FontAwesomeIcon icon={faUsers} size="2x" style={{ color: "white", marginBottom: "0.5rem" }} />
          <h3 style={{ color: "white" }}>Ciudadanos</h3>
          <p style={{ color: "white", fontSize: "2rem", margin: "0.5rem 0" }}>
            {stats.totalUsuarios}
          </p>
          <small style={{ color: "rgba(255,255,255,0.8)" }}>
            Registrados
          </small>
        </div>
      </div>

      {/* Gráficos de barras con CSS */}
      <div className="estadisticas-grid-charts" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "2rem" }}>
        {/* Estado de propuestas */}
        <div className="card">
          <h3>
            <FontAwesomeIcon icon={faChartLine} /> Estado de Propuestas
          </h3>
          <div style={{ marginTop: "1.5rem" }}>
            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span>Aprobadas</span>
                <strong>{stats.propuestasAprobadas} ({getPercentage(stats.propuestasAprobadas, stats.totalPropuestas)}%)</strong>
              </div>
              <div style={{ background: "#e0e0e0", borderRadius: "10px", height: "20px", overflow: "hidden" }}>
                <div
                  style={{
                    background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                    height: "100%",
                    width: `${getPercentage(stats.propuestasAprobadas, stats.totalPropuestas)}%`,
                    transition: "width 0.5s ease",
                  }}
                ></div>
              </div>
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span>Pendientes</span>
                <strong>{stats.propuestasPendientes} ({getPercentage(stats.propuestasPendientes, stats.totalPropuestas)}%)</strong>
              </div>
              <div style={{ background: "#e0e0e0", borderRadius: "10px", height: "20px", overflow: "hidden" }}>
                <div
                  style={{
                    background: "linear-gradient(90deg, #f093fb 0%, #f5576c 100%)",
                    height: "100%",
                    width: `${getPercentage(stats.propuestasPendientes, stats.totalPropuestas)}%`,
                    transition: "width 0.5s ease",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Estado de problemas */}
        <div className="card">
          <h3>
            <FontAwesomeIcon icon={faCheckCircle} /> Estado de Reportes
          </h3>
          <div style={{ marginTop: "1.5rem" }}>
            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span>Resueltos</span>
                <strong>{stats.problemasResueltos} ({getPercentage(stats.problemasResueltos, stats.totalProblemas)}%)</strong>
              </div>
              <div style={{ background: "#e0e0e0", borderRadius: "10px", height: "20px", overflow: "hidden" }}>
                <div
                  style={{
                    background: "#27ae60",
                    height: "100%",
                    width: `${getPercentage(stats.problemasResueltos, stats.totalProblemas)}%`,
                    transition: "width 0.5s ease",
                  }}
                ></div>
              </div>
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span>En Proceso</span>
                <strong>{stats.problemasEnProceso} ({getPercentage(stats.problemasEnProceso, stats.totalProblemas)}%)</strong>
              </div>
              <div style={{ background: "#e0e0e0", borderRadius: "10px", height: "20px", overflow: "hidden" }}>
                <div
                  style={{
                    background: "#3498db",
                    height: "100%",
                    width: `${getPercentage(stats.problemasEnProceso, stats.totalProblemas)}%`,
                    transition: "width 0.5s ease",
                  }}
                ></div>
              </div>
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span>Reportados</span>
                <strong>
                  {stats.totalProblemas - stats.problemasResueltos - stats.problemasEnProceso} (
                  {getPercentage(
                    stats.totalProblemas - stats.problemasResueltos - stats.problemasEnProceso,
                    stats.totalProblemas
                  )}
                  %)
                </strong>
              </div>
              <div style={{ background: "#e0e0e0", borderRadius: "10px", height: "20px", overflow: "hidden" }}>
                <div
                  style={{
                    background: "#f39c12",
                    height: "100%",
                    width: `${getPercentage(
                      stats.totalProblemas - stats.problemasResueltos - stats.problemasEnProceso,
                      stats.totalProblemas
                    )}%`,
                    transition: "width 0.5s ease",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top propuestas */}
      <div className="card">
        <h3>🏆 Top 5 Propuestas Más Votadas</h3>
        <div style={{ marginTop: "1.5rem" }}>
          {topPropuestas.length === 0 && <p>No hay propuestas aún.</p>}
          {topPropuestas.map((propuesta, index) => {
            const totalVotos = (propuesta.votesYes || 0) + (propuesta.votesNo || 0);
            return (
              <div
                key={propuesta.id}
                style={{
                  padding: "1rem",
                  marginBottom: "1rem",
                  background: index === 0 ? "#fff3cd" : "#f8f9fa",
                  borderRadius: "8px",
                  borderLeft: index === 0 ? "4px solid #f39c12" : "4px solid #3498db",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <strong style={{ fontSize: "1.1rem" }}>
                      #{index + 1} {propuesta.titulo}
                    </strong>
                    <div style={{ color: "#666", marginTop: "0.25rem", fontSize: "0.9rem" }}>
                      {propuesta.descripcion?.substring(0, 80)}...
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#2c3e50" }}>
                      {totalVotos}
                    </div>
                    <small style={{ color: "#666" }}>votos totales</small>
                    <div style={{ marginTop: "0.5rem", fontSize: "0.85rem" }}>
                      <span style={{ color: "#27ae60" }}>✓ {propuesta.votesYes || 0}</span>
                      {" / "}
                      <span style={{ color: "#e74c3c" }}>✗ {propuesta.votesNo || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </div>
    </main>
  );
};

export default Estadisticas;
