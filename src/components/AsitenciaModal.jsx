import React from "react";
import { FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";

const AsitenciaModal = ({ isOpen, onClose }) => {
  const [empleados, setEmpleados] = React.useState([]);
  React.useEffect(() => {
    const empleadosGuardados =
      JSON.parse(localStorage.getItem("empleados")) || [];
    setEmpleados(empleadosGuardados);
  }, []);
  const [formData, setFormData] = React.useState({
    empleado: "",
    horaEntrada: "",
    horaSalida: "",
    observaciones: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const asistenciasGuardadas =
        JSON.parse(localStorage.getItem("asistencias")) || [];
      const nuevaAsistencia = {
        ...formData,
        id: asistenciasGuardadas.length + 1,
      };
      localStorage.setItem(
        "asistencias",
        JSON.stringify([...asistenciasGuardadas, nuevaAsistencia])
      );
      Swal.fire({
        title: "Éxito",
        text: "Asistencia registrada correctamente",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      onClose();
    } catch (error) {
      console.error("Error al guardar la asistencia:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo guardar la asistencia.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };
  if (!isOpen) return null;
  return (
    <div className={`modal-overlay`} id="asistencia-modal">
      <div className="modal-content">
        <span className="close-modal" onClick={onClose}>
          <FaTimes />
        </span>
        <h3>Registrar Asistencia</h3>
        <form id="asistencia-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="empleado-asistencia">Empleado*</label>
            <select
              id="empleado-asistencia"
              name="empleado"
              required
              onChange={handleChange}
            >
              <option value="">Seleccione un empleado</option>
              {empleados.map((empleado) => (
                <option key={empleado.id} value={empleado.nombres}>
                  {empleado.nombres} {empleado.apellidos}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="horaEntrada">Hora Entrada*</label>
              <input
                type="time"
                id="horaEntrada"
                name="horaEntrada"
                value={formData.horaEntrada}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="horaSalida">Hora Salida</label>
              <input
                type="time"
                id="horaSalida"
                name="horaSalida"
                value={formData.horaSalida}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="observaciones">Observaciones</label>
            <textarea
              id="observaciones"
              name="observaciones"
              rows="3"
              value={formData.observaciones}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AsitenciaModal;
