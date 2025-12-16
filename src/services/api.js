// Servicio API para comunicación con el backend mock (json-server)
const API_URL = 'http://localhost:3001';

// Helper para manejar respuestas
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Error en la petición');
  }
  return response.json();
};

// ===== PROPUESTAS =====
export const propuestasAPI = {
  // Obtener todas las propuestas
  getAll: async () => {
    const response = await fetch(`${API_URL}/propuestas`);
    return handleResponse(response);
  },

  // Obtener propuesta por ID
  getById: async (id) => {
    const response = await fetch(`${API_URL}/propuestas/${id}`);
    return handleResponse(response);
  },

  // Crear nueva propuesta
  create: async (propuesta) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    const payload = {
      ...propuesta,
      votesYes: 0,
      votesNo: 0,
      comments: [],
      approved: false,
      votingOpen: false,
      createdAt: new Date().toLocaleString('es-EC'),
    };

    if (currentUser) {
      payload.autorId = propuesta?.autorId || currentUser.id || currentUser.email;
      payload.autorNombre = propuesta?.autorNombre || currentUser.nombre || currentUser.email || 'Ciudadano';
      payload.autorEmail = propuesta?.autorEmail || currentUser.email || null;
    }

    const response = await fetch(`${API_URL}/propuestas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return handleResponse(response);
  },

  // Actualizar propuesta
  update: async (id, data) => {
    const response = await fetch(`${API_URL}/propuestas/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  // Votar en propuesta
  vote: async (id, type) => {
    const propuesta = await propuestasAPI.getById(id);
    const field = type === 'yes' ? 'votesYes' : 'votesNo';
    return propuestasAPI.update(id, {
      [field]: (propuesta[field] || 0) + 1,
    });
  },

  // Agregar comentario
  addComment: async (id, comment) => {
    const propuesta = await propuestasAPI.getById(id);
    const newComment = {
      id: Date.now(),
      text: comment,
      date: new Date().toLocaleString('es-EC'),
    };
    return propuestasAPI.update(id, {
      comments: [newComment, ...(propuesta.comments || [])],
    });
  },

  // Aprobar/rechazar propuesta (admin)
  approve: async (id, approved) => {
    return propuestasAPI.update(id, { approved });
  },

  // Abrir/cerrar votación (admin)
  toggleVoting: async (id) => {
    const propuesta = await propuestasAPI.getById(id);
    return propuestasAPI.update(id, { votingOpen: !propuesta.votingOpen });
  },

  // Eliminar propuesta
  delete: async (id) => {
    const response = await fetch(`${API_URL}/propuestas/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },
};

// ===== REPORTES/PROBLEMAS =====
export const problemasAPI = {
  // Obtener todos los problemas
  getAll: async () => {
    const response = await fetch(`${API_URL}/problemas`);
    return handleResponse(response);
  },

  // Obtener problema por ID
  getById: async (id) => {
    const response = await fetch(`${API_URL}/problemas/${id}`);
    return handleResponse(response);
  },

  // Crear nuevo reporte
  create: async (problema) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    const payload = {
      ...problema,
      estado: 'Reportado',
      fecha: new Date().toLocaleDateString('es-EC'),
    };

    if (currentUser) {
      payload.reportadoPorId = problema?.reportadoPorId || currentUser.id || currentUser.email;
      payload.reportadoPor = problema?.reportadoPor || currentUser.nombre || currentUser.email || 'Ciudadano';
      payload.reportadoPorEmail = problema?.reportadoPorEmail || currentUser.email || null;
    }

    const response = await fetch(`${API_URL}/problemas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return handleResponse(response);
  },

  // Actualizar problema
  update: async (id, data) => {
    const response = await fetch(`${API_URL}/problemas/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  // Cambiar estado del problema (admin)
  changeStatus: async (id, estado) => {
    return problemasAPI.update(id, { estado });
  },

  // Eliminar problema
  delete: async (id) => {
    const response = await fetch(`${API_URL}/problemas/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },
};

// ===== USUARIOS =====
export const usuariosAPI = {
  // Obtener todos los usuarios
  getAll: async () => {
    const response = await fetch(`${API_URL}/usuarios`);
    return handleResponse(response);
  },

  // Login (buscar usuario por email y password)
  login: async (email, password) => {
    const usuarios = await usuariosAPI.getAll();
    const usuario = usuarios.find(
      (u) => u.email === email && u.password === password
    );
    if (usuario) {
      return usuario;
    }
    throw new Error('Credenciales inválidas');
  },

  // Crear nuevo usuario
  create: async (usuario) => {
    const response = await fetch(`${API_URL}/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...usuario,
        rol: 'ciudadano',
      }),
    });
    return handleResponse(response);
  },
};

// ===== EVENTOS =====
export const eventosAPI = {
  // Obtener todos los eventos
  getAll: async () => {
    const response = await fetch(`${API_URL}/eventos`);
    return handleResponse(response);
  },

  // Obtener evento por ID
  getById: async (id) => {
    const response = await fetch(`${API_URL}/eventos/${id}`);
    return handleResponse(response);
  },

  // Crear nuevo evento (solo admins)
  create: async (evento) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.rol !== 'admin') {
      throw new Error('No tienes permisos para crear eventos');
    }
    
    const response = await fetch(`${API_URL}/eventos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...evento,
        creadoPor: currentUser.email,
        createdAt: new Date().toISOString(),
      }),
    });
    return handleResponse(response);
  },

  // Actualizar evento (solo admins)
  update: async (id, data) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.rol !== 'admin') {
      throw new Error('No tienes permisos para editar eventos');
    }
    
    const response = await fetch(`${API_URL}/eventos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  // Eliminar evento (solo admins)
  delete: async (id) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.rol !== 'admin') {
      throw new Error('No tienes permisos para eliminar eventos');
    }
    
    const response = await fetch(`${API_URL}/eventos/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },
};

// ===== NOTIFICACIONES =====
export const notificacionesAPI = {
  // Obtener todas las notificaciones
  getAll: async () => {
    const response = await fetch(`${API_URL}/notificaciones?_sort=createdAt&_order=desc`);
    return handleResponse(response);
  },

  // Obtener notificaciones por destinatario
  getForUser: async (destinatario) => {
    if (!destinatario) return [];
    const response = await fetch(`${API_URL}/notificaciones?destinatario=${encodeURIComponent(destinatario)}&_sort=createdAt&_order=desc`);
    return handleResponse(response);
  },

  // Crear notificación
  create: async (notificacion) => {
    const response = await fetch(`${API_URL}/notificaciones`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titulo: notificacion.titulo,
        mensaje: notificacion.mensaje,
        tipo: notificacion.tipo || 'general',
        destinatario: notificacion.destinatario,
        meta: notificacion.meta || null,
        leido: false,
        createdAt: new Date().toISOString(),
        ciudadanoNombre: notificacion.ciudadanoNombre || null,
        ciudadanoId: notificacion.ciudadanoId || null,
      }),
    });
    return handleResponse(response);
  },

  // Marcar notificación como leída
  markAsRead: async (id) => {
    const response = await fetch(`${API_URL}/notificaciones/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ leido: true, readAt: new Date().toISOString() }),
    });
    return handleResponse(response);
  },

  // Marcar todas como leídas para un destinatario
  markAllAsRead: async (destinatario) => {
    const notifications = await notificacionesAPI.getForUser(destinatario);
    await Promise.all(
      notifications
        .filter((n) => !n.leido)
        .map((n) => notificacionesAPI.markAsRead(n.id))
    );
    return true;
  },
};

export default {
  propuestasAPI,
  problemasAPI,
  usuariosAPI,
  eventosAPI,
  notificacionesAPI,
};
