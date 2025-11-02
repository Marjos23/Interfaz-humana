import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLightbulb,
  faExclamationTriangle,
  faVoteYea,
  faChartLine,
  faCalendarPlus,
  faPoll,
} from "@fortawesome/free-solid-svg-icons";

const QuickActions = () => {
  const actions = [
    {
      to: "/propuestas",
      icon: faLightbulb,
      title: "Ver Propuestas",
      description: "Explora y vota propuestas",
      gradient: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
    },
    {
      to: "/problemas",
      icon: faExclamationTriangle,
      title: "Reportar Problema",
      description: "Informa incidencias",
      gradient: "linear-gradient(135deg, #f87171 0%, #ef4444 100%)",
    },
    {
      to: "/votaciones",
      icon: faVoteYea,
      title: "Votar Ahora",
      description: "Participa en votaciones",
      gradient: "linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)",
    },
    {
      to: "/encuesta",
      icon: faPoll,
      title: "Encuesta",
      description: "Ayúdanos a mejorar",
      gradient: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)",
    },
    {
      to: "/estadisticas",
      icon: faChartLine,
      title: "Ver Estadísticas",
      description: "Revisa los indicadores",
      gradient: "linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)",
    },
    {
      to: "/eventos",
      icon: faCalendarPlus,
      title: "Ver Eventos",
      description: "Consulta eventos próximos",
      gradient: "linear-gradient(135deg, #34d399 0%, #10b981 100%)",
    },
  ];

  return (
    <div className="modern-quick-actions-card">
      <div className="section-header-compact">
        <FontAwesomeIcon icon={faLightbulb} className="section-icon" />
        <h3>Acciones Rápidas</h3>
      </div>
      <div className="modern-action-grid">
        {actions.map((action, index) => (
          <Link to={action.to} className="modern-action-btn" key={index}>
            <div className="action-icon-wrapper" style={{ background: action.gradient }}>
              <FontAwesomeIcon icon={action.icon} className="action-icon" />
            </div>
            <div className="action-text">
              <span className="action-title">{action.title}</span>
              <span className="action-description">{action.description}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
