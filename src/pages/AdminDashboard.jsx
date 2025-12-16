import React, { useEffect, useState } from "react";
import { propuestasAPI, problemasAPI } from "../services/api";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles.css";
import {
  faLightbulb,
  faExclamationTriangle,
  faCheckCircle,
  faTimesCircle,
  faVoteYea,
  faChartLine,
  faClock,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";

const AdminDashboard = () => {
  const [propuestas, setPropuestas] = useState([]);
  const [problemas, setProblemas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('propuestas');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [propData, probData] = await Promise.all([
        propuestasAPI.getAll(),
        problemasAPI.getAll(),
      ]);
      setPropuestas(propData);
      setProblemas(probData);
    } catch (error) {
      console.error("Error cargando datos:", error);
      alert("Error al cargar datos del panel de administración");
    } finally {
      setLoading(false);
    }
  };

  const approve = async (id, approved) => {
    const actionText = approved ? 'aprobar' : 'rechazar';
    const confirm = await Swal.fire({
      title: `¿Deseas ${actionText} esta propuesta?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: approved ? 'Sí, aprobar' : 'Sí, rechazar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#2c5282'
    });

    if (!confirm.isConfirmed) return;

    try {
      await propuestasAPI.approve(id, approved);
      // Notify success and refresh data
      Swal.fire({
        icon: 'success',
        title: approved ? 'Propuesta aprobada' : 'Propuesta rechazada',
        timer: 1600,
        showConfirmButton: false
      });
      // trigger other clients/pages to reload
      localStorage.setItem('dataUpdated', Date.now().toString());
      loadData();
    } catch (error) {
      console.error("Error aprobando propuesta:", error);
      Swal.fire('Error', 'No se pudo actualizar la propuesta', 'error');
    }
  };

  const toggleVoting = async (id) => {
    try {
      await propuestasAPI.toggleVoting(id);
      Swal.fire({ icon: 'success', title: 'Estado de votación actualizado', timer: 1200, showConfirmButton: false });
      localStorage.setItem('dataUpdated', Date.now().toString());
      loadData();
    } catch (error) {
      console.error("Error cambiando estado de votación:", error);
      Swal.fire('Error', 'No se pudo cambiar el estado de votación', 'error');
    }
  };

  const changeProblemStatus = async (id, status) => {
    try {
      await problemasAPI.changeStatus(id, status);
      Swal.fire({ icon: 'success', title: `Estado cambiado a ${status}`, timer: 1200, showConfirmButton: false });
      localStorage.setItem('dataUpdated', Date.now().toString());
      loadData();
    } catch (error) {
      console.error("Error cambiando estado:", error);
      Swal.fire('Error', 'No se pudo cambiar el estado del reporte', 'error');
    }
  };

  const stats = {
    propuestasTotal: propuestas.length,
    propuestasAprobadas: propuestas.filter(p => p.approved).length,
    propuestasPendientes: propuestas.filter(p => !p.approved).length,
    votacionesAbiertas: propuestas.filter(p => p.votingOpen).length,
    problemasTotal: problemas.length,
    problemasReportados: problemas.filter(p => p.estado === 'Reportado').length,
    problemasEnProceso: problemas.filter(p => p.estado === 'En proceso').length,
    problemasResueltos: problemas.filter(p => p.estado === 'Resuelto').length,
  };

  return (
    <div className="modern-dashboard">
      <main className="main-content">
        {/* Hero Section Admin */}
        <div className="admin-hero">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <FontAwesomeIcon icon={faUserShield} size="3x" style={{ marginBottom: '1rem' }} />
            <h1 className="hero-title">Panel de Administración</h1>
            <p className="hero-subtitle">Gestiona propuestas y reportes ciudadanos</p>
          </div>
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>Cargando panel de administración...</p>
          </div>
        )}

        {/* Stats Cards */}
        <div className="admin-stats-grid">
          <div className="admin-stat-card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <div className="admin-stat-icon">
              <FontAwesomeIcon icon={faLightbulb} size="2x" />
            </div>
            <div className="admin-stat-content">
              <div className="admin-stat-value">{stats.propuestasTotal}</div>
              <div className="admin-stat-label">Propuestas Total</div>
            </div>
          </div>

          <div className="admin-stat-card" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            <div className="admin-stat-icon">
              <FontAwesomeIcon icon={faCheckCircle} size="2x" />
            </div>
            <div className="admin-stat-content">
              <div className="admin-stat-value">{stats.propuestasAprobadas}</div>
              <div className="admin-stat-label">Aprobadas</div>
            </div>
          </div>

          <div className="admin-stat-card" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
            <div className="admin-stat-icon">
              <FontAwesomeIcon icon={faClock} size="2x" />
            </div>
            <div className="admin-stat-content">
              <div className="admin-stat-value">{stats.propuestasPendientes}</div>
              <div className="admin-stat-label">Pendientes</div>
            </div>
          </div>

          <div className="admin-stat-card" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
            <div className="admin-stat-icon">
              <FontAwesomeIcon icon={faVoteYea} size="2x" />
            </div>
            <div className="admin-stat-content">
              <div className="admin-stat-value">{stats.votacionesAbiertas}</div>
              <div className="admin-stat-label">Votaciones Abiertas</div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="admin-tabs">
          <button
            className={`admin-tab ${activeTab === 'propuestas' ? 'active' : ''}`}
            onClick={() => setActiveTab('propuestas')}
          >
            <FontAwesomeIcon icon={faLightbulb} /> Gestión de Propuestas ({propuestas.length})
          </button>
          <button
            className={`admin-tab ${activeTab === 'reportes' ? 'active' : ''}`}
            onClick={() => setActiveTab('reportes')}
          >
            <FontAwesomeIcon icon={faExclamationTriangle} /> Gestión de Reportes ({problemas.length})
          </button>
        </div>

        {/* Propuestas Section */}
        {activeTab === 'propuestas' && (
          <div className="admin-section">
            <div className="admin-section-header">
              <h3>
                <FontAwesomeIcon icon={faLightbulb} /> Propuestas Ciudadanas
              </h3>
              <div className="admin-filters">
                <span className="filter-badge">Total: {propuestas.length}</span>
                <span className="filter-badge success">Aprobadas: {stats.propuestasAprobadas}</span>
                <span className="filter-badge warning">Pendientes: {stats.propuestasPendientes}</span>
              </div>
            </div>

            {propuestas.length === 0 ? (
              <div className="empty-state">
                <FontAwesomeIcon icon={faLightbulb} size="3x" style={{ color: '#cbd5e0', marginBottom: '1rem' }} />
                <p>No hay propuestas para revisar</p>
              </div>
            ) : (
              <div className="admin-cards-grid">
                {propuestas.map((p) => (
                  <div key={p.id} className="admin-propuesta-card">
                    <div className="propuesta-card-header">
                      <h4>{p.titulo}</h4>
                      <span className={`status-badge ${p.approved ? 'approved' : 'pending'}`}>
                        <FontAwesomeIcon icon={p.approved ? faCheckCircle : faClock} />
                        {p.approved ? ' Aprobada' : ' Pendiente'}
                      </span>
                    </div>

                    <p className="propuesta-description">{p.descripcion}</p>

                    <div className="propuesta-meta">
                      <span><FontAwesomeIcon icon={faClock} /> {p.createdAt}</span>
                      <span>
                        <FontAwesomeIcon icon={faChartLine} /> 
                        {' '}{p.votesYes || 0} a favor / {p.votesNo || 0} en contra
                      </span>
                    </div>

                    <div className="propuesta-actions">
                      <div className="action-group">
                        <button
                          className="admin-btn approve"
                          onClick={() => approve(p.id, true)}
                          disabled={p.approved}
                        >
                          <FontAwesomeIcon icon={faCheckCircle} /> Aprobar
                        </button>
                        <button
                          className="admin-btn reject"
                          onClick={() => approve(p.id, false)}
                          disabled={!p.approved && p.approved !== undefined}
                        >
                          <FontAwesomeIcon icon={faTimesCircle} /> Rechazar
                        </button>
                      </div>
                      <button
                        className={`admin-btn voting ${p.votingOpen ? 'close' : 'open'}`}
                        onClick={() => toggleVoting(p.id)}
                      >
                        <FontAwesomeIcon icon={faVoteYea} />
                        {p.votingOpen ? ' Cerrar Votación' : ' Abrir Votación'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Reportes Section */}
        {activeTab === 'reportes' && (
          <div className="admin-section">
            <div className="admin-section-header">
              <h3>
                <FontAwesomeIcon icon={faExclamationTriangle} /> Reportes de Problemas
              </h3>
              <div className="admin-filters">
                <span className="filter-badge warning">Reportados: {stats.problemasReportados}</span>
                <span className="filter-badge info">En Proceso: {stats.problemasEnProceso}</span>
                <span className="filter-badge success">Resueltos: {stats.problemasResueltos}</span>
              </div>
            </div>

            {problemas.length === 0 ? (
              <div className="empty-state">
                <FontAwesomeIcon icon={faExclamationTriangle} size="3x" style={{ color: '#cbd5e0', marginBottom: '1rem' }} />
                <p>No hay reportes para gestionar</p>
              </div>
            ) : (
              <div className="admin-cards-grid">
                {problemas.map((r) => (
                  <div key={r.id} className="admin-reporte-card">
                    <div className="reporte-card-header">
                      <h4>{r.titulo}</h4>
                      <span className={`priority-badge priority-${r.prioridad?.toLowerCase()}`}>
                        {r.prioridad}
                      </span>
                    </div>

                    <p className="reporte-description">{r.descripcion}</p>

                    <div className="reporte-meta">
                      <span><FontAwesomeIcon icon={faClock} /> {r.fecha}</span>
                      <span>📍 {r.ubicacion}</span>
                      <span>🏷️ {r.categoria}</span>
                    </div>

                    <div className="reporte-actions">
                      <label className="status-label">Estado:</label>
                      <select
                        className="admin-select"
                        value={r.estado}
                        onChange={(e) => changeProblemStatus(r.id, e.target.value)}
                      >
                        <option value="Reportado">📋 Reportado</option>
                        <option value="En proceso">⚙️ En proceso</option>
                        <option value="Resuelto">✅ Resuelto</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
