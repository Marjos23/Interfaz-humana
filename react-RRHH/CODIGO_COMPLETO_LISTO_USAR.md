# 💻 CÓDIGO LISTO PARA COPIAR - Encuesta, Votaciones, Reportes, Propuestas

## 🔥 ENCUESTA.JSX - Código Completo

```jsx
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faTimes,
  faSmile,
  faComment,
} from "@fortawesome/free-solid-svg-icons";

const Encuesta = () => {
  const [respuestas, setRespuestas] = useState({
    pregunta1: "",
    pregunta2: 0,
    pregunta3: "",
  });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (field, value) => {
    setRespuestas({ ...respuestas, [field]: value });
  };

  const handleStarClick = (rating) => {
    setRespuestas({ ...respuestas, pregunta2: rating });
  };

  const handleSubmit = async () => {
    console.log("Respuestas enviadas:", respuestas);
    setEnviado(true);
    setTimeout(() => {
      handleReset();
      setEnviado(false);
    }, 2000);
  };

  const handleReset = () => {
    setRespuestas({
      pregunta1: "",
      pregunta2: 0,
      pregunta3: "",
    });
  };

  return (
    <div className="encuesta-container">
      {/* HEADER */}
      <div className="encuesta-header">
        <h1>📊 Encuesta de Satisfacción</h1>
        <p>Tu opinión es importante para mejorar nuestros servicios</p>
      </div>

      {/* PREGUNTA 1 - OPCIÓN MÚLTIPLE */}
      <div className="encuesta-section">
        <div className="encuesta-question">
          <div className="encuesta-question-title">
            <div className="encuesta-question-number">1</div>
            ¿Cómo fue tu experiencia general?
          </div>

          <div className="encuesta-option">
            <input
              type="radio"
              id="opt1"
              name="pregunta1"
              value="excelente"
              checked={respuestas.pregunta1 === "excelente"}
              onChange={(e) => handleChange("pregunta1", e.target.value)}
            />
            <label htmlFor="opt1">⭐ Excelente - Superó mis expectativas</label>
          </div>

          <div className="encuesta-option">
            <input
              type="radio"
              id="opt2"
              name="pregunta1"
              value="buena"
              checked={respuestas.pregunta1 === "buena"}
              onChange={(e) => handleChange("pregunta1", e.target.value)}
            />
            <label htmlFor="opt2">😊 Buena - Cumplió mis expectativas</label>
          </div>

          <div className="encuesta-option">
            <input
              type="radio"
              id="opt3"
              name="pregunta1"
              value="regular"
              checked={respuestas.pregunta1 === "regular"}
              onChange={(e) => handleChange("pregunta1", e.target.value)}
            />
            <label htmlFor="opt3">😐 Regular - Algo puede mejorar</label>
          </div>

          <div className="encuesta-option">
            <input
              type="radio"
              id="opt4"
              name="pregunta1"
              value="mala"
              checked={respuestas.pregunta1 === "mala"}
              onChange={(e) => handleChange("pregunta1", e.target.value)}
            />
            <label htmlFor="opt4">😞 Mala - No cumplió mis expectativas</label>
          </div>
        </div>
      </div>

      {/* PREGUNTA 2 - RATING CON ESTRELLAS */}
      <div className="encuesta-section">
        <div className="encuesta-question">
          <div className="encuesta-question-title">
            <div className="encuesta-question-number">2</div>
            Califica la calidad del servicio (1-5 estrellas)
          </div>

          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((num) => (
              <span
                key={num}
                className={`star ${respuestas.pregunta2 >= num ? "active" : ""}`}
                onClick={() => handleStarClick(num)}
                title={`${num} estrellas`}
              >
                ⭐
              </span>
            ))}
          </div>
          <p style={{ marginTop: "1rem", color: "#666", fontSize: "0.9rem" }}>
            {respuestas.pregunta2 > 0 && `Has calificado con ${respuestas.pregunta2} estrellas`}
          </p>
        </div>
      </div>

      {/* PREGUNTA 3 - TEXTAREA */}
      <div className="encuesta-section">
        <div className="encuesta-question">
          <div className="encuesta-question-title">
            <div className="encuesta-question-number">3</div>
            Cuéntanos tus comentarios y sugerencias
          </div>

          <textarea
            className="textarea-survey"
            placeholder="📝 Escribe tus sugerencias aquí... Queremos saber qué podemos mejorar para servirte mejor"
            value={respuestas.pregunta3}
            onChange={(e) => handleChange("pregunta3", e.target.value)}
          />
        </div>
      </div>

      {/* BOTONES */}
      <div className="encuesta-section">
        <div className="btn-group-survey">
          <button
            className="btn-submit-survey"
            onClick={handleSubmit}
            disabled={!respuestas.pregunta1 || respuestas.pregunta2 === 0}
          >
            ✅ Enviar Respuestas
          </button>
          <button className="btn-reset-survey" onClick={handleReset}>
            🔄 Limpiar Formulario
          </button>
        </div>
      </div>

      {/* MENSAJE DE ÉXITO */}
      {enviado && (
        <div className="success-message">
          ✅ ¡Gracias por tu participación! Tu opinión nos ayuda a mejorar.
        </div>
      )}
    </div>
  );
};

export default Encuesta;
```

---

## 🗳️ VOTACIONES.JSX - Código Completo

```jsx
import React, { useState, useEffect } from "react";

const Votaciones = () => {
  const [votaciones, setVotaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de votaciones
    setTimeout(() => {
      setVotaciones([
        {
          id: 1,
          titulo: "¿Cuál es el mejor parque de Manta?",
          descripcion:
            "Vota por tu parque favorito para conocer las preferencias ciudadanas",
          estado: "En Votación",
          opciones: [
            { id: 1, titulo: "Parque Cenareo", votos: 234, total: 1000 },
            { id: 2, titulo: "Parque San Pedro", votos: 456, total: 1000 },
            { id: 3, titulo: "Parque Del Barrio", votos: 189, total: 1000 },
            { id: 4, titulo: "Parque Universitario", votos: 121, total: 1000 },
          ],
          votoActual: null,
          diasRestantes: 5,
        },
        {
          id: 2,
          titulo: "Presupuesto para infraestructura",
          descripcion: "Ayúdanos a decidir en dónde invertir el presupuesto municipal",
          estado: "En Votación",
          opciones: [
            { id: 1, titulo: "Vías y transportes", votos: 567, total: 2000 },
            { id: 2, titulo: "Educación y deporte", votos: 892, total: 2000 },
            { id: 3, titulo: "Salud y ambiente", votos: 541, total: 2000 },
          ],
          votoActual: null,
          diasRestantes: 3,
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleVotar = (votacionId, opcionId) => {
    setVotaciones(
      votaciones.map((v) =>
        v.id === votacionId ? { ...v, votoActual: opcionId } : v
      )
    );
  };

  const handleConfirmarVoto = (votacionId) => {
    const votacion = votaciones.find((v) => v.id === votacionId);
    if (votacion.votoActual) {
      alert(`✅ Voto confirmado en: ${votacion.opciones.find(o => o.id === votacion.votoActual).titulo}`);
    }
  };

  if (loading) {
    return <div style={{ textAlign: "center", padding: "3rem" }}>Cargando votaciones...</div>;
  }

  return (
    <div className="votaciones-container">
      {/* HEADER */}
      <div className="votaciones-header">
        <h1>🗳️ Votaciones Ciudadanas</h1>
        <p>Participa en las decisiones de tu ciudad</p>
      </div>

      {/* TARJETAS DE VOTACIONES */}
      {votaciones.map((votacion) => (
        <div key={votacion.id} className="votacion-card">
          <div className="votacion-card-header">
            <h2 className="votacion-card-title">{votacion.titulo}</h2>
            <div className="votacion-card-status">{votacion.estado}</div>
          </div>

          <p className="votacion-card-description">{votacion.descripcion}</p>

          {/* OPCIONES DE VOTO */}
          <div className="votacion-options">
            {votacion.opciones.map((opcion) => {
              const porcentaje = ((opcion.votos / opcion.total) * 100).toFixed(1);
              return (
                <div
                  key={opcion.id}
                  className="votacion-option"
                  onClick={() => handleVotar(votacion.id, opcion.id)}
                >
                  <input
                    type="radio"
                    name={`votacion-${votacion.id}`}
                    value={opcion.id}
                    checked={votacion.votoActual === opcion.id}
                    onChange={() => handleVotar(votacion.id, opcion.id)}
                  />

                  <div className="votacion-option-content">
                    <div className="votacion-option-title">{opcion.titulo}</div>
                    <div className="votacion-option-votes">
                      {opcion.votos} votos ({porcentaje}%)
                    </div>
                    <div className="votacion-option-progress">
                      <div
                        className="votacion-option-bar"
                        style={{ width: `${porcentaje}%` }}
                      />
                    </div>
                  </div>

                  <span style={{ fontWeight: "700", marginLeft: "1rem", minWidth: "50px" }}>
                    {opcion.votos}
                  </span>
                </div>
              );
            })}
          </div>

          {/* FOOTER */}
          <div className="votacion-footer">
            <div className="votacion-time">
              ⏱️ {votacion.diasRestantes} día{votacion.diasRestantes > 1 ? "s" : ""} restantes
            </div>
            <button
              className="votacion-btn"
              disabled={votacion.votoActual === null}
              onClick={() => handleConfirmarVoto(votacion.id)}
            >
              ✅ Confirmar Voto
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Votaciones;
```

---

## 📊 REPORTES.JSX - Código Completo

```jsx
import React, { useState, useEffect } from "react";

const Reportes = () => {
  const [estadisticas, setEstadisticas] = useState([]);
  const [detalles, setDetalles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setEstadisticas([
        { id: 1, icon: "👥", valor: "2,456", label: "Ciudadanos Registrados", trend: "+12%" },
        { id: 2, icon: "💡", valor: "342", label: "Propuestas Activas", trend: "+8%" },
        { id: 3, icon: "🗳️", valor: "1,234", label: "Votos Registrados", trend: "+25%" },
        { id: 4, icon: "📅", valor: "28", label: "Eventos Próximos", trend: "-5%" },
      ]);

      setDetalles([
        {
          id: 1,
          fecha: "2024-10-29",
          tipo: "Propuesta",
          titulo: "Mejora de vías públicas en zona norte",
          estado: "Aceptada",
          votos: 456,
        },
        {
          id: 2,
          fecha: "2024-10-28",
          tipo: "Votación",
          titulo: "Presupuesto municipal 2025",
          estado: "En Votación",
          votos: 892,
        },
        {
          id: 3,
          fecha: "2024-10-27",
          tipo: "Evento",
          titulo: "Cabildo abierto - Sector costero",
          estado: "Realizado",
          votos: 234,
        },
        {
          id: 4,
          fecha: "2024-10-26",
          tipo: "Propuesta",
          titulo: "Programa de reciclaje comunitario",
          estado: "En Revisión",
          votos: 567,
        },
      ]);

      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return <div style={{ textAlign: "center", padding: "3rem" }}>Cargando reportes...</div>;
  }

  return (
    <div className="reportes-container">
      {/* HEADER */}
      <div className="reportes-header">
        <h1>📊 Reportes y Estadísticas</h1>
        <p>Vista general de la participación ciudadana en Manta</p>
      </div>

      {/* GRID DE ESTADÍSTICAS */}
      <div className="reportes-grid">
        {estadisticas.map((stat) => {
          const isTrendDown = stat.trend.includes("-");
          return (
            <div key={stat.id} className="reporte-card">
              <div className="reporte-card-icon">{stat.icon}</div>
              <div className="reporte-card-value">{stat.valor}</div>
              <div className="reporte-card-label">{stat.label}</div>
              <div className={`reporte-card-trend ${isTrendDown ? "down" : ""}`}>
                {isTrendDown ? "📉" : "📈"} {stat.trend}
              </div>
            </div>
          );
        })}
      </div>

      {/* TABLA DE DETALLES */}
      <div className="reportes-table">
        <table>
          <thead>
            <tr>
              <th>📅 Fecha</th>
              <th>📂 Tipo</th>
              <th>📝 Título</th>
              <th>✅ Estado</th>
              <th>🗳️ Votos</th>
            </tr>
          </thead>
          <tbody>
            {detalles.map((detalle) => {
              let estadoColor = "#6c757d";
              if (detalle.estado === "Aceptada") estadoColor = "#28a745";
              if (detalle.estado === "En Votación") estadoColor = "#667eea";
              if (detalle.estado === "En Revisión") estadoColor = "#ffc107";

              return (
                <tr key={detalle.id}>
                  <td>{detalle.fecha}</td>
                  <td>{detalle.tipo}</td>
                  <td>{detalle.titulo}</td>
                  <td>
                    <span
                      style={{
                        background: estadoColor,
                        color: "white",
                        padding: "0.3rem 0.8rem",
                        borderRadius: "20px",
                        fontSize: "0.85rem",
                        fontWeight: "600",
                        display: "inline-block",
                      }}
                    >
                      {detalle.estado}
                    </span>
                  </td>
                  <td style={{ fontWeight: "700", color: "#667eea" }}>
                    {detalle.votos}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reportes;
```

---

## 💡 PROPUESTAS.JSX - Código Mejorado

```jsx
import React, { useState, useEffect } from "react";

const Propuestas = () => {
  const [filtro, setFiltro] = useState("todas");
  const [propuestas, setPropuestas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de propuestas
    setTimeout(() => {
      setPropuestas([
        {
          id: 1,
          titulo: "Mejorar iluminación en parques",
          descripcion:
            "Instalar nuevas luminarias LED en los parques principales de la ciudad para mejorar la seguridad nocturna y permitir actividades vespertinas.",
          autor: "Juan García",
          fecha: "2024-10-29",
          categoria: "Infraestructura",
          votos: 234,
          estado: "Activa",
        },
        {
          id: 2,
          titulo: "Programa de reciclaje comunitario",
          descripcion:
            "Implementar puntos de reciclaje en barrios estratégicos para promover la sostenibilidad ambiental y educación verde.",
          autor: "María López",
          fecha: "2024-10-28",
          categoria: "Ambiente",
          votos: 189,
          estado: "Activa",
        },
        {
          id: 3,
          titulo: "Clases de programación gratuitas",
          descripcion:
            "Ofrecer talleres de programación e informática para jóvenes de la comunidad y mejorar oportunidades laborales.",
          autor: "Carlos Rodríguez",
          fecha: "2024-10-27",
          categoria: "Educación",
          votos: 342,
          estado: "Cerrada",
        },
        {
          id: 4,
          titulo: "Ciclovías seguras en el centro",
          descripcion:
            "Crear ciclovías protegidas en las principales avenidas del centro para promover transporte sostenible.",
          autor: "Ana Martínez",
          fecha: "2024-10-26",
          categoria: "Transporte",
          votos: 567,
          estado: "Activa",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const propuestasFiltradas = propuestas.filter((p) => {
    if (filtro === "todas") return true;
    if (filtro === "activas") return p.estado === "Activa";
    if (filtro === "mas-votadas") return p.votos > 300;
    if (filtro === "cerradas") return p.estado === "Cerrada";
    return true;
  });

  if (loading) {
    return <div style={{ textAlign: "center", padding: "3rem" }}>Cargando propuestas...</div>;
  }

  return (
    <div className="propuestas-container-v2">
      {/* HEADER */}
      <div className="propuestas-header-v2">
        <h1>💡 Propuestas Ciudadanas</h1>
        <p>Comparte tus ideas para mejorar Manta y vota por las de otros</p>
      </div>

      {/* FILTROS */}
      <div className="propuestas-filters-v2">
        {["todas", "activas", "mas-votadas", "cerradas"].map((f) => (
          <button
            key={f}
            className={`filter-btn-v2 ${filtro === f ? "active" : ""}`}
            onClick={() => setFiltro(f)}
          >
            {f === "todas" && "Todas"}
            {f === "activas" && "Activas"}
            {f === "mas-votadas" && "Más Votadas"}
            {f === "cerradas" && "Cerradas"}
          </button>
        ))}
      </div>

      {/* GRID DE PROPUESTAS */}
      <div className="propuestas-grid-v2">
        {propuestasFiltradas.map((propuesta) => (
          <div key={propuesta.id} className="propuesta-card-v2">
            <div className="propuesta-card-header-v2">
              <h3 className="propuesta-card-title-v2">{propuesta.titulo}</h3>
              <span className="propuesta-card-category">{propuesta.categoria}</span>
            </div>

            <div className="propuesta-card-body">
              <div className="propuesta-card-meta-v2">
                <span>👤 {propuesta.autor}</span>
                <span>📅 {propuesta.fecha}</span>
                <span>{propuesta.estado === "Activa" ? "🟢" : "🔴"} {propuesta.estado}</span>
              </div>

              <p className="propuesta-card-description-v2">
                {propuesta.descripcion}
              </p>
            </div>

            <div className="propuesta-card-footer-v2">
              <div className="propuesta-votes-v2">
                👍 {propuesta.votos} votos
              </div>
              <button className="propuesta-btn-v2">Ver Detalles</button>
            </div>
          </div>
        ))}
      </div>

      {propuestasFiltradas.length === 0 && (
        <div style={{ textAlign: "center", padding: "3rem", color: "#999" }}>
          No hay propuestas que coincidan con el filtro seleccionado
        </div>
      )}
    </div>
  );
};

export default Propuestas;
```

---

## 📋 Checklist de Implementación

- [ ] Copiar `Encuesta.jsx` completo
- [ ] Copiar `Votaciones.jsx` completo
- [ ] Copiar `Reportes.jsx` completo
- [ ] Copiar `Propuestas.jsx` mejorado
- [ ] Verificar que no hay errores de sintaxis
- [ ] Ejecutar `npm run dev`
- [ ] Navegar a cada página en navegador
- [ ] Verificar que los estilos se ven correctamente

---

## 🎨 Colores de Referencia

```javascript
// Encuesta
const ENCUESTA_PRIMARY = "#667eea";
const ENCUESTA_SECONDARY = "#764ba2";

// Votaciones
const VOTACIONES_PRIMARY = "#f093fb";
const VOTACIONES_SECONDARY = "#f5576c";

// Reportes
const REPORTES_PRIMARY = "#4facfe";
const REPORTES_SECONDARY = "#00f2fe";

// Propuestas
const PROPUESTAS_PRIMARY = "#fa709a";
const PROPUESTAS_SECONDARY = "#fee140";
```

---

**¡Código listo para usar! 🚀✨**
