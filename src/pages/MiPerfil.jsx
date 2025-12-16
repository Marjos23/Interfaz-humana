import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faCalendar,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import MapSelector from "../components/MapSelector";
import "../styles.css";

const MiPerfil = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    ubicacion: null,
    fechaNacimiento: "",
  });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [previewFoto, setPreviewFoto] = useState(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      setCurrentUser(user);
      setFormData({
        nombre: user.nombre || "",
        email: user.email || "",
        telefono: user.telefono || "",
        ubicacion: user.direccion
          ? {
              direccion: user.direccion || "",
              codigoPostal: user.codigoPostal || "",
              lat: user.latitud || -0.9536,
              lng: user.longitud || -80.7286,
            }
          : null,
        fechaNacimiento: user.fechaNacimiento || "",
      });
      setPreviewFoto(user.fotoPerfil || null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Verificar tamaño (máximo 2MB)
      if (file.size > 2 * 1024 * 1024) {
        Swal.fire({
          title: "Archivo muy grande",
          text: "La imagen debe ser menor a 2MB",
          icon: "warning",
          confirmButtonText: "Aceptar",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewFoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Actualizar usuario en la API
      const updatedUser = {
        ...currentUser,
        nombre: formData.nombre,
        email: formData.email,
        telefono: formData.telefono,
        direccion: formData.ubicacion?.direccion || "",
        codigoPostal: formData.ubicacion?.codigoPostal || "",
        latitud: formData.ubicacion?.lat || null,
        longitud: formData.ubicacion?.lng || null,
        fechaNacimiento: formData.fechaNacimiento,
        fotoPerfil: previewFoto || currentUser.fotoPerfil,
      };

      // Como json-server usa IDs, actualizamos solo si tenemos el ID
      if (currentUser.id) {
        await fetch(`http://localhost:3001/usuarios/${currentUser.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedUser),
        });
      }

      // Actualizar localStorage
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      setEditing(false);

      Swal.fire({
        title: "¡Actualizado!",
        text: "Tu perfil ha sido actualizado correctamente",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
    } catch (error) {
      console.error("Error actualizando perfil:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo actualizar tu perfil. Intenta nuevamente.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <main className="main-content">
        <div className="page-header">
          <h2>Mi Perfil</h2>
        </div>
        <p>Cargando información del perfil...</p>
      </main>
    );
  }

  return (
    <main className="main-content perfil-page">
      <div className="page-header">
        <h2>👤 Mi Perfil</h2>
        <button
          className={editing ? "btn-secondary" : "btn-primary"}
          onClick={() => setEditing(!editing)}
        >
          {editing ? "Cancelar" : "Editar Perfil"}
        </button>
      </div>
      <div className="perfil-content-wrapper">
        {/* Información del perfil */}
        <div className="perfil-card perfil-header-card">
          <div className="perfil-avatar-container">
            {previewFoto ? (
              <img
                src={previewFoto}
                alt="Foto de perfil"
                className="perfil-avatar"
              />
            ) : (
              <div className="perfil-avatar-placeholder">
                {currentUser.nombre?.charAt(0).toUpperCase() || "U"}
              </div>
            )}
            {editing && (
              <label htmlFor="foto-upload" className="perfil-upload-btn">
                📷
                <input
                  id="foto-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFotoChange}
                  style={{ display: "none" }}
                />
              </label>
            )}
          </div>
          <h2 className="perfil-nombre">{currentUser.nombre}</h2>
          <p className="perfil-email">{currentUser.email}</p>
          <span
            className={`perfil-rol-badge ${
              currentUser.rol === "admin" ? "admin" : "ciudadano"
            }`}
          >
            {currentUser.rol === "admin" ? "👑 Administrador" : "👤 Ciudadano"}
          </span>
        </div>
        {/* Formulario de datos */}
        <div className="perfil-card">
          <h3 className="perfil-section-title">Información Personal</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                <FontAwesomeIcon icon={faUser} /> Nombre Completo
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                disabled={!editing}
                required
              />
            </div>

            <div className="form-group">
              <label>
                <FontAwesomeIcon icon={faEnvelope} /> Correo Electrónico
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!editing}
                required
              />
            </div>

            <div className="perfil-form-row">
              <div className="form-group">
                <label>
                  <FontAwesomeIcon icon={faPhone} /> Teléfono
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  disabled={!editing}
                  placeholder="0987654321"
                />
              </div>

              <div className="form-group">
                <label>
                  <FontAwesomeIcon icon={faCalendar} /> Fecha de Nacimiento
                </label>
                <input
                  type="date"
                  name="fechaNacimiento"
                  value={formData.fechaNacimiento}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>
            </div>

            <div className="form-group">
              <label>
                <FontAwesomeIcon icon={faMapMarkerAlt} /> Ubicación en Manta
              </label>
              <MapSelector
                value={formData.ubicacion}
                onChange={(ubicacion) =>
                  setFormData({ ...formData, ubicacion })
                }
                disabled={!editing}
              />
            </div>

            {editing && (
              <div className="form-actions">
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={loading}
                >
                  <FontAwesomeIcon icon={faSave} />{" "}
                  {loading ? "Guardando..." : "Guardar Cambios"}
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Información adicional */}
        <div className="perfil-card">
          <h3 className="perfil-section-title">Información de la Cuenta</h3>
          <div className="perfil-info-grid">
            <div className="perfil-info-item">
              <strong>Rol:</strong>
              <p>
                {currentUser.rol === "admin"
                  ? "Administrador Municipal"
                  : "Ciudadano"}
              </p>
            </div>
            <div className="perfil-info-item">
              <strong>Fecha de Registro:</strong>
              <p>{currentUser.fechaRegistro || "N/A"}</p>
            </div>
            <div className="perfil-info-item">
              <strong>Cédula:</strong>
              <p>{currentUser.cedula || "No especificada"}</p>
            </div>
            <div className="perfil-info-item active">
              <strong>Estado:</strong>
              <p>✓ Activo</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MiPerfil;
