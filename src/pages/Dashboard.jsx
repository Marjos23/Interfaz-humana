import React, { useEffect } from "react";
import "../styles.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLightbulb,
  faExclamationTriangle,
  faVoteYea,
  faUsers,
  faChartLine,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import QuickActions from "../components/QuickActions";

const Dashboard = () => {
  const dashboardData = [
    {
      title: "Propuestas Activas",
      value: "47",
      icon: faLightbulb,
      color: "#f59e0b",
      gradient: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
    },
    {
      title: "Problemas Reportados",
      value: "23",
      icon: faExclamationTriangle,
      color: "#ef4444",
      gradient: "linear-gradient(135deg, #f87171 0%, #ef4444 100%)",
    },
    {
      title: "Votaciones Abiertas",
      value: "8",
      icon: faVoteYea,
      color: "#3b82f6",
      gradient: "linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)",
    },
    {
      title: "Ciudadanos Participando",
      value: "1,254",
      icon: faUsers,
      color: "#10b981",
      gradient: "linear-gradient(135deg, #34d399 0%, #10b981 100%)",
    },
  ];
  const calendarEvents = [
    {
      title: "Votación: Mejora Parque Central",
      start: new Date(),
      color: "#3a87ad",
    },
    {
      title: "Consulta Ciudadana: Transporte",
      start: new Date(new Date().setDate(new Date().getDate() + 3)),
      end: new Date(new Date().setDate(new Date().getDate() + 5)),
      color: "#5cb85c",
    },
    {
      title: "Asamblea Barrial - Tarqui",
      start: new Date(new Date().setDate(new Date().getDate() + 7)),
      color: "#e74c3c",
    },
  ];
  const recentActivities = [
    {
      id: 1,
      text: "Nueva propuesta: Mejora del alumbrado público en Los Esteros",
      time: "Hace 2 horas",
      icon: <FontAwesomeIcon icon={faLightbulb} />,
    },
    {
      id: 2,
      text: "Problema reportado: Bache en Av. 4 de Noviembre",
      time: "Hace 4 horas",
      icon: <FontAwesomeIcon icon={faExclamationTriangle} />,
    },
    {
      id: 3,
      text: "Votación aprobada: Construcción de ciclovías",
      time: "Hace 1 día",
      icon: <FontAwesomeIcon icon={faVoteYea} />,
    },
  ];

  const loadDashboardData = () => {
    setTimeout(() => {
      // Simulate data loading
      document.getElementById("total-empleados").innerText = "47";
      document.getElementById("asistencias-hoy").innerText = "23";
      document.getElementById("permisos-activos").innerText = "8";
      document.getElementById("capacitaciones-pendientes").innerText = "1,254";
    }, 1000); // Simulate data loading
  };
  useEffect(() => {
    loadDashboardData();
  }, []);
  
  return (
    <div className="modern-dashboard">
      <main className="main-content">
        {/* Hero Section compacto */}
        <div className="dashboard-hero-compact">
          <div className="hero-overlay"></div>
          <div className="hero-content-compact">
            <h1 className="hero-title-compact">Portal Ciudadano - Manta</h1>
          </div>
        </div>

        {/* Tarjetas de estadísticas en fila */}
        <div className="stats-row-compact">
          {dashboardData.map((stat, index) => (
            <div className="stat-card-compact" key={index}>
              <div className="stat-icon-compact" style={{ background: stat.gradient }}>
                <FontAwesomeIcon icon={stat.icon} />
              </div>
              <div className="stat-info-compact">
                <div className="stat-value-compact">{stat.value}</div>
                <div className="stat-label-compact">{stat.title}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Grid principal: 2 columnas arriba */}
        <div className="dashboard-main-grid-top">
          {/* Columna 1: Quick Actions */}
          <div className="dashboard-section">
            <QuickActions />
          </div>

          {/* Columna 2: Actividades */}
          <div className="dashboard-section">
            <div className="activities-card-compact">
              <div className="section-header-compact">
                <FontAwesomeIcon icon={faTrophy} className="section-icon" />
                <h3>Actividad Reciente</h3>
              </div>
              <div className="activities-list-compact">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="activity-item-compact">
                    <div className="activity-icon-compact">{activity.icon}</div>
                    <div className="activity-text-compact">
                      <p>{activity.text}</p>
                      <span className="activity-time">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Calendario abajo - Ancho completo */}
        <div className="dashboard-calendar-bottom">
          <div className="calendar-card-compact">
            <div className="section-header-compact">
              <FontAwesomeIcon icon={faChartLine} className="section-icon" />
              <h3>Calendario de Eventos Ciudadanos</h3>
            </div>
            <div className="calendar-compact">
              <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                events={calendarEvents}
                locale={"es"}
                height="350px"
                headerToolbar={{
                  left: 'prev',
                  center: 'title',
                  right: 'next'
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
