import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faExclamationTriangle,
  faFilter,
  faSearch,
  faMapMarkerAlt,
  faClock,
  faCheckCircle,
  faTimesCircle,
  faEye,
  faPlus,
  faImage,
  faLocationDot,
  faSpinner,
  faTools,
  faLightbulb,
  faTrash,
  faTimes,
  faHourglassHalf
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { problemasAPI } from "../services/api";
import "../styles.css";

const Empleados = () => {
  const [problemas, setProblemas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroEstado, setFiltroEstado] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  
  // Estados del formulario
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    categoria: '',
    ubicacion: '',
    coordenadas: null
  });

  const navigate = useNavigate();

  // Cargar problemas desde la API
  useEffect(() => {
    cargarProblemas();
  }, []);

  const cargarProblemas = async () => {
    try {
      setLoading(true);
      const data = await problemasAPI.getAll();
      setProblemas(data || []);
    } catch (error) {
      console.error('Error al cargar problemas:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron cargar los reportes. Verifica que el servidor esté activo.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleView = (problema) => {
    Swal.fire({
      title: problema.titulo,
      html: `
        <div style="text-align: left;">
          <p><strong>📂 Categoría:</strong> ${problema.categoria}</p>
          <p><strong>📍 Ubicación:</strong> ${problema.ubicacion || 'No especificada'}</p>
          <p><strong>📝 Descripción:</strong> ${problema.descripcion}</p>
          <p><strong>👤 Reportado por:</strong> ${problema.reportadoPor || 'Anónimo'}</p>
          <p><strong>📅 Fecha:</strong> ${problema.fecha}</p>
          <p><strong>🏷️ Estado:</strong> <span style="color: ${getEstadoColor(problema.estado)}; font-weight: bold;">${problema.estado}</span></p>
        </div>
      `,
      icon: "info",
      confirmButtonText: "Cerrar",
      width: 600
    });
  };

  const getEstadoColor = (estado) => {
    switch(estado) {
      case 'Reportado': return '#ff9800';
      case 'En Proceso': return '#2196f3';
      case 'Resuelto': return '#4caf50';
      case 'Rechazado': return '#f44336';
      default: return '#666';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.titulo || !formData.descripcion || !formData.categoria || !formData.ubicacion) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor completa todos los campos requeridos',
      });
      return;
    }

    try {
      const nuevoProblema = {
        ...formData,
        fecha: new Date().toLocaleDateString('es-EC'),
        estado: 'Reportado'
      };

      await problemasAPI.create(nuevoProblema);
      
      Swal.fire({
        icon: 'success',
        title: '¡Reporte enviado!',
        text: 'Tu reporte ha sido registrado exitosamente. Te notificaremos sobre su progreso.',
        timer: 3000
      });

      setFormData({
        titulo: '',
        descripcion: '',
        categoria: '',
        ubicacion: '',
        coordenadas: null
      });
      setShowForm(false);
      cargarProblemas();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo enviar el reporte. Intenta nuevamente.',
      });
    }
  };

  const obtenerUbicacion = () => {
    if (navigator.geolocation) {
      Swal.fire({
        title: 'Obteniendo ubicación...',
        text: 'Permitir acceso a tu ubicación',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setFormData(prev => ({
            ...prev,
            coordenadas: coords,
            ubicacion: `Lat: ${coords.lat.toFixed(6)}, Lng: ${coords.lng.toFixed(6)}`
          }));
          Swal.close();
          Swal.fire({
            icon: 'success',
            title: 'Ubicación obtenida',
            timer: 1500,
            showConfirmButton: false
          });
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo obtener la ubicación. Ingresa manualmente la dirección.',
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Geolocalización no disponible',
        text: 'Tu navegador no soporta geolocalización',
      });
    }
  };

  const problemasFiltrados = problemas.filter(p => {
    const matchEstado = filtroEstado === 'Todos' || p.estado === filtroEstado;
    const matchSearch = (p.titulo?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                       (p.categoria?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                       (p.ubicacion?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    return matchEstado && matchSearch;
  });

  const estadisticas = {
    total: problemas.length,
    reportados: problemas.filter(p => p.estado === "Reportado").length,
    enProceso: problemas.filter(p => p.estado === "En Proceso").length,
    resueltos: problemas.filter(p => p.estado === "Resuelto").length,
  };

  const categorias = [
    { value: 'Vías y Calles', icon: '🛣️', color: '#ff5722' },
    { value: 'Alumbrado Público', icon: '💡', color: '#ffc107' },
    { value: 'Recolección de Basura', icon: '🗑️', color: '#4caf50' },
    { value: 'Parques y Áreas Verdes', icon: '🌳', color: '#8bc34a' },
    { value: 'Alcantarillado', icon: '🚰', color: '#2196f3' },
    { value: 'Seguridad', icon: '🚨', color: '#f44336' },
    { value: 'Otros', icon: '📋', color: '#9e9e9e' }
  ];

  if (loading) {
    return (
      <div className="reportes-page-modern">
        <div className="loading-container">
          <FontAwesomeIcon icon={faSpinner} spin size="3x" />
          <p>Cargando reportes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="reportes-page-modern">
      {/* Hero Section */}
      <div className="reportes-hero">
        <div className="reportes-hero-overlay">
          <div className="reportes-hero-content">
            <div className="reportes-hero-icon">
              <FontAwesomeIcon icon={faExclamationTriangle} />
            </div>
            <div>
              <h1>Reportes Ciudadanos</h1>
              <p>Reporta problemas de tu comunidad y ayúdanos a mejorar tu ciudad</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tarjetas de Estadísticas */}
      <div className="reportes-stats-section">
        <div className="reportes-stats-grid">
          <div className="stat-card-report card-total">
            <div className="stat-icon">
              <FontAwesomeIcon icon={faExclamationTriangle} />
            </div>
            <div className="stat-content">
              <h3>{estadisticas.total}</h3>
              <p>Total Reportes</p>
            </div>
          </div>
          
          <div className="stat-card-report card-reportados">
            <div className="stat-icon">
              <FontAwesomeIcon icon={faHourglassHalf} />
            </div>
            <div className="stat-content">
              <h3>{estadisticas.reportados}</h3>
              <p>Reportados</p>
            </div>
          </div>
          
          <div className="stat-card-report card-proceso">
            <div className="stat-icon">
              <FontAwesomeIcon icon={faTools} />
            </div>
            <div className="stat-content">
              <h3>{estadisticas.enProceso}</h3>
              <p>En Proceso</p>
            </div>
          </div>
          
          <div className="stat-card-report card-resueltos">
            <div className="stat-icon">
              <FontAwesomeIcon icon={faCheckCircle} />
            </div>
            <div className="stat-content">
              <h3>{estadisticas.resueltos}</h3>
              <p>Resueltos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Botón Nueva Reporte con Animación */}
      <div className="nuevo-reporte-btn-container">
        <button 
          className={`btn-nuevo-reporte ${showForm ? 'active' : ''}`}
          onClick={() => setShowForm(!showForm)}
        >
          <FontAwesomeIcon icon={showForm ? faTimes : faPlus} />
          {showForm ? 'Cancelar' : 'Nuevo Reporte'}
        </button>
      </div>

      {/* Formulario de Nuevo Reporte */}
      {showForm && (
        <div className="reporte-form-container">
          <div className="reporte-form-card">
            <div className="form-header">
              <h2>📝 Nuevo Reporte Ciudadano</h2>
              <p>Describe el problema que deseas reportar</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group full-width">
                  <label>
                    <FontAwesomeIcon icon={faExclamationTriangle} /> Título del problema *
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Bache en Calle Principal"
                    value={formData.titulo}
                    onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    📂 Categoría *
                  </label>
                  <select
                    value={formData.categoria}
                    onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                    required
                  >
                    <option value="">Selecciona una categoría</option>
                    {categorias.map(cat => (
                      <option key={cat.value} value={cat.value}>
                        {cat.icon} {cat.value}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    <FontAwesomeIcon icon={faMapMarkerAlt} /> Ubicación *
                  </label>
                  <div className="ubicacion-input-group">
                    <input
                      type="text"
                      placeholder="Dirección o coordenadas"
                      value={formData.ubicacion}
                      onChange={(e) => setFormData({...formData, ubicacion: e.target.value})}
                      required
                    />
                    <button 
                      type="button" 
                      className="btn-ubicacion"
                      onClick={obtenerUbicacion}
                      title="Obtener mi ubicación"
                    >
                      <FontAwesomeIcon icon={faLocationDot} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group full-width">
                  <label>
                    📝 Descripción del problema *
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Describe detalladamente el problema..."
                    value={formData.descripcion}
                    onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                    required
                  ></textarea>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-cancelar" onClick={() => setShowForm(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-enviar">
                  <FontAwesomeIcon icon={faPlus} /> Enviar Reporte
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Filtros y Búsqueda */}
      <div className="reportes-filter-section">
        <div className="filter-search-container">
          <div className="search-box-modern">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              placeholder="Buscar por título, categoría o ubicación..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-group">
            <FontAwesomeIcon icon={faFilter} className="filter-icon" />
            <select 
              value={filtroEstado} 
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="filter-select"
            >
              <option value="Todos">Todos los estados</option>
              <option value="Reportado">📢 Reportado</option>
              <option value="En Proceso">⚙️ En Proceso</option>
              <option value="Resuelto">✅ Resuelto</option>
              <option value="Rechazado">❌ Rechazado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tarjetas de Reportes */}
      <div className="reportes-grid">
        {problemasFiltrados.length === 0 ? (
          <div className="empty-state-modern">
            <FontAwesomeIcon icon={faExclamationTriangle} className="empty-icon" />
            <h3>No se encontraron reportes</h3>
            <p>
              {problemas.length === 0 
                ? '¡Sé el primero en reportar un problema en tu comunidad!' 
                : 'Intenta ajustar los filtros de búsqueda'}
            </p>
            {problemas.length === 0 && (
              <button className="btn-primary-modern" onClick={() => setShowForm(true)}>
                <FontAwesomeIcon icon={faPlus} /> Crear Primer Reporte
              </button>
            )}
          </div>
        ) : (
          problemasFiltrados.map((problema) => (
            <div key={problema.id} className="reporte-card-modern">
              <div className="reporte-card-header">
                <span className="categoria-badge">
                  {categorias.find(c => c.value === problema.categoria)?.icon || '📋'} {problema.categoria}
                </span>
                <span className={`estado-badge-new badge-${problema.estado.toLowerCase().replace(' ', '-')}`}>
                  {problema.estado}
                </span>
              </div>
              
              <h3 className="reporte-title">{problema.titulo}</h3>
              
              <p className="reporte-descripcion">
                {problema.descripcion?.substring(0, 120)}{problema.descripcion?.length > 120 ? '...' : ''}
              </p>
              
              <div className="reporte-meta">
                <div className="meta-item">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  <span>{problema.ubicacion || 'Sin ubicación'}</span>
                </div>
                <div className="meta-item">
                  <FontAwesomeIcon icon={faClock} />
                  <span>{problema.fecha}</span>
                </div>
              </div>
              
              <div className="reporte-footer">
                <span className="reporte-autor">
                  Por: <strong>{problema.reportadoPor || 'Ciudadano'}</strong>
                </span>
                <button 
                  className="btn-ver-detalle"
                  onClick={() => handleView(problema)}
                  title="Ver detalles"
                >
                  <FontAwesomeIcon icon={faEye} /> Ver más
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Empleados;
