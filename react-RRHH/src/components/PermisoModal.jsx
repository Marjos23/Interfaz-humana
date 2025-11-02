import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const ModalPermiso = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    empleado: "",
    tipoPermiso: "",
    fechaInicio: "",
    fechaFin: "",
    motivo: "",
    adjunto: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const permisosGuardados =
      JSON.parse(localStorage.getItem("permisos")) || [];
    const permisoNuevo = {
      ...formData,
      id: permisosGuardados.length + 1,
      adjuntoNombre: formData.adjunto?.name || null,
    };

    localStorage.setItem(
      "permisos",
      JSON.stringify([...permisosGuardados, permisoNuevo])
    );

    alert("Permiso guardado exitosamente.");
    setFormData({
      empleado: "",
      tipoPermiso: "",
      fechaInicio: "",
      fechaFin: "",
      motivo: "",
      adjunto: null,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" id="permiso-modal">
      <div className="modal-content">
        <span className="close-modal" onClick={onClose}>
          <FaTimes />
        </span>
        <h3>Solicitud de Permiso</h3>
        <form id="permiso-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label for="empleado-permiso">Empleado*</label>
            <input
              type="text"
              id="empleado-permiso"
              name="empleado"
              required
              value={formData.empleado}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label for="tipoPermiso">Tipo de Permiso*</label>
            <select
              id="tipoPermiso"
              name="tipoPermiso"
              required
              onChange={handleChange}
            >
              <option value="">Seleccione...</option>
              <option value="personal">Personal</option>
              <option value="medico">Médico</option>
              <option value="vacaciones">Vacaciones</option>
              <option value="capacitacion">Capacitación</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label for="fecha-inicio">Fecha Inicio*</label>
              <input
                type="date"
                id="fechaInicio"
                name="fechaInicio"
                value={formData.fechaInicio}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label for="fechaFin">Fecha Fin*</label>
              <input
                type="date"
                id="fechaFin"
                name="fechaFin"
                value={formData.fechaFin}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label for="motivo">Motivo*</label>
            <textarea
              id="motivo"
              name="motivo"
              rows="3"
              value={formData.motivo}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="form-group" id="adjunto-container">
            <label for="adjunto">Documento Adjunto</label>
            <input
              type="file"
              id="adjunto"
              name="adjunto"
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Enviar Solicitud
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalPermiso;
