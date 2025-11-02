import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const DEFAULT_LOCATION = {
  direccion: '',
  lat: -0.9536,
  lng: -80.7286,
  codigoPostal: ''
};

const MapSelector = ({ value, onChange, disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(() => value || { ...DEFAULT_LOCATION });
  const [searchQuery, setSearchQuery] = useState('');

  // Ubicaciones predefinidas de Manta con códigos postales
  const ubicacionesManta = [
    { nombre: 'Centro de Manta', direccion: 'Malecón Escénico, Centro', lat: -0.9537, lng: -80.7286, codigoPostal: '130201' },
    { nombre: 'Tarqui', direccion: 'Av. 4 de Noviembre, Tarqui', lat: -0.9614, lng: -80.7097, codigoPostal: '130202' },
    { nombre: 'Los Esteros', direccion: 'Av. Flavio Reyes, Los Esteros', lat: -0.9423, lng: -80.7412, codigoPostal: '130203' },
    { nombre: 'Miraflores', direccion: 'Calle 106 y Av. 113, Miraflores', lat: -0.9681, lng: -80.7145, codigoPostal: '130204' },
    { nombre: 'Barbasquillo', direccion: 'Playa Barbasquillo', lat: -0.8912, lng: -80.7534, codigoPostal: '130205' },
    { nombre: 'El Murciélago', direccion: 'Av. Flavio Reyes, El Murciélago', lat: -0.9356, lng: -80.7489, codigoPostal: '130206' },
    { nombre: 'Santa Martha', direccion: 'Av. 24 de Mayo, Santa Martha', lat: -0.9789, lng: -80.7023, codigoPostal: '130207' },
    { nombre: 'Jocay', direccion: 'Calle 102 y Av. 106, Jocay', lat: -0.9567, lng: -80.7234, codigoPostal: '130208' },
    { nombre: 'La Dolorosa', direccion: 'Av. Universitaria, La Dolorosa', lat: -0.9645, lng: -80.6978, codigoPostal: '130209' },
    { nombre: 'Eloy Alfaro', direccion: 'Calle 115 y Av. 24, Eloy Alfaro', lat: -0.9512, lng: -80.7156, codigoPostal: '130210' },
    { nombre: 'San Juan', direccion: 'Vía San Mateo, San Juan', lat: -0.9234, lng: -80.6812, codigoPostal: '130211' },
    { nombre: 'San Mateo', direccion: 'Km 12 Vía San Mateo', lat: -0.9012, lng: -80.6645, codigoPostal: '130212' },
  ];

  const closeModal = () => {
    setIsOpen(false);
    setSearchQuery('');
  };

  useEffect(() => {
    if (value) {
      setSelectedLocation(value);
    } else {
      setSelectedLocation({ ...DEFAULT_LOCATION });
    }
  }, [value]);

  const handleSelectLocation = (ubicacion) => {
    const newLocation = {
      direccion: ubicacion.direccion,
      lat: ubicacion.lat,
      lng: ubicacion.lng,
      codigoPostal: ubicacion.codigoPostal
    };
  setSelectedLocation(newLocation);
  onChange(newLocation);
  closeModal();
    
    Swal.fire({
      title: '📍 Ubicación Seleccionada',
      html: `
        <div style="text-align: left; padding: 0 1rem;">
          <p><strong>Dirección:</strong> ${ubicacion.direccion}</p>
          <p><strong>Código Postal:</strong> ${ubicacion.codigoPostal}</p>
          <p><strong>Coordenadas:</strong> ${ubicacion.lat.toFixed(4)}, ${ubicacion.lng.toFixed(4)}</p>
        </div>
      `,
      icon: 'success',
      timer: 3000,
      showConfirmButton: false
    });
  };

  const filteredLocations = ubicacionesManta.filter(ubicacion =>
    ubicacion.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ubicacion.direccion.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ubicacion.codigoPostal.includes(searchQuery)
  );

  return (
    <div className="map-selector-container">
      <div className="map-selector-input-wrapper">
        <input
          type="text"
          value={selectedLocation.direccion || ''}
          placeholder="Selecciona tu ubicación en Manta"
          readOnly
          disabled={disabled}
          className="map-selector-input"
        />
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          disabled={disabled}
          className="map-selector-button"
        >
          📍 Abrir Mapa
        </button>
      </div>

      {selectedLocation.codigoPostal && (
        <div className="map-selector-info">
          <span className="info-badge">📮 CP: {selectedLocation.codigoPostal}</span>
          <span className="info-badge">📌 {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}</span>
        </div>
      )}

      {isOpen && (
        <div className="map-modal-overlay" onClick={closeModal}>
          <div className="map-modal" onClick={(e) => e.stopPropagation()}>
            <div className="map-modal-header">
              <h3>🗺️ Selecciona tu Ubicación en Manta</h3>
              <button
                className="map-modal-close"
                onClick={closeModal}
              >
                ✕
              </button>
            </div>

            <div className="map-search">
              <input
                type="text"
                placeholder="🔍 Buscar por sector, dirección o código postal..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="map-search-input"
              />
            </div>

            <div className="map-locations-grid">
              {filteredLocations.map((ubicacion, index) => (
                <div
                  key={index}
                  className="location-card"
                  onClick={() => handleSelectLocation(ubicacion)}
                >
                  <div className="location-card-header">
                    <h4>{ubicacion.nombre}</h4>
                    <span className="location-badge">{ubicacion.codigoPostal}</span>
                  </div>
                  <p className="location-address">📍 {ubicacion.direccion}</p>
                  <div className="location-coords">
                    📌 {ubicacion.lat.toFixed(4)}, {ubicacion.lng.toFixed(4)}
                  </div>
                </div>
              ))}
            </div>

            {filteredLocations.length === 0 && (
              <div className="no-results">
                <p>❌ No se encontraron ubicaciones</p>
                <small>Intenta con otro término de búsqueda</small>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MapSelector;
