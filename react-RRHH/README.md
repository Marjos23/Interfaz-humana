# 🏛️ Portal de Participación Ciudadana - Manta

Portal web interactivo que permite a los ciudadanos de Manta participar activamente en las decisiones locales, reportar problemas urbanos y proponer mejoras para su comunidad.

## � Características Principales

### Para Ciudadanos

#### 1. **Módulo de Propuestas Ciudadanas** 💡
- Crear propuestas para mejorar la ciudad
- Votar propuestas (a favor/en contra)
- Comentar y debatir ideas
- Ver propuestas aprobadas y pendientes
- Sistema de categorización

#### 2. **Módulo de Reporte de Problemas** ⚠️
- Reportar problemas urbanos (baches, alumbrado, limpieza, etc.)
- Categorizar por tipo (Vías, Infraestructura, Limpieza, etc.)
- Establecer prioridades (Alta, Media, Baja)
- Especificar ubicación exacta
- Seguimiento del estado en tiempo real (Reportado → En proceso → Resuelto)
- Dashboard con estadísticas

#### 3. **Módulo de Votaciones Activas** 🗳️
- Participar en consultas oficiales del municipio
- Ver propuestas con votación abierta
- Sistema de votación oficial
- Resultados en tiempo real

### Para Administradores

#### 4. **Panel de Administración** 🔧
- **Gestión de Propuestas**:
  - Moderar propuestas (Aprobar/Rechazar)
  - Abrir y cerrar períodos de votación
  - Ver estadísticas de votos y comentarios
  
- **Gestión de Reportes**:
  - Ver todos los reportes en un dashboard
  - Cambiar estados (Reportado → En proceso → Resuelto)
  - Asignar prioridades
  - Ver ubicaciones y detalles

## 🏗️ Arquitectura Técnica

### Frontend
- **React 19** - Framework principal
- **Vite 7** - Build tool y servidor de desarrollo
- **React Router DOM** - Navegación SPA
- **FontAwesome** - Sistema de iconos
- **SweetAlert2** - Alertas interactivas

### Backend Simulado
- **json-server** - API REST mock para desarrollo
- **Puerto 3001** - Servidor backend
- **db.json** - Base de datos en archivo JSON

### Servicios
- `src/services/api.js` - Cliente HTTP centralizado
- Endpoints REST completos (GET, POST, PATCH, DELETE)
- Manejo de errores consistente

## 📦 Instalación y Configuración

### Requisitos Previos
- Node.js 18+ 
- npm o yarn

### Pasos de Instalación

```bash
# 1. Clonar el repositorio
git clone [url-del-repositorio]
cd react-RRHH

# 2. Instalar dependencias
npm install

# 3. Iniciar el proyecto (backend + frontend)
npm run dev

```

Esto inicia automáticamente:
- 🔷 **Backend (json-server)**: http://localhost:3001
- 🔶 **Frontend (Vite)**: http://localhost:5173

## 👥 Credenciales de Acceso

### Usuario Administrador
- **Email**: `admin@manta.gob.ec`
- **Password**: `admin123`
- **Permisos**: Acceso completo al panel de administración

### Usuario Ciudadano
- **Email**: `ciudadano@manta.gob.ec`
- **Password**: `ciudadano123`
- **Permisos**: Crear propuestas, votar, reportar problemas

## 📋 Comandos Disponibles

```bash
# Desarrollo (backend + frontend concurrentes)
npm run dev

# Solo frontend (Vite)
npm run client

# Solo backend (json-server)
npm run server

# Build para producción
npm run build

# Preview del build
npm run preview

# Lint
npm run lint
```

## 🗂️ Estructura del Proyecto

```
react-RRHH/
├── db.json                      # Base de datos mock
├── package.json                 # Dependencias y scripts
├── src/
│   ├── services/
│   │   └── api.js              # Cliente API centralizado
│   ├── pages/
│   │   ├── Login.jsx           # Página de inicio de sesión
│   │   ├── Dashboard.jsx       # Panel principal
│   │   ├── Propuestas.jsx      # Módulo de propuestas
│   │   ├── Votaciones.jsx      # Módulo de votaciones
│   │   ├── Asistencia.jsx      # Reportes de problemas
│   │   └── AdminDashboard.jsx  # Panel de administración
│   ├── components/
│   │   ├── sidebar/
│   │   │   └── Sidebar.jsx     # Navegación lateral
│   │   └── QuickActions.jsx    # Acciones rápidas
│   ├── App.jsx                 # Configuración de rutas
│   └── main.jsx                # Punto de entrada
└── README.md
```

## 🔌 API Endpoints

El backend mock expone los siguientes endpoints en `http://localhost:3001`:

### Propuestas
- `GET /propuestas` - Listar todas las propuestas
- `GET /propuestas/:id` - Obtener una propuesta
- `POST /propuestas` - Crear propuesta
- `PATCH /propuestas/:id` - Actualizar propuesta
- `DELETE /propuestas/:id` - Eliminar propuesta

### Problemas/Reportes
- `GET /problemas` - Listar todos los reportes
- `GET /problemas/:id` - Obtener un reporte
- `POST /problemas` - Crear reporte
- `PATCH /problemas/:id` - Actualizar reporte
- `DELETE /problemas/:id` - Eliminar reporte

### Usuarios
- `GET /usuarios` - Listar usuarios
- `POST /usuarios` - Crear usuario

## 🎨 Flujo de Uso

### Como Ciudadano:
1. Login con credenciales de ciudadano
2. Explorar propuestas existentes en `/propuestas`
3. Crear una nueva propuesta (quedará pendiente de aprobación)
4. Votar en propuestas aprobadas
5. Reportar problemas en `/problemas`
6. Participar en votaciones oficiales en `/votaciones`

### Como Administrador:
1. Login con credenciales de admin
2. Acceder al panel de administración `/admin`
3. Revisar y aprobar/rechazar propuestas pendientes
4. Abrir votaciones para propuestas aprobadas
5. Gestionar el estado de reportes de problemas
6. Ver estadísticas y comentarios

## 🛠️ Desarrollo

### Modificar la Base de Datos
Edita el archivo `db.json` para agregar o modificar datos. json-server recargará automáticamente.

### Agregar Nuevas Funcionalidades
1. Crear servicios en `src/services/api.js`
2. Crear componentes en `src/pages/` o `src/components/`
3. Agregar rutas en `src/App.jsx`

## 🚀 Próximas Mejoras

- [ ] Autenticación con JWT
- [ ] Subida de imágenes para reportes
- [ ] Geolocalización con mapas interactivos (Leaflet/Google Maps)
- [ ] Sistema de notificaciones push
- [ ] Dashboard con gráficos y analytics
- [ ] Prevención de votos duplicados
- [ ] Aplicación móvil (React Native)
- [ ] Backend real (Node.js + MongoDB/PostgreSQL)

## � Responsive Design

La aplicación está diseñada para funcionar en:
- 💻 Desktop
- 📱 Tablets
- 📱 Móviles

## 🐛 Solución de Problemas

### Error: "Failed to fetch"
**Causa**: El backend no está corriendo  
**Solución**: Usa `npm run dev` en lugar de `npm run client`

### Puerto 3001 en uso
**Solución**: Cambia el puerto en `package.json`:
```json
"server": "json-server --watch db.json --port 3002"
```
Y actualiza `API_URL` en `src/services/api.js`

### Los datos no persisten
**Causa**: json-server guarda en `db.json`  
**Solución**: Verifica que el archivo existe y tiene permisos de escritura

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👨‍💻 Contribuir

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Contacto

Portal de Participación Ciudadana - Manta, Ecuador

---

**Última actualización**: Octubre 2025

Este portal busca fomentar la democracia participativa permitiendo que los ciudadanos de Manta:
- Expresen sus ideas y propuestas
- Reporten problemas de su comunidad
- Participen en decisiones importantes
- Hagan seguimiento a las iniciativas ciudadanas

## 📱 Responsive Design

La aplicación está optimizada para funcionar en:
- Computadoras de escritorio
- Tablets
- Dispositivos móviles

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu característica
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

**Desarrollado para mejorar la participación ciudadana en Manta, Ecuador** 🇪🇨
