import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faPhone, faMapMarkerAlt, faCalendar, faSave } from "@fortawesome/free-solid-svg-icons";
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
        ubicacion: user.direccion ? {
          direccion: user.direccion || "",
          codigoPostal: user.codigoPostal || "",
          lat: user.latitud || -0.9536,
          lng: user.longitud || -80.7286
        } : null,
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
          confirmButtonText: "Aceptar"
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
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
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
        confirmButtonText: "Aceptar"
      });

    } catch (error) {
      console.error("Error actualizando perfil:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo actualizar tu perfil. Intenta nuevamente.",
        icon: "error",
        confirmButtonText: "Aceptar"
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
      <div className="perfil-content-wrapper" style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Información del perfil */}
        <div className="card" style={{ marginBottom: "2rem", textAlign: "center" }}>
          <div style={{ position: "relative", display: "inline-block" }}>
            {previewFoto ? (
              <img
                src={previewFoto}
                alt="Foto de perfil"
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "4px solid #667eea",
                  margin: "0 auto 1rem",
                }}
              />
            ) : (
              <div
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  margin: "0 auto 1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "3rem",
                  fontWeight: "bold",
                }}
              >
                {currentUser.nombre?.charAt(0).toUpperCase() || "U"}
              </div>
            )}
            {editing && (
              <label
                htmlFor="foto-upload"
                style={{
                  position: "absolute",
                  bottom: "1rem",
                  right: "-10px",
                  background: "#667eea",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "white",
                  fontSize: "1.2rem",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => e.currentTarget.style.background = "#5568d3"}
                onMouseOut={(e) => e.currentTarget.style.background = "#667eea"}
              >
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
          <h2 style={{ marginBottom: "0.5rem" }}>{currentUser.nombre}</h2>
          <h2 style={{ marginBottom: "0.5rem" }}>{currentUser.nombre}</h2>
          <p style={{ color: "#666", marginBottom: "1rem" }}>{currentUser.email}</p>
          <div style={{ display: "inline-block", padding: "0.5rem 1rem", background: currentUser.rol === "admin" ? "#3498db" : "#27ae60", color: "white", borderRadius: "20px", fontSize: "0.9rem" }}>
            {currentUser.rol === "admin" ? "👑 Administrador" : "👤 Ciudadano"}
          </div>
        </div>
        {/* Formulario de datos */}
        <div className="card">
          <h3 style={{ marginBottom: "1.5rem" }}>Información Personal</h3>
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

            <div className="form-row">
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
                onChange={(ubicacion) => setFormData({ ...formData, ubicacion })}
                disabled={!editing}
              />
            </div>

            {editing && (
              <div className="form-actions" style={{ marginTop: "1.5rem" }}>
                <button type="submit" className="btn-primary" disabled={loading}>
                  <FontAwesomeIcon icon={faSave} />{" "}
                  {loading ? "Guardando..." : "Guardar Cambios"}
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Información adicional */}
        <div className="card" style={{ marginTop: "2rem" }}>
          <h3 style={{ marginBottom: "1rem" }}>Información de la Cuenta</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <strong>Rol:</strong>
              <p style={{ color: "#666", marginTop: "0.25rem" }}>
                {currentUser.rol === "admin" ? "Administrador Municipal" : "Ciudadano"}
              </p>
            </div>
            <div>
              <strong>Fecha de Registro:</strong>
              <p style={{ color: "#666", marginTop: "0.25rem" }}>
                {currentUser.fechaRegistro || "N/A"}
              </p>
            </div>
            <div>
              <strong>Cédula:</strong>
              <p style={{ color: "#666", marginTop: "0.25rem" }}>
                {currentUser.cedula || "No especificada"}
              </p>
            </div>
            <div>
              <strong>Estado:</strong>
              <p style={{ color: "#27ae60", marginTop: "0.25rem" }}>
                ✓ Activo
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MiPerfil;
