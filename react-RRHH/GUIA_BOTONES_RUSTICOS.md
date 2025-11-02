# 🎨 GUÍA BOTONES RÚSTICOS MEJORADOS

## 🚀 Características de los Botones

Los botones ahora tienen:
- ✅ **Gradientes bonitos** con efectos de brillo
- ✅ **Efecto ripple** al hacer clic
- ✅ **Efecto hover** profesional con elevación
- ✅ **Bordes rústicos** con sombras internas
- ✅ **Transiciones suaves** de 0.3s
- ✅ **Múltiples variantes** de color
- ✅ **Tamaños flexibles** (sm, normal, lg)
- ✅ **Responsivos** en todos los dispositivos
- ✅ **Accesibles** con estados disabled

---

## 📋 Clases Disponibles

### Colores Primarios

```html
<!-- Azul Marino (Manta) -->
<button class="btn-rustico-primary">Enviar</button>

<!-- Naranja (Acento) -->
<button class="btn-rustico-secondary">Cancelar</button>

<!-- Verde (Éxito) -->
<button class="btn-rustico-success">Guardar</button>

<!-- Rojo (Peligro) -->
<button class="btn-rustico-danger">Eliminar</button>

<!-- Cian (Información) -->
<button class="btn-rustico-info">Más Info</button>

<!-- Outline (Transparente) -->
<button class="btn-rustico-outline">Volver</button>
```

### Tamaños

```html
<!-- Pequeño -->
<button class="btn-rustico-primary btn-rustico-sm">Pequeño</button>

<!-- Normal (por defecto) -->
<button class="btn-rustico-primary">Normal</button>

<!-- Grande -->
<button class="btn-rustico-primary btn-rustico-lg">Grande</button>

<!-- Bloque (ancho completo) -->
<button class="btn-rustico-primary btn-rustico-block">Bloque</button>
```

### Con Iconos

```html
<!-- Primario con ícono -->
<button class="btn-rustico-primary btn-rustico-icon">
  <i class="fas fa-save"></i>
  Guardar
</button>

<!-- Secundario con ícono -->
<button class="btn-rustico-secondary btn-rustico-icon">
  <i class="fas fa-times"></i>
  Cancelar
</button>

<!-- Éxito con ícono -->
<button class="btn-rustico-success btn-rustico-icon">
  <i class="fas fa-check"></i>
  Confirmar
</button>
```

---

## 💻 Ejemplos de Código en React

### Botones Individuales

```jsx
import React from "react";

export const BotonesEjemplo = () => {
  const handleClick = (texto) => {
    alert(`Botón: ${texto}`);
  };

  return (
    <div style={{ padding: "2rem", gap: "1rem", display: "flex", flexDirection: "column" }}>
      {/* Primario */}
      <button className="btn-rustico-primary" onClick={() => handleClick("Primario")}>
        ✅ Enviar
      </button>

      {/* Secundario */}
      <button className="btn-rustico-secondary" onClick={() => handleClick("Secundario")}>
        🔙 Volver
      </button>

      {/* Éxito */}
      <button className="btn-rustico-success" onClick={() => handleClick("Éxito")}>
        💾 Guardar
      </button>

      {/* Peligro */}
      <button className="btn-rustico-danger" onClick={() => handleClick("Peligro")}>
        🗑️ Eliminar
      </button>

      {/* Información */}
      <button className="btn-rustico-info" onClick={() => handleClick("Info")}>
        ℹ️ Más Info
      </button>

      {/* Outline */}
      <button className="btn-rustico-outline" onClick={() => handleClick("Outline")}>
        📌 Outline
      </button>
    </div>
  );
};
```

### Grupo de Botones

```jsx
export const GrupoBotones = () => {
  const handleSubmit = () => alert("✅ Enviado!");
  const handleCancel = () => alert("❌ Cancelado");

  return (
    <div className="btn-group-rustico">
      <button className="btn-rustico-primary" onClick={handleSubmit}>
        ✅ Enviar
      </button>
      <button className="btn-rustico-secondary" onClick={handleCancel}>
        ❌ Cancelar
      </button>
    </div>
  );
};
```

### Botones con Estados

```jsx
export const BotonesEstados = () => {
  const [loading, setLoading] = React.useState(false);
  const [enviado, setEnviado] = React.useState(false);

  const handleEnviar = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setEnviado(true);
      setTimeout(() => setEnviado(false), 2000);
    }, 1500);
  };

  return (
    <div style={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
      {/* Botón Normal */}
      <button className="btn-rustico-primary" onClick={handleEnviar} disabled={loading || enviado}>
        {loading ? "⏳ Enviando..." : enviado ? "✅ Enviado!" : "Enviar"}
      </button>

      {/* Botón Deshabilitado */}
      <button className="btn-rustico-secondary" disabled>
        ❌ Deshabilitado
      </button>

      {/* Botón con Pulse */}
      <button className="btn-rustico-success btn-pulse">
        💨 Importante
      </button>
    </div>
  );
};
```

### Formulario Completo

```jsx
export const FormularioConBotones = () => {
  const [formData, setFormData] = React.useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
    alert("✅ Formulario enviado correctamente!");
    setFormData({ nombre: "", email: "", mensaje: "" });
  };

  const handleReset = () => {
    setFormData({ nombre: "", email: "", mensaje: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "2rem auto" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "0.8rem",
            borderRadius: "6px",
            border: "2px solid #ddd",
            marginTop: "0.5rem",
          }}
        />
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "0.8rem",
            borderRadius: "6px",
            border: "2px solid #ddd",
            marginTop: "0.5rem",
          }}
        />
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <label>Mensaje:</label>
        <textarea
          name="mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          required
          rows="4"
          style={{
            width: "100%",
            padding: "0.8rem",
            borderRadius: "6px",
            border: "2px solid #ddd",
            marginTop: "0.5rem",
            fontFamily: "inherit",
          }}
        />
      </div>

      {/* Grupo de Botones */}
      <div className="btn-group-rustico">
        <button type="submit" className="btn-rustico-primary btn-rustico-icon">
          <span>✅</span>
          Enviar
        </button>
        <button type="button" className="btn-rustico-secondary btn-rustico-icon" onClick={handleReset}>
          <span>🔄</span>
          Limpiar
        </button>
      </div>
    </form>
  );
};
```

---

## 🎨 Paleta de Colores

```javascript
// Primario (Azul Marino)
Gradiente: #003d7a → #0066cc → #003d7a
Borde: #002d5c
Hover: #0066cc → #0052a3 → #0066cc

// Secundario (Naranja)
Gradiente: #ff6600 → #ff9500 → #ff6600
Borde: #e55100
Hover: #ff9500 → #ffb300 → #ff9500

// Éxito (Verde)
Gradiente: #28a745 → #20c997 → #28a745
Borde: #1e7e34
Hover: #20c997 → #17a2b8 → #20c997

// Peligro (Rojo)
Gradiente: #dc3545 → #ff5566 → #dc3545
Borde: #a32e3d
Hover: #ff5566 → #ff6b7a → #ff5566

// Información (Cian)
Gradiente: #17a2b8 → #0dcaf0 → #17a2b8
Borde: #117a8b
Hover: #0dcaf0 → #0a9fb5 → #0dcaf0
```

---

## ✨ Efectos Especiales

### Ripple Effect
Al hacer clic, se produce un efecto de onda que se expande desde el centro.

```html
<button class="btn-rustico-primary">Haz clic para ver el efecto</button>
```

### Efecto Hover
Al pasar el mouse, el botón se eleva, cambia de color y el espaciado de letras aumenta.

```css
/* Se activa automáticamente en hover */
transform: translateY(-3px);
letter-spacing: 1.2px;
```

### Animación Pulse
Ideal para botones importantes que necesitan atención.

```html
<button class="btn-rustico-primary btn-pulse">🔔 Importante</button>
```

---

## 📱 Responsividad

Los botones se adaptan automáticamente:

- **Desktop**: Tamaño completo con padding amplio
- **Tablet (768px)**: Tamaño medio con ajustes
- **Mobile (480px)**: Tamaño pequeño, ancho completo

---

## 🔧 Cómo Implementar en tu Proyecto

### 1. En componentes existentes

Reemplaza tus botones actuales:

```jsx
// ANTES
<button>Enviar</button>

// DESPUÉS
<button className="btn-rustico-primary">Enviar</button>
```

### 2. En formularios

```jsx
<form>
  {/* campos del formulario */}
  
  <div className="btn-group-rustico">
    <button type="submit" className="btn-rustico-primary">
      ✅ Enviar
    </button>
    <button type="reset" className="btn-rustico-secondary">
      🔄 Limpiar
    </button>
  </div>
</form>
```

### 3. En modales/diálogos

```jsx
<div className="modal-footer">
  <div className="btn-group-rustico">
    <button className="btn-rustico-success">Aceptar</button>
    <button className="btn-rustico-danger">Cancelar</button>
  </div>
</div>
```

---

## ✅ Checklist de Implementación

- [ ] Revisar los botones en cada página
- [ ] Reemplazar clases de botones antiguos
- [ ] Usar `btn-rustico-*` en lugar de `btn-*`
- [ ] Añadir iconos con `btn-rustico-icon`
- [ ] Probar en Desktop, Tablet y Mobile
- [ ] Verificar efectos hover y click
- [ ] Testear estados disabled
- [ ] Validar con ESLint

---

## 🎯 Ejemplos de Uso en Páginas

### Encuesta.jsx
```jsx
<div className="btn-group-rustico">
  <button className="btn-rustico-primary btn-rustico-block">
    ✅ Enviar Respuestas
  </button>
  <button className="btn-rustico-secondary btn-rustico-block">
    🔄 Limpiar Formulario
  </button>
</div>
```

### Votaciones.jsx
```jsx
<button 
  className="btn-rustico-primary"
  disabled={votacion.votoActual === null}
>
  ✅ Confirmar Voto
</button>
```

### Propuestas.jsx
```jsx
<div className="btn-group-rustico">
  {["todas", "activas", "mas-votadas", "cerradas"].map((f) => (
    <button
      key={f}
      className={`btn-rustico-outline ${filtro === f ? "btn-rustico-primary" : ""}`}
    >
      {/* texto del botón */}
    </button>
  ))}
</div>
```

---

**¡Los botones rústicos están listos! 🎨✨**
