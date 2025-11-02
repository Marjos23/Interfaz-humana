# 🎨 BOTONES RÚSTICOS - GALERÍA VISUAL

## 👀 Vista Previa de Botones

### 🔷 PRIMARIO (Azul Marino)

```
┌─────────────────────────────┐
│    ✅ ENVIAR RESPUESTA      │  ← Normal
│   Gradiente: #003d7a→#0066cc│
│   Sombra interna de brillo  │
│   Borde rústico: #002d5c    │
└─────────────────────────────┘
          ↓ Hover
┌─────────────────────────────┐
│    ✅ ENVIAR RESPUESTA      │  ← Levantado (-3px)
│   Colores más claros        │
│   Sombra más pronunciada    │
│   Letras más espaciadas     │
└─────────────────────────────┘
```

### 🟠 SECUNDARIO (Naranja)

```
┌─────────────────────────────┐
│     🔙 VOLVER ATRÁS         │
│   Gradiente: #ff6600→#ff9500│
│   Perfecto para acciones    │
│   secundarias               │
└─────────────────────────────┘
          ↓ Hover
┌─────────────────────────────┐
│     🔙 VOLVER ATRÁS         │  ← Más naranja
│   Transform: translateY(-3px)│
│   Box-shadow: más fuerte    │
└─────────────────────────────┘
```

### 🟢 ÉXITO (Verde)

```
┌─────────────────────────────┐
│      💾 GUARDAR CAMBIOS     │
│   Gradiente: #28a745→#20c997│
│   Para confirmaciones       │
│   y acciones positivas      │
└─────────────────────────────┘
          ↓ Hover
┌─────────────────────────────┐
│      💾 GUARDAR CAMBIOS     │  ← Verde más claro
│   Letter-spacing: 1.2px     │
│   Animación suave 0.3s      │
└─────────────────────────────┘
```

### 🔴 PELIGRO (Rojo)

```
┌─────────────────────────────┐
│      🗑️ ELIMINAR DATO       │
│   Gradiente: #dc3545→#ff5566│
│   Para acciones destructivas│
│   requiere confirmación     │
└─────────────────────────────┘
          ↓ Hover
┌─────────────────────────────┐
│      🗑️ ELIMINAR DATO       │  ← Rojo intenso
│   Warning: ¡cuidado!       │
│   Transición suave 0.3s     │
└─────────────────────────────┘
```

### 🔵 INFORMACIÓN (Cian)

```
┌─────────────────────────────┐
│      ℹ️ MÁS INFORMACIÓN      │
│   Gradiente: #17a2b8→#0dcaf0│
│   Para información adicional│
│   o links/navegación        │
└─────────────────────────────┘
          ↓ Hover
┌─────────────────────────────┐
│      ℹ️ MÁS INFORMACIÓN      │  ← Cian brillante
│   Elevación sutil           │
│   Glow effect 0.25s         │
└─────────────────────────────┘
```

### ⚪ OUTLINE (Transparente)

```
┌─────────────────────────────┐
│   ┌─────────────────────┐   │
│   │  📌 VOLVER ATRÁS   │   │  ← Borde visible
│   │  Fondo transparente │   │
│   └─────────────────────┘   │
│   Texto: #003d7a            │
└─────────────────────────────┘
          ↓ Hover
┌─────────────────────────────┐
│   ┌─────────────────────┐   │
│   │  📌 VOLVER ATRÁS   │   │  ← Se llena
│   │  Fondo: #003d7a    │   │
│   │  Texto: blanco     │   │
│   └─────────────────────┘   │
└─────────────────────────────┘
```

---

## 📏 TAMAÑOS

### Pequeño (btn-rustico-sm)
```
┌──────────────┐
│  📌 Pequeño  │
│ 0.7rem 1.4rem│
│  font 0.9rem │
└──────────────┘
```

### Normal (defecto)
```
┌──────────────────────┐
│   ✅ ENVIAR NORMAL   │
│  1.1rem 2.2rem       │
│  font 1.05rem        │
└──────────────────────┘
```

### Grande (btn-rustico-lg)
```
┌─────────────────────────────┐
│   ✅ ENVIAR GRANDE          │
│   1.3rem 2.6rem             │
│   font 1.15rem              │
└─────────────────────────────┘
```

### Bloque (btn-rustico-block)
```
┌─────────────────────────────────────────────────────────┐
│              ✅ ENVIAR ANCHO COMPLETO                  │
│              width: 100%                                │
│              ideal para formularios                     │
└─────────────────────────────────────────────────────────┘
```

---

## 🎪 GRUPOS DE BOTONES

### Horizontal
```
┌─────────────────┐  ┌──────────────────┐
│ ✅ ENVIAR       │  │ 🔄 CANCELAR      │
└─────────────────┘  └──────────────────┘
        gap: 1rem
```

### Vertical
```
┌──────────────────────┐
│  ✅ ENVIAR RESPUESTA │
└──────────────────────┘
┌──────────────────────┐
│ 🔄 LIMPIAR FORMULARIO│
└──────────────────────┘
```

### Con Iconos
```
┌─────────────────────────────┐
│  [💾] GUARDAR CAMBIOS       │
│   gap: 0.8rem               │
│   icon se anima en hover    │
└─────────────────────────────┘
```

---

## ✨ EFECTOS ESPECIALES

### Ripple Effect (Al hacer clic)
```
ANTES DEL CLICK:
┌─────────────────────────────┐
│   ✅ ENVIAR RESPUESTA       │
└─────────────────────────────┘

DURANTE EL CLICK:
┌─────────────────────────────┐
│   ✅ ENVIAR RESPUESTA       │
│     ◯ ← onda expandiéndose  │
└─────────────────────────────┘

DESPUÉS DEL CLICK:
┌─────────────────────────────┐
│   ✅ ENVIAR RESPUESTA       │
│   ◯ ← onda desapareciendo   │
└─────────────────────────────┘

Duración: 0.6s
Radio máximo: 300px
```

### Efecto Hover
```
REPOSO:
┌─────────────────────────────┐
│   ✅ ENVIAR RESPUESTA       │ y: 0px
│   Shadow: 0 4px 15px        │
└─────────────────────────────┘

MOUSE ENCIMA:
┌─────────────────────────────┐
│   ✅ ENVIAR RESPUESTA       │ y: -3px (levantado)
│   Shadow: 0 8px 25px        │ (más fuerte)
│                              │ letter-spacing: 1.2px
└─────────────────────────────┘

Transición: 0.3s cubic-bezier(0.23, 1, 0.320, 1)
```

### Animación Pulse (btn-pulse)
```
┌─────────────────────────────┐
│   🔔 IMPORTANTE             │
│   ⊕ ← aura pulsante         │
└─────────────────────────────┘

Ciclo: 2s infinito
Efecto: box-shadow que respira
Opacity: 0.7 → 0
```

---

## 🎨 PROPIEDADES TÉCNICAS

### Box Shadow (3 capas)
```css
box-shadow: 
  0 4px 15px rgba(0, 102, 204, 0.4),  /* Sombra exterior */
  inset 0 1px 0 rgba(255, 255, 255, 0.15);  /* Brillo interior */
```

### Borde Rústico
```css
border: 2px solid #002d5c;  /* Borde visible y oscuro */
border-radius: 8px;  /* Esquinas ligeramente redondeadas */
```

### Gradiente
```css
background: linear-gradient(135deg, #003d7a 0%, #0066cc 50%, #003d7a 100%);
/* Ángulo 135° para efecto diagonal natural */
/* Múltiples colores para efecto 3D */
```

### Transiciones
```css
transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
/* Suave, elegante y rápida */
/* Cubre: color, shadow, transform, etc */
```

---

## 📱 COMPORTAMIENTO EN DISPOSITIVOS

### Desktop (> 1200px)
- Botones con padding amplio
- Efectos de hover completos
- Box-shadow pronunciados
- Animaciones suaves

### Tablet (768px - 1200px)
- Padding mediano
- Efectos hover activos
- Responsive a touch

### Mobile (< 480px)
- Padding reducido
- Botones en stack vertical
- Ancho completo (100%)
- Mejor para touch (área más grande)
- Efecto ripple aún funciona

---

## 🔄 CICLO DE VIDA DE UN BOTÓN

### Estado Normal
```
Color: Gradiente base
Shadow: Sombra normal
Transform: y = 0px
Letter-spacing: 0.8px
```

### Hover (mouse encima)
```
Color: Gradiente más claro
Shadow: Sombra aumentada 2x
Transform: y = -3px (levantado)
Letter-spacing: 1.2px (más espaciado)
```

### Active (clicked)
```
Color: Gradiente base
Shadow: Sombra normal pero más sutil
Transform: y = -1px (menos levantado)
Ripple: Onda expandiéndose
```

### Disabled (deshabilitado)
```
Color: Gris (#999 → #777)
Shadow: Mínimo
Transform: none
Cursor: not-allowed
Opacity: 0.7
```

---

## 🎯 CASOS DE USO

| Botón | Uso Ideal | Ejemplo |
|-------|-----------|---------|
| **Primario** | Acciones principales | Enviar, Confirmar, Guardar |
| **Secundario** | Acciones alternativas | Volver, Cancelar, Atrás |
| **Éxito** | Confirmaciones | ✅ Aceptar, Sí, OK |
| **Peligro** | Acciones destructivas | Eliminar, Borrar, ❌ No |
| **Info** | Información adicional | Más Info, Ayuda, Ver Detalles |
| **Outline** | Acciones neutrales | Ver, Editar, Explorar |

---

## 💾 Código CSS Resumido

```css
/* Base común */
button { transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1); }

/* Ripple effect */
button::before { /* expande al hacer click */ }

/* Primario */
.btn-rustico-primary {
  background: linear-gradient(135deg, #003d7a 0%, #0066cc 50%, #003d7a 100%);
  border: 2px solid #002d5c;
  box-shadow: 0 4px 15px rgba(0, 61, 122, 0.4), inset 0 1px 0 rgba(255,255,255,0.15);
}

.btn-rustico-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 102, 204, 0.5), inset 0 1px 0 rgba(255,255,255,0.2);
  letter-spacing: 1.2px;
}
```

---

**¡Los botones rústicos se ven increíbles! 🚀✨**

Próximos pasos:
1. ✅ CSS de botones creado
2. ⏳ Implementar en componentes JSX
3. ⏳ Testear en navegador
4. ⏳ Ajustar si es necesario
