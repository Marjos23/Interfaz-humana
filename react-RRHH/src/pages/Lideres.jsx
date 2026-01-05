import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faSearch,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const Lideres = () => {
  const [lideres, setLideres] = useState([]);
  const [filteredLideres, setFilteredLideres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedZona, setSelectedZona] = useState("Todas");
  const [zonas, setZonas] = useState(["Todas"]);

  // Estado para formulario de contacto
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });

  useEffect(() => {
    cargarLideres();
  }, []);

  const cargarLideres = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3001/lideres");
      const data = await response.json();
      setLideres(data);
      setFilteredLideres(data);

      // Extraer zonas únicas
      const zonasUnicas = ["Todas", ...new Set(data.map((l) => l.zona))];
      setZonas(zonasUnicas);
    } catch (error) {
      console.error("Error cargando líderes:", error);
      Swal.fire("Error", "No se pudieron cargar los líderes", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let resultado = lideres;

    // Filtrar por zona
    if (selectedZona !== "Todas") {
      resultado = resultado.filter((l) => l.zona === selectedZona);
    }

    // Filtrar por búsqueda
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      resultado = resultado.filter(
        (l) =>
          l.nombre.toLowerCase().includes(search) ||
          l.cargo.toLowerCase().includes(search) ||
          l.zona.toLowerCase().includes(search) ||
          l.email.toLowerCase().includes(search)
      );
    }

    setFilteredLideres(resultado);
  }, [searchTerm, selectedZona, lideres]);

  const verDetalles = (lider) => {
    Swal.fire({
      title: lider.nombre,
      html: `
        <div style="text-align: left; margin: 1.5rem 0;">
          <div style="margin-bottom: 1rem;">
            <img src="${lider.fotoPerfil}" alt="${lider.nombre}" 
              style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; margin-bottom: 1rem;">
          </div>
          <p><strong>Cargo:</strong> ${lider.cargo}</p>
          <p><strong>Zona:</strong> ${lider.zona}</p>
          <p><strong>Experiencia:</strong> ${lider.experiencia}</p>
          <hr style="margin: 1rem 0;">
          <p><strong>📧 Email:</strong><br/> <a href="mailto:${lider.email}">${lider.email}</a></p>
          <p><strong>📞 Teléfono:</strong><br/> <a href="tel:${lider.telefono}">${lider.telefono}</a></p>
          <p><strong>📍 Dirección:</strong><br/> ${lider.direccion}</p>
        </div>
      `,
      confirmButtonColor: "#3b82f6",
      confirmButtonText: "Cerrar",
      width: "500px",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const enviarContacto = async (e) => {
    e.preventDefault();

    // Validar campos
    if (
      !formData.nombre.trim() ||
      !formData.email.trim() ||
      !formData.asunto.trim() ||
      !formData.mensaje.trim()
    ) {
      Swal.fire("Validación", "Todos los campos son obligatorios", "warning");
      return;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Swal.fire("Validación", "Por favor ingresa un email válido", "warning");
      return;
    }

    try {
      const nuevoContacto = {
        id: Date.now().toString(),
        ...formData,
        liderNombre: "",
        createdAt: new Date().toISOString(),
        leido: false,
      };

      const response = await fetch("http://localhost:3001/contactos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoContacto),
      });

      if (response.ok) {
        Swal.fire(
          "¡Enviado!",
          "Tu mensaje ha sido enviado a los líderes comunitarios",
          "success"
        );
        // Limpiar formulario
        setFormData({
          nombre: "",
          email: "",
          asunto: "",
          mensaje: "",
        });
      } else {
        Swal.fire("Error", "No se pudo enviar el mensaje", "error");
      }
    } catch (error) {
      console.error("Error enviando contacto:", error);
      Swal.fire("Error", "Ocurrió un error al enviar el mensaje", "error");
    }
  };

  return (
    <div className="lideres-container">
      {/* Header */}
      <div className="page-header">
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <FontAwesomeIcon
            icon={faUsers}
            style={{ fontSize: "2rem", color: "#003d7a" }}
          />
          <div>
            <h2>Directorio de Líderes</h2>
            <p style={{ margin: "0.5rem 0 0", color: "#666" }}>
              Contacta con los presidentes barriales y líderes zonales de Manta
            </p>
          </div>
        </div>
      </div>

      {/* Controles */}
      <div className="lideres-controls">
        <div className="search-box">
          <FontAwesomeIcon icon={faSearch} />
          <input
            type="text"
            placeholder="Buscar por nombre, cargo o zona..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-zonas">
          <label>Filtrar por zona:</label>
          <select
            value={selectedZona}
            onChange={(e) => setSelectedZona(e.target.value)}
          >
            {zonas.map((zona) => (
              <option key={zona} value={zona}>
                {zona}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Listado de líderes */}
      {loading ? (
        <div className="loading">Cargando líderes...</div>
      ) : filteredLideres.length === 0 ? (
        <div className="empty-state">
          <FontAwesomeIcon icon={faUsers} />
          <p>No se encontraron líderes con los criterios seleccionados</p>
        </div>
      ) : (
        <div className="lideres-grid">
          {filteredLideres.map((lider) => (
            <div key={lider.id} className="lider-card">
              <div className="lider-header">
                <img
                  src={lider.fotoPerfil}
                  alt={lider.nombre}
                  className="lider-foto"
                />
                <div className="lider-badge">{lider.zona}</div>
              </div>

              <div className="lider-content">
                <h3>{lider.nombre}</h3>
                <p className="lider-cargo">{lider.cargo}</p>

                <div className="lider-meta">
                  <div className="meta-item">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    <span>{lider.zona}</span>
                  </div>
                  <div className="meta-item">
                    <FontAwesomeIcon icon={faEnvelope} />
                    <a href={`mailto:${lider.email}`}>{lider.email}</a>
                  </div>
                  <div className="meta-item">
                    <FontAwesomeIcon icon={faPhone} />
                    <a href={`tel:${lider.telefono}`}>{lider.telefono}</a>
                  </div>
                </div>

                <p className="lider-experiencia">
                  <strong>Experiencia:</strong> {lider.experiencia}
                </p>

                <button
                  className="btn-ver-detalles"
                  onClick={() => verDetalles(lider)}
                >
                  Ver Detalles
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Formulario de contacto */}
      <div className="formulario-contacto-wrapper">
        <div className="formulario-contacto">
          <div className="form-header">
            <FontAwesomeIcon icon={faPaperPlane} />
            <h2>Contacta con nuestros líderes</h2>
            <p>Comparte tu consulta o propuesta con la comunidad</p>
          </div>

          <form onSubmit={enviarContacto} className="contact-form">
            <div className="form-group">
              <label htmlFor="nombre">Nombre Completo</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                placeholder="Tu nombre"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="tu.email@ejemplo.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="asunto">Asunto</label>
              <input
                type="text"
                id="asunto"
                name="asunto"
                value={formData.asunto}
                onChange={handleInputChange}
                placeholder="Tema de tu consulta"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="mensaje">Mensaje</label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleInputChange}
                placeholder="Cuéntanos tu consulta o propuesta..."
                rows="5"
                required
              ></textarea>
            </div>

            <button type="submit" className="btn-enviar-contacto">
              <FontAwesomeIcon icon={faPaperPlane} /> Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Lideres;
