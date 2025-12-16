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
    <div className="estadisticas-page-modern">
      {/* Hero Section */}
      <div className="estadisticas-hero">
        <div className="estadisticas-hero-overlay">
          <div className="estadisticas-hero-content">
            <div className="estadisticas-hero-icon">
              <FontAwesomeIcon icon={faChartLine} />
            </div>
            <div>
              <h1>Estadísticas de Participación</h1>
              <p>Análisis en tiempo real del compromiso ciudadano con el portal</p>
            </div>
          </div>
        </div>
      </div>

      <div className="estadisticas-content-wrapper">
        {/* Métricas principales */}
        <div className="estadisticas-kpi-grid">
          <div className="kpi-card kpi-propuestas">
            <div className="kpi-icon">
              <FontAwesomeIcon icon={faLightbulb} />
            </div>
            <div className="kpi-content">
              <h3>Propuestas</h3>
              <div className="kpi-number">{stats.totalPropuestas}</div>
              <div className="kpi-detail">
                <span className="kpi-badge success">{stats.propuestasAprobadas} aprobadas</span>
                <span className="kpi-badge pending">{stats.propuestasPendientes} pendientes</span>
              </div>
            </div>
          </div>

          <div className="kpi-card kpi-reportes">
            <div className="kpi-icon">
              <FontAwesomeIcon icon={faExclamationTriangle} />
            </div>
            <div className="kpi-content">
              <h3>Reportes</h3>
              <div className="kpi-number">{stats.totalProblemas}</div>
              <div className="kpi-detail">
                <span className="kpi-badge success">{stats.problemasResueltos} resueltos</span>
                <span className="kpi-badge info">{stats.problemasEnProceso} en proceso</span>
              </div>
            </div>
          </div>

          <div className="kpi-card kpi-votos">
            <div className="kpi-icon">
              <FontAwesomeIcon icon={faVoteYea} />
            </div>
            <div className="kpi-content">
              <h3>Votos Totales</h3>
              <div className="kpi-number">{stats.totalVotos}</div>
              <div className="kpi-detail">
                <span className="kpi-badge info">Participación activa</span>
              </div>
            </div>
          </div>

          <div className="kpi-card kpi-ciudadanos">
            <div className="kpi-icon">
              <FontAwesomeIcon icon={faUsers} />
            </div>
            <div className="kpi-content">
              <h3>Ciudadanos</h3>
              <div className="kpi-number">{stats.totalUsuarios}</div>
              <div className="kpi-detail">
                <span className="kpi-badge success">Registrados</span>
              </div>
            </div>
          </div>
        </div>

      {/* Gráficos de barras con CSS */}
      <div className="estadisticas-charts-grid">
        {/* Estado de propuestas */}
        <div className="chart-card">
          <div className="chart-header">
            <FontAwesomeIcon icon={faChartLine} />
            <h3>Estado de Propuestas</h3>
          </div>
          <div className="chart-body">
            <div className="progress-item">
              <div className="progress-label">
                <span className="label-text">Aprobadas</span>
                <span className="label-value">{stats.propuestasAprobadas} ({getPercentage(stats.propuestasAprobadas, stats.totalPropuestas)}%)</span>
              </div>
              <div className="progress-bar-container">
                <div
                  className="progress-bar progress-success"
                  style={{ width: `${getPercentage(stats.propuestasAprobadas, stats.totalPropuestas)}%` }}
                ></div>
              </div>
            </div>

            <div className="progress-item">
              <div className="progress-label">
                <span className="label-text">Pendientes</span>
                <span className="label-value">{stats.propuestasPendientes} ({getPercentage(stats.propuestasPendientes, stats.totalPropuestas)}%)</span>
              </div>
              <div className="progress-bar-container">
                <div
                  className="progress-bar progress-warning"
                  style={{ width: `${getPercentage(stats.propuestasPendientes, stats.totalPropuestas)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Estado de reportes */}
        <div className="chart-card">
          <div className="chart-header">
            <FontAwesomeIcon icon={faCheckCircle} />
            <h3>Estado de Reportes</h3>
          </div>
          <div className="chart-body">
            <div className="progress-item">
              <div className="progress-label">
                <span className="label-text">Resueltos</span>
                <span className="label-value">{stats.problemasResueltos} ({getPercentage(stats.problemasResueltos, stats.totalProblemas)}%)</span>
              </div>
              <div className="progress-bar-container">
                <div
                  className="progress-bar progress-success"
                  style={{ width: `${getPercentage(stats.problemasResueltos, stats.totalProblemas)}%` }}
                ></div>
              </div>
            </div>

            <div className="progress-item">
              <div className="progress-label">
                <span className="label-text">En Proceso</span>
                <span className="label-value">{stats.problemasEnProceso} ({getPercentage(stats.problemasEnProceso, stats.totalProblemas)}%)</span>
              </div>
              <div className="progress-bar-container">
                <div
                  className="progress-bar progress-info"
                  style={{ width: `${getPercentage(stats.problemasEnProceso, stats.totalProblemas)}%` }}
                ></div>
              </div>
            </div>

            <div className="progress-item">
              <div className="progress-label">
                <span className="label-text">Reportados</span>
                <span className="label-value">
                  {stats.totalProblemas - stats.problemasResueltos - stats.problemasEnProceso} (
                  {getPercentage(
                    stats.totalProblemas - stats.problemasResueltos - stats.problemasEnProceso,
                    stats.totalProblemas
                  )}%)
                </span>
              </div>
              <div className="progress-bar-container">
                <div
                  className="progress-bar progress-warning"
                  style={{ width: `${getPercentage(
                    stats.totalProblemas - stats.problemasResueltos - stats.problemasEnProceso,
                    stats.totalProblemas
                  )}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top propuestas */}
      <div className="top-propuestas-section">
        <div className="top-propuestas-header">
          <div className="header-icon">
            <FontAwesomeIcon icon={faChartLine} />
          </div>
          <h3>🏆 Top 5 Propuestas Más Votadas</h3>
        </div>
        
        <div className="top-propuestas-list">
          {topPropuestas.length === 0 && (
            <div className="empty-state">
              <p>No hay propuestas disponibles aún.</p>
            </div>
          )}
          
          {topPropuestas.map((propuesta, index) => {
            const totalVotos = (propuesta.votesYes || 0) + (propuesta.votesNo || 0);
            const percentYes = totalVotos > 0 ? ((propuesta.votesYes || 0) / totalVotos * 100).toFixed(0) : 0;
            
            return (
              <div
                key={propuesta.id}
                className={`top-propuesta-item ${index === 0 ? 'top-winner' : ''}`}
              >
                <div className="propuesta-rank">
                  <span className={`rank-number ${index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : ''}`}>
                    #{index + 1}
                  </span>
                </div>
                
                <div className="propuesta-info">
                  <h4 className="propuesta-titulo">{propuesta.titulo}</h4>
                  <p className="propuesta-descripcion">
                    {propuesta.descripcion?.substring(0, 100)}...
                  </p>
                  
                  <div className="votos-breakdown">
                    <div className="voto-bar">
                      <div className="voto-bar-fill yes" style={{ width: `${percentYes}%` }}></div>
                      <div className="voto-bar-fill no" style={{ width: `${100 - percentYes}%` }}></div>
                    </div>
                    <div className="voto-labels">
                      <span className="voto-yes">
                        <FontAwesomeIcon icon={faCheckCircle} /> {propuesta.votesYes || 0} a favor
                      </span>
                      <span className="voto-no">
                        ✗ {propuesta.votesNo || 0} en contra
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="propuesta-total">
                  <div className="total-number">{totalVotos}</div>
                  <div className="total-label">votos</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </div>
    </div>
  );
};

export default Estadisticas;
