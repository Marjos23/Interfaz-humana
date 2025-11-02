import { useState, useEffect } from 'react';
import { eventosAPI } from '../services/api';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../styles.css";
import { 
  faCalendarPlus, 
  faCalendarAlt, 
  faClock, 
  faMapMarkerAlt, 
  faTag,
  faEdit,
  faTrash,
  faPlus
} from '@fortawesome/free-solid-svg-icons';

const Eventos = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingEvento, setEditingEvento] = useState(null);
  const [filtroCategoria, setFiltroCategoria] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');
  
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    fecha: '',
    hora: '',
    ubicacion: '',
    categoria: 'Cultural'
  });

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const isAdmin = currentUser?.rol === 'admin';

  const categorias = ['Todos', 'Cultural', 'Educativo', 'Deportivo', 'Ambiental', 'Comunitario'];

  useEffect(() => {
    cargarEventos();
  }, []);

  const cargarEventos = async () => {
    try {
      setLoading(true);
      const data = await eventosAPI.getAll();
      // Ordenar por fecha más cercana
      const eventosOrdenados = data.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
      setEventos(eventosOrdenados);
    } catch (error) {
      console.error('Error al cargar eventos:', error);
      Swal.fire('Error', 'No se pudieron cargar los eventos', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      titulo: '',
      descripcion: '',
      fecha: '',
      hora: '',
      ubicacion: '',
      categoria: 'Cultural'
    });
    setEditingEvento(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.titulo || !formData.descripcion || !formData.fecha || !formData.hora || !formData.ubicacion) {
      Swal.fire('Error', 'Por favor completa todos los campos', 'warning');
      return;
    }

    try {
      if (editingEvento) {
        await eventosAPI.update(editingEvento.id, formData);
        Swal.fire('¡Actualizado!', 'El evento ha sido actualizado correctamente', 'success');
      } else {
        await eventosAPI.create(formData);
        Swal.fire('¡Creado!', 'El evento ha sido creado correctamente', 'success');
      }
      
      resetForm();
      setShowModal(false);
      cargarEventos();
    } catch (error) {
      console.error('Error al guardar evento:', error);
      Swal.fire('Error', error.message || 'No se pudo guardar el evento', 'error');
    }
  };

  const handleEdit = (evento) => {
    setEditingEvento(evento);
    setFormData({
      titulo: evento.titulo,
      descripcion: evento.descripcion,
      fecha: evento.fecha,
      hora: evento.hora,
      ubicacion: evento.ubicacion,
      categoria: evento.categoria
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await eventosAPI.delete(id);
        Swal.fire('¡Eliminado!', 'El evento ha sido eliminado', 'success');
        cargarEventos();
      } catch (error) {
        console.error('Error al eliminar evento:', error);
        Swal.fire('Error', error.message || 'No se pudo eliminar el evento', 'error');
      }
    }
  };

  const eventosFiltrados = eventos.filter(e => {
    const matchCategoria = filtroCategoria === 'Todos' || e.categoria === filtroCategoria;
    const matchBusqueda = e.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
                          e.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
                          e.ubicacion.toLowerCase().includes(busqueda.toLowerCase());
    return matchCategoria && matchBusqueda;
  });

  // Función para formatear fecha
  const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-EC', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Función para determinar si el evento ya pasó
  const eventoYaPaso = (fecha) => {
    return new Date(fecha) < new Date();
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-spinner">Cargando eventos...</div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>
            <FontAwesomeIcon icon={faCalendarAlt} /> Eventos Ciudadanos
          </h1>
          <p className="page-description">
            {isAdmin 
              ? 'Gestiona los eventos comunitarios de Manta' 
              : 'Consulta los próximos eventos de la ciudad'}
          </p>
        </div>
        {isAdmin && (
          <button 
            className="btn-primary"
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
          >
            <FontAwesomeIcon icon={faPlus} /> Crear Evento
          </button>
        )}
      </div>

      {/* Barra de búsqueda y Filtros */}
      <div className="eventos-filter-section" style={{ marginBottom: '20px' }}>
        {/* Barra de búsqueda */}
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            placeholder="🔍 Buscar eventos por título, descripción o ubicación..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 20px',
              fontSize: '1rem',
              border: '2px solid #e2e8f0',
              borderRadius: '10px',
              outline: 'none',
              transition: 'border-color 0.3s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#2c5282'}
            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
          />
        </div>
        
        {/* Filtros horizontales */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <label style={{ fontWeight: 'bold', color: '#2d3748' }}>Filtrar por categoría:</label>
          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => setFiltroCategoria(cat)}
              style={{
                padding: '8px 18px',
                border: filtroCategoria === cat ? '2px solid #2c5282' : '2px solid #e2e8f0',
                backgroundColor: filtroCategoria === cat ? '#2c5282' : 'white',
                color: filtroCategoria === cat ? 'white' : '#333',
                borderRadius: '20px',
                cursor: 'pointer',
                fontWeight: filtroCategoria === cat ? 'bold' : 'normal',
                fontSize: '0.9rem',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                if (filtroCategoria !== cat) {
                  e.target.style.backgroundColor = '#f7fafc';
                  e.target.style.borderColor = '#2c5282';
                }
              }}
              onMouseLeave={(e) => {
                if (filtroCategoria !== cat) {
                  e.target.style.backgroundColor = 'white';
                  e.target.style.borderColor = '#e2e8f0';
                }
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Eventos */}
      <div className="eventos-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
        gap: '20px' 
      }}>
        {eventosFiltrados.length === 0 ? (
          <div style={{ 
            gridColumn: '1 / -1', 
            textAlign: 'center', 
            padding: '40px',
            color: '#666' 
          }}>
            No hay eventos en esta categoría
          </div>
        ) : (
          eventosFiltrados.map(evento => (
            <div 
              key={evento.id} 
              className="evento-card"
              style={{
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '20px',
                backgroundColor: 'white',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                position: 'relative',
                opacity: eventoYaPaso(evento.fecha) ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
              }}
            >
              {eventoYaPaso(evento.fecha) && (
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  backgroundColor: '#9ca3af',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  FINALIZADO
                </div>
              )}
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                marginBottom: '12px' 
              }}>
                <span style={{
                  backgroundColor: '#3182ce',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  <FontAwesomeIcon icon={faTag} /> {evento.categoria}
                </span>
                
                {isAdmin && (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleEdit(evento)}
                      style={{
                        backgroundColor: '#f59e0b',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '6px 10px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                      title="Editar"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={() => handleDelete(evento.id)}
                      style={{
                        backgroundColor: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '6px 10px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                      title="Eliminar"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                )}
              </div>

              <h3 style={{ 
                fontSize: '20px', 
                fontWeight: 'bold', 
                marginBottom: '12px',
                color: '#1a202c' 
              }}>
                {evento.titulo}
              </h3>

              <p style={{ 
                color: '#4a5568', 
                marginBottom: '16px',
                lineHeight: '1.5' 
              }}>
                {evento.descripcion}
              </p>

              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '8px',
                borderTop: '1px solid #e2e8f0',
                paddingTop: '12px' 
              }}>
                <div style={{ display: 'flex', alignItems: 'center', color: '#2c5282' }}>
                  <FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight: '8px' }} />
                  <span style={{ fontWeight: '500' }}>
                    {formatearFecha(evento.fecha)}
                  </span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', color: '#2c5282' }}>
                  <FontAwesomeIcon icon={faClock} style={{ marginRight: '8px' }} />
                  <span>{evento.hora}</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', color: '#2c5282' }}>
                  <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: '8px' }} />
                  <span>{evento.ubicacion}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal de Crear/Editar Evento */}
      {showModal && (
        <div 
          className="modal-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}
          onClick={() => {
            setShowModal(false);
            resetForm();
          }}
        >
          <div 
            className="modal-content"
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '30px',
              width: '90%',
              maxWidth: '600px',
              maxHeight: '90vh',
              overflow: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginBottom: '20px', color: '#1a202c' }}>
              <FontAwesomeIcon icon={faCalendarPlus} /> 
              {editingEvento ? ' Editar Evento' : ' Crear Nuevo Evento'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                  Título del Evento *
                </label>
                <input
                  type="text"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #cbd5e0',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                  placeholder="Ej: Feria Gastronómica de Manta"
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                  Descripción *
                </label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  rows="4"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #cbd5e0',
                    borderRadius: '6px',
                    fontSize: '14px',
                    resize: 'vertical'
                  }}
                  placeholder="Describe el evento..."
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                    Fecha *
                  </label>
                  <input
                    type="date"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #cbd5e0',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                    Hora *
                  </label>
                  <input
                    type="time"
                    name="hora"
                    value={formData.hora}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #cbd5e0',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                  Ubicación *
                </label>
                <input
                  type="text"
                  name="ubicacion"
                  value={formData.ubicacion}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #cbd5e0',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                  placeholder="Ej: Parque Central"
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                  Categoría *
                </label>
                <select
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #cbd5e0',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                >
                  <option value="Cultural">Cultural</option>
                  <option value="Educativo">Educativo</option>
                  <option value="Deportivo">Deportivo</option>
                  <option value="Ambiental">Ambiental</option>
                  <option value="Comunitario">Comunitario</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  style={{
                    padding: '10px 20px',
                    border: '1px solid #cbd5e0',
                    borderRadius: '6px',
                    backgroundColor: 'white',
                    color: '#4a5568',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '6px',
                    backgroundColor: '#2c5282',
                    color: 'white',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  {editingEvento ? 'Actualizar' : 'Crear'} Evento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Eventos;
