import React, { useEffect, useState } from "react";
import { propuestasAPI } from "../services/api";
import Swal from "sweetalert2";
import "../styles.css";

const Votaciones = () => {
  const [votaciones, setVotaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [votosUsuario, setVotosUsuario] = useState({});
  const [busqueda, setBusqueda] = useState('');
  
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const loadVotosUsuario = () => {
    // Cargar votos previos del usuario desde localStorage
    const votos = JSON.parse(localStorage.getItem(`votos_${currentUser?.id || currentUser?.email}`)) || {};
    setVotosUsuario(votos);
  };

  useEffect(() => {
    loadVotaciones();
    loadVotosUsuario();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadVotaciones = async () => {
    try {
      setLoading(true);
      const all = await propuestasAPI.getAll();
      const open = all.filter((p) => p.votingOpen && p.approved);
      setVotaciones(open);
    } catch (error) {
      console.error("Error cargando votaciones:", error);
      Swal.fire('Error', 'No se pudieron cargar las votaciones', 'error');
    } finally {
      setLoading(false);
    }
  };

  const vote = async (id, type) => {
    // Verificar si el usuario ya votó
    if (votosUsuario[id]) {
      Swal.fire({
        icon: 'warning',
        title: 'Ya votaste',
        text: 'Solo puedes votar una vez por propuesta',
        confirmButtonColor: '#2c5282'
      });
      return;
    }

    try {
      await propuestasAPI.vote(id, type);
      
      // Guardar el voto en localStorage
      const nuevosVotos = { ...votosUsuario, [id]: type };
      localStorage.setItem(`votos_${currentUser?.id || currentUser?.email}`, JSON.stringify(nuevosVotos));
      setVotosUsuario(nuevosVotos);
      
      Swal.fire({
        icon: 'success',
        title: '¡Voto registrado!',
        text: `Tu voto ${type === 'yes' ? 'a favor' : 'en contra'} ha sido registrado correctamente`,
        timer: 2000,
        showConfirmButton: false
      });
      
      loadVotaciones();
    } catch (error) {
      console.error("Error votando:", error);
      Swal.fire('Error', 'No se pudo registrar tu voto', 'error');
    }
  };

  const yaVoto = (propuestaId) => {
    return votosUsuario[propuestaId] !== undefined;
  };

  const tipoVoto = (propuestaId) => {
    return votosUsuario[propuestaId];
  };

  return (
    <main className="main-content">
      <div className="page-header votaciones-hero">
        <h2>Votaciones Activas</h2>
        <p className="page-description">Vota por las propuestas que consideres importantes (solo puedes votar una vez por propuesta)</p>
      </div>

      {/* Barra de búsqueda */}
      <div className="votaciones-filter-section" style={{ marginBottom: '20px', padding: '0 1.5rem' }}>
        <input
          type="text"
          placeholder="🔍 Buscar votaciones por título o descripción..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 20px',
            fontSize: '1rem',
            border: '2px solid #e2e8f0',
            borderRadius: '10px',
            outline: 'none',
            transition: 'border-color 0.3s'
          }}
          onFocus={(e) => e.target.style.borderColor = '#2c5282'}
          onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
        />
      </div>

      {loading && <p>Cargando votaciones...</p>}

      <div className="votaciones-container">
        {votaciones.filter(v => 
          v.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
          v.description?.toLowerCase().includes(busqueda.toLowerCase())
        ).length === 0 && !loading && (
          <div className="empty-state">
            <p>{busqueda ? 'No se encontraron votaciones con ese criterio.' : 'No hay votaciones abiertas en este momento.'}</p>
          </div>
        )}
        
        {votaciones.filter(v => 
          v.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
          v.description?.toLowerCase().includes(busqueda.toLowerCase())
        ).map((p) => {
          const userVoted = yaVoto(p.id);
          const userVoteType = tipoVoto(p.id);
          const totalVotes = (p.votesYes || 0) + (p.votesNo || 0);
          const percentYes = totalVotes > 0 ? ((p.votesYes || 0) / totalVotes * 100).toFixed(1) : 0;
          const percentNo = totalVotes > 0 ? ((p.votesNo || 0) / totalVotes * 100).toFixed(1) : 0;
          
          return (
            <div key={p.id} className="votacion-card">
              <div className="votacion-header">
                <h3>{p.titulo}</h3>
                {userVoted && (
                  <span className="badge-voted">
                    Ya votaste: {userVoteType === 'yes' ? '✓ A Favor' : '✗ En Contra'}
                  </span>
                )}
              </div>
              
              <p className="votacion-descripcion">{p.descripcion}</p>
              
              <div className="votacion-stats">
                <div className="stat-item stat-yes">
                  <div className="stat-label">A Favor</div>
                  <div className="stat-value">{p.votesYes || 0}</div>
                  <div className="stat-bar">
                    <div className="stat-bar-fill yes" style={{ width: `${percentYes}%` }}></div>
                  </div>
                  <div className="stat-percent">{percentYes}%</div>
                </div>
                
                <div className="stat-item stat-no">
                  <div className="stat-label">En Contra</div>
                  <div className="stat-value">{p.votesNo || 0}</div>
                  <div className="stat-bar">
                    <div className="stat-bar-fill no" style={{ width: `${percentNo}%` }}></div>
                  </div>
                  <div className="stat-percent">{percentNo}%</div>
                </div>
              </div>
              
              <div className="votacion-actions">
                <button 
                  className={`btn-vote btn-vote-yes ${userVoted && userVoteType === 'yes' ? 'voted' : ''}`}
                  onClick={() => vote(p.id, 'yes')}
                  disabled={userVoted}
                >
                  {userVoted && userVoteType === 'yes' ? '✓ Votaste A Favor' : 'Votar A Favor'}
                </button>
                <button 
                  className={`btn-vote btn-vote-no ${userVoted && userVoteType === 'no' ? 'voted' : ''}`}
                  onClick={() => vote(p.id, 'no')}
                  disabled={userVoted}
                >
                  {userVoted && userVoteType === 'no' ? '✓ Votaste En Contra' : 'Votar En Contra'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Votaciones;
