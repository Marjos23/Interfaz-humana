import React, { useState, useEffect, useRef, useCallback } from "react";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faTachometerAlt,
  faChartBar,
  faSignOutAlt,
  faLightbulb,
  faExclamationTriangle,
  faVoteYea,
  faUserShield,
  faCalendarAlt,
  faPoll,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { notificacionesAPI } from "../../services/api";

const Sidebar = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationsRef = useRef(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(user);
  }, []);

  const getDestinatarioKey = useCallback((user) => {
    if (!user) return null;
    return user.rol === "admin" ? "admin" : user.id || user.email || null;
  }, []);

  const loadNotifications = useCallback(
    async (userProfile) => {
      const profile = userProfile || currentUser;
      const destinatario = getDestinatarioKey(profile);

      if (!destinatario) {
        setNotifications([]);
        setUnreadCount(0);
        return;
      }

      try {
        const data = await notificacionesAPI.getForUser(destinatario);
        setNotifications(data);
        setUnreadCount(data.filter((n) => !n.leido).length);
      } catch (error) {
        console.error("Error cargando notificaciones:", error);
      }
    },
    [currentUser, getDestinatarioKey]
  );

  useEffect(() => {
    loadNotifications(currentUser);
  }, [currentUser, loadNotifications]);

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === "notificationsUpdated") {
        const storedUser = JSON.parse(localStorage.getItem("currentUser") || "null");
        loadNotifications(storedUser || currentUser);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [currentUser, loadNotifications]);

  useEffect(() => {
    if (!showNotifications) return;

    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showNotifications]);

  const handleToggleNotifications = async () => {
    const nextOpen = !showNotifications;
    setShowNotifications(nextOpen);

    if (!nextOpen) return;

    const destinatario = getDestinatarioKey(currentUser);
    if (!destinatario || unreadCount === 0) return;

    try {
      await notificacionesAPI.markAllAsRead(destinatario);
      localStorage.setItem("notificationsUpdated", Date.now().toString());
      loadNotifications(currentUser);
    } catch (error) {
      console.error("Error marcando notificaciones como leídas:", error);
    }
  };

  const isAdmin = currentUser?.rol === "admin";

  return (
    <header className="navbar-horizontal">
      {/* Logo y título */}
      <div className="navbar-logo">
        <div className="logo-circle">MC</div>
        <div className="logo-text">
          <h3>Portal Manta</h3>
          <span>Ciudadano</span>
        </div>
      </div>

      {/* Navegación horizontal */}
      <nav className="navbar-nav">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "navbar-link active" : "navbar-link"
          }
        >
          <FontAwesomeIcon icon={faTachometerAlt} />
          <span>Panel</span>
        </NavLink>

        <NavLink
          to="/propuestas"
          className={({ isActive }) =>
            isActive ? "navbar-link active" : "navbar-link"
          }
        >
          <FontAwesomeIcon icon={faLightbulb} />
          <span>Propuestas</span>
        </NavLink>

        <NavLink
          to="/problemas"
          className={({ isActive }) =>
            isActive ? "navbar-link active" : "navbar-link"
          }
        >
          <FontAwesomeIcon icon={faExclamationTriangle} />
          <span>Reportes</span>
        </NavLink>

        <NavLink
          to="/votaciones"
          className={({ isActive }) =>
            isActive ? "navbar-link active" : "navbar-link"
          }
        >
          <FontAwesomeIcon icon={faVoteYea} />
          <span>Votaciones</span>
        </NavLink>

        <NavLink
          to="/eventos"
          className={({ isActive }) =>
            isActive ? "navbar-link active" : "navbar-link"
          }
        >
          <FontAwesomeIcon icon={faCalendarAlt} />
          <span>Eventos</span>
        </NavLink>

        <NavLink
          to="/encuesta"
          className={({ isActive }) =>
            isActive ? "navbar-link active" : "navbar-link"
          }
        >
          <FontAwesomeIcon icon={faPoll} />
          <span>Encuestas</span>
        </NavLink>

        <NavLink
          to="/estadisticas"
          className={({ isActive }) =>
            isActive ? "navbar-link active" : "navbar-link"
          }
        >
          <FontAwesomeIcon icon={faChartBar} />
          <span>Estadísticas</span>
        </NavLink>

        {isAdmin && (
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              isActive ? "navbar-link active" : "navbar-link"
            }
          >
            <FontAwesomeIcon icon={faUserShield} />
            <span>Admin</span>
          </NavLink>
        )}

        <NavLink
          to="/mi-perfil"
          className={({ isActive }) =>
            isActive ? "navbar-link active" : "navbar-link"
          }
        >
          <FontAwesomeIcon icon={faUsers} />
          <span>Mi Perfil</span>
        </NavLink>
      </nav>

      {/* Usuario y logout */}
      <div className="navbar-user">
        <div className="notification-wrapper" ref={notificationsRef}>
          <button
            type="button"
            className={`notification-bell${showNotifications ? " active" : ""}`}
            onClick={handleToggleNotifications}
            aria-label="Notificaciones"
          >
            <FontAwesomeIcon icon={faBell} />
            {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
          </button>

          {showNotifications && (
            <div className="notification-dropdown">
              <div className="notification-header">
                <h4>Notificaciones</h4>
                {unreadCount > 0 ? (
                  <span className="notification-status unread">{unreadCount} sin leer</span>
                ) : (
                  <span className="notification-status">Todo al día</span>
                )}
              </div>

              <div className="notification-list">
                {notifications.length === 0 ? (
                  <div className="notification-empty">No tienes notificaciones</div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`notification-item${notification.leido ? "" : " unread"}`}
                    >
                      <div className="notification-title">{notification.titulo}</div>
                      <div className="notification-message">{notification.mensaje}</div>
                      <div className="notification-meta">
                        {notification.ciudadanoNombre && (
                          <span className="notification-author">{notification.ciudadanoNombre}</span>
                        )}
                        <span>
                          {notification.createdAt
                            ? new Date(notification.createdAt).toLocaleString('es-EC')
                            : ''}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="user-info">
          <div className="user-avatar">
            {currentUser?.nombre?.charAt(0).toUpperCase() || "U"}
          </div>
          <span className="user-name">{currentUser?.cedula || currentUser?.email}</span>
        </div>
        <Link to="/" className="logout-btn">
          <FontAwesomeIcon icon={faSignOutAlt} />
          <span>Salir</span>
        </Link>
      </div>
    </header>
  );
};

export default Sidebar;
