# 💻 EJEMPLOS DE BOTONES - CÓDIGO LISTO PARA USAR

## 🎨 Componente: Galería de Botones

```jsx
import React from "react";

export const BotonesDemoCompleta = () => {
  const [mensaje, setMensaje] = React.useState("");

  const handleClick = (tipo) => {
    setMensaje(`✅ Hiciste clic en: ${tipo}`);
    setTimeout(() => setMensaje(""), 2000);
  };

  return (
    <div style={{ padding: "3rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
        🎨 Galería Completa de Botones
      </h1>

      {/* MENSAJE DE FEEDBACK */}
      {mensaje && (
        <div
          style={{
            background: "#28a745",
            color: "white",
            padding: "1rem",
            borderRadius: "8px",
            marginBottom: "2rem",
            textAlign: "center",
            animation: "slideIn 0.3s ease",
          }}
        >
          {mensaje}
        </div>
      )}

      {/* SECCIÓN: COLORES PRIMARIOS */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#003d7a", marginBottom: "1.5rem" }}>
          🎨 Colores Primarios
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
          <button
            className="btn-rustico-primary"
            onClick={() => handleClick("Primario")}
          >
            ✅ Primario
          </button>

          <button
            className="btn-rustico-secondary"
            onClick={() => handleClick("Secundario")}
          >
            🟠 Secundario
          </button>

          <button
            className="btn-rustico-success"
            onClick={() => handleClick("Éxito")}
          >
            💚 Éxito
          </button>

          <button
            className="btn-rustico-danger"
            onClick={() => handleClick("Peligro")}
          >
            ❌ Peligro
          </button>

          <button
            className="btn-rustico-info"
            onClick={() => handleClick("Información")}
          >
            ℹ️ Información
          </button>

          <button
            className="btn-rustico-outline"
            onClick={() => handleClick("Outline")}
          >
            📌 Outline
          </button>
        </div>
      </section>

      {/* SECCIÓN: TAMAÑOS */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#003d7a", marginBottom: "1.5rem" }}>
          📏 Tamaños
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <button className="btn-rustico-primary btn-rustico-sm">
            📌 Pequeño
          </button>

          <button className="btn-rustico-primary">
            ✅ Normal (Default)
          </button>

          <button className="btn-rustico-primary btn-rustico-lg">
            📊 Grande
          </button>

          <button className="btn-rustico-primary btn-rustico-block">
            🎯 Bloque (Ancho Completo)
          </button>
        </div>
      </section>

      {/* SECCIÓN: CON ICONOS */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#003d7a", marginBottom: "1.5rem" }}>
          🎪 Botones con Iconos
        </h2>

        <div className="btn-group-rustico">
          <button className="btn-rustico-primary btn-rustico-icon">
            <span>💾</span>
            Guardar
          </button>

          <button className="btn-rustico-secondary btn-rustico-icon">
            <span>🔄</span>
            Cancelar
          </button>

          <button className="btn-rustico-success btn-rustico-icon">
            <span>✅</span>
            Confirmar
          </button>
        </div>
      </section>

      {/* SECCIÓN: ESTADOS */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#003d7a", marginBottom: "1.5rem" }}>
          🔄 Estados
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
          <button className="btn-rustico-primary">
            ✅ Normal
          </button>

          <button className="btn-rustico-primary" disabled>
            ❌ Deshabilitado
          </button>

          <button className="btn-rustico-success btn-pulse">
            💨 Pulse (Animado)
          </button>

          <button className="btn-rustico-primary" onClick={() => alert("Pulse animated!")}>
            ⚡ Clickeable
          </button>
        </div>
      </section>

      {/* SECCIÓN: GRUPOS */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#003d7a", marginBottom: "1.5rem" }}>
          👥 Grupos de Botones
        </h2>

        <div style={{ marginBottom: "2rem" }}>
          <p style={{ marginBottom: "1rem", color: "#666" }}>
            Horizontal (normal):
          </p>
          <div className="btn-group-rustico">
            <button className="btn-rustico-primary">✅ Enviar</button>
            <button className="btn-rustico-secondary">🔙 Cancelar</button>
            <button className="btn-rustico-danger">🗑️ Eliminar</button>
          </div>
        </div>

        <div>
          <p style={{ marginBottom: "1rem", color: "#666" }}>
            Vertical:
          </p>
          <div className="btn-group-rustico vertical">
            <button className="btn-rustico-primary btn-rustico-block">
              ✅ Guardar Cambios
            </button>
            <button className="btn-rustico-secondary btn-rustico-block">
              🔄 Descartar
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
```

---

## 🎯 Componente: Formulario con Botones

```jsx
import React, { useState } from "react";

export const FormularioMejora = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
    aceptaTerminos: false,
  });

  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simular envío
    setTimeout(() => {
      console.log("Formulario enviado:", formData);
      setEnviado(true);
      setLoading(false);

      setTimeout(() => {
        setFormData({
          nombre: "",
          email: "",
          mensaje: "",
          aceptaTerminos: false,
        });
        setEnviado(false);
      }, 2000);
    }, 1500);
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "2rem auto",
        padding: "2rem",
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
      }}
    >
      <h2 style={{ color: "#003d7a", marginBottom: "1.5rem" }}>
        📝 Formulario de Contacto
      </h2>

      {enviado && (
        <div
          style={{
            background: "linear-gradient(135deg, #28a745, #20c997)",
            color: "white",
            padding: "1.5rem",
            borderRadius: "8px",
            marginBottom: "1.5rem",
            textAlign: "center",
            fontSize: "1.1rem",
            fontWeight: "600",
          }}
        >
          ✅ ¡Gracias! Tu mensaje fue enviado correctamente.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* NOMBRE */}
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#333" }}>
            👤 Nombre Completo
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ingresa tu nombre completo"
            required
            style={{
              width: "100%",
              padding: "0.8rem",
              borderRadius: "6px",
              border: "2px solid #ddd",
              fontSize: "1rem",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* EMAIL */}
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#333" }}>
            ✉️ Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tu.email@ejemplo.com"
            required
            style={{
              width: "100%",
              padding: "0.8rem",
              borderRadius: "6px",
              border: "2px solid #ddd",
              fontSize: "1rem",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* MENSAJE */}
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#333" }}>
            💬 Mensaje
          </label>
          <textarea
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            placeholder="Escribe tu mensaje aquí..."
            required
            rows="5"
            style={{
              width: "100%",
              padding: "0.8rem",
              borderRadius: "6px",
              border: "2px solid #ddd",
              fontSize: "1rem",
              fontFamily: "inherit",
              boxSizing: "border-box",
              resize: "vertical",
            }}
          />
        </div>

        {/* CHECKBOX */}
        <div style={{ marginBottom: "2rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input
            type="checkbox"
            id="terminos"
            name="aceptaTerminos"
            checked={formData.aceptaTerminos}
            onChange={handleChange}
            required
            style={{ width: "18px", height: "18px", cursor: "pointer" }}
          />
          <label htmlFor="terminos" style={{ cursor: "pointer", color: "#666" }}>
            Acepto los términos y condiciones
          </label>
        </div>

        {/* BOTONES */}
        <div className="btn-group-rustico full-width">
          <button
            type="submit"
            className="btn-rustico-primary btn-rustico-icon"
            disabled={loading}
          >
            <span>{loading ? "⏳" : "✅"}</span>
            {loading ? "Enviando..." : "Enviar Mensaje"}
          </button>

          <button
            type="reset"
            className="btn-rustico-secondary btn-rustico-icon"
            disabled={loading}
          >
            <span>🔄</span>
            Limpiar
          </button>
        </div>
      </form>

      <p style={{ marginTop: "1.5rem", textAlign: "center", color: "#999", fontSize: "0.9rem" }}>
        Nos pondremos en contacto pronto.
      </p>
    </div>
  );
};
```

---

## 🗳️ Componente: Modal con Botones

```jsx
import React, { useState } from "react";

export const ModalEjemplo = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [resultado, setResultado] = useState("");

  const handleAceptar = () => {
    setResultado("✅ Aceptaste la acción");
    setTimeout(() => {
      setMostrarModal(false);
      setResultado("");
    }, 1500);
  };

  const handleCancelar = () => {
    setMostrarModal(false);
    setResultado("❌ Cancelaste la acción");
    setTimeout(() => setResultado(""), 1500);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <button className="btn-rustico-primary" onClick={() => setMostrarModal(true)}>
        🪟 Abrir Modal
      </button>

      {resultado && (
        <div
          style={{
            marginTop: "1rem",
            padding: "1rem",
            background: "#f8f9fa",
            borderLeft: "4px solid #0066cc",
            borderRadius: "4px",
          }}
        >
          {resultado}
        </div>
      )}

      {mostrarModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "2rem",
              maxWidth: "400px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
            }}
          >
            <h2 style={{ color: "#003d7a", marginBottom: "1rem" }}>
              ⚠️ Confirmación
            </h2>

            <p style={{ color: "#666", marginBottom: "2rem", lineHeight: "1.6" }}>
              ¿Estás seguro de que deseas continuar con esta acción? Esta operación
              no puede ser reversada.
            </p>

            <div className="btn-group-rustico full-width">
              <button className="btn-rustico-success" onClick={handleAceptar}>
                ✅ Aceptar
              </button>
              <button className="btn-rustico-danger" onClick={handleCancelar}>
                ❌ Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
```

---

## 🎬 Componente: Botones con Animaciones

```jsx
import React, { useState } from "react";

export const BotonesAnimados = () => {
  const [cliks, setCliks] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcesar = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setCliks(cliks + 1);
    setIsProcessing(false);
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2 style={{ color: "#003d7a", marginBottom: "2rem" }}>
        ⚡ Botones Animados
      </h2>

      {/* CONTADOR */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ fontSize: "3rem", fontWeight: "700", color: "#667eea", marginBottom: "1rem" }}>
          {cliks}
        </div>
        <p style={{ color: "#999" }}>Clics realizados</p>
      </div>

      {/* BOTÓN PROCESANDO */}
      <button
        className="btn-rustico-primary btn-rustico-lg"
        onClick={handleProcesar}
        disabled={isProcessing}
        style={{ marginBottom: "2rem" }}
      >
        {isProcessing ? "⏳ Procesando..." : "⚡ Procesar"}
      </button>

      {/* BOTÓN PULSE */}
      <div style={{ marginBottom: "2rem" }}>
        <button className="btn-rustico-success btn-rustico-lg btn-pulse">
          🔔 ¡Importante!
        </button>
        <p style={{ marginTop: "1rem", color: "#999", fontSize: "0.9rem" }}>
          Nota: El botón tiene animación pulse
        </p>
      </div>

      {/* BOTONES MÚLTIPLES */}
      <div className="btn-group-rustico">
        <button className="btn-rustico-primary btn-rustico-sm">📌 Pequeño</button>
        <button className="btn-rustico-primary">✅ Normal</button>
        <button className="btn-rustico-primary btn-rustico-lg">🎯 Grande</button>
      </div>
    </div>
  );
};
```

---

## 📚 Exportar Todos los Componentes

```jsx
// BotonesCompletos.jsx
export { BotonesDemoCompleta } from "./BotonesDemoCompleta";
export { FormularioMejora } from "./FormularioMejora";
export { ModalEjemplo } from "./ModalEjemplo";
export { BotonesAnimados } from "./BotonesAnimados";

// Luego importar en App.jsx:
import { BotonesDemoCompleta } from "./components/BotonesCompletos";

// Y usar:
<BotonesDemoCompleta />
```

---

## ✅ Checklist de Implementación

- [ ] Copiar el código CSS de botones rústicos (Sección 31 en styles.css)
- [ ] Actualizar Encuesta.jsx con botones rústicos
- [ ] Actualizar Votaciones.jsx con botones rústicos
- [ ] Actualizar Propuestas.jsx con botones rústicos
- [ ] Actualizar Reportes.jsx con botones rústicos
- [ ] Probar efectos hover en Desktop
- [ ] Probar ripple effect al hacer clic
- [ ] Verificar responsividad en Tablet
- [ ] Verificar responsividad en Mobile
- [ ] Validar con ESLint

---

**¡Botones listos para usar! 🚀✨**
