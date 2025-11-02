import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment, faEye } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const Empleados = () => {
  const [propuestas, setPropuestas] = useState([
    {
      id: 1,
      titulo: "Mejora del alumbrado público en Los Esteros",
      categoria: "Infraestructura",
      autor: "María González",
      fecha: "20/10/2025",
      estado: "En revisión",
      votos: 234,
      activo: true
    },
    {
      id: 2,
      titulo: "Construcción de ciclovías en Av. 4 de Noviembre",
      categoria: "Movilidad",
      autor: "Carlos Mendoza",
      fecha: "18/10/2025",
      estado: "Aprobada",
      votos: 512,
      activo: true
    },
    {
      id: 3,
      titulo: "Creación de parque infantil en Tarqui",
      categoria: "Recreación",
      autor: "Ana Vera",
      fecha: "15/10/2025",
      estado: "En votación",
      votos: 189,
      activo: true
    },
    {
      id: 4,
      titulo: "Programa de reciclaje comunitario",
      categoria: "Medio Ambiente",
      autor: "Pedro Salinas",
      fecha: "12/10/2025",
      estado: "En revisión",
      votos: 156,
      activo: true
    },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("propuestas")) || propuestas;
    setPropuestas(data);
  }, [propuestas]);

  const handleEdit = (id) => {
    Swal.fire({
      title: "Editar Propuesta",
      text: `Editar propuesta con ID: ${id}`,
      icon: "info",
      confirmButtonText: "Aceptar",
    });
  };
  const handleView = (id) => {
    const propuesta = propuestas.find(p => p.id === id);
    Swal.fire({
      title: propuesta.titulo,
      html: `
        <p><strong>Categoría:</strong> ${propuesta.categoria}</p>
        <p><strong>Autor:</strong> ${propuesta.autor}</p>
        <p><strong>Fecha:</strong> ${propuesta.fecha}</p>
        <p><strong>Estado:</strong> ${propuesta.estado}</p>
        <p><strong>Votos:</strong> ${propuesta.votos}</p>
      `,
      icon: "info",
      confirmButtonText: "Cerrar",
    });
  };

  const handleVotar = (id) => {
    Swal.fire({
      title: "¿Apoyar esta propuesta?",
      text: "Tu voto será registrado",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Votar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const nuevasPropuestas = propuestas.map(p => 
          p.id === id ? {...p, votos: p.votos + 1} : p
        );
        setPropuestas(nuevasPropuestas);
        localStorage.setItem("propuestas", JSON.stringify(nuevasPropuestas));
        Swal.fire("¡Gracias!", "Tu voto ha sido registrado", "success");
      }
    });
  };

  const handleNewEmployee = () => {
    navigate("/nueva-propuesta");
  };
  return (
    <main className="main-content">
      <div className="page-header">
        <h2>Propuestas Ciudadanas</h2>
        <button
          type="button"
          className="btn-primary"
          onClick={handleNewEmployee}
        >
          + Nueva Propuesta
        </button>
      </div>

      <div className="search-container">
        <input
          type="text"
          id="search-empleado"
          placeholder="Buscar propuestas..."
        />
      </div>

      <div className="table-container">
        <table id="empleados-table">
          <thead>
            <tr>
              <th className="tableHeads">Título</th>
              <th className="tableHeads">Categoría</th>
              <th className="tableHeads">Autor</th>
              <th className="tableHeads">Fecha</th>
              <th className="tableHeads">Votos</th>
              <th className="tableHeads">Estado</th>
              <th className="tableHeads">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {propuestas.map((propuesta) => (
              <tr key={propuesta.id}>
                <td>{propuesta.titulo}</td>
                <td>{propuesta.categoria}</td>
                <td>{propuesta.autor}</td>
                <td>{propuesta.fecha}</td>
                <td>
                  <span style={{fontWeight: "bold", color: "#3498db"}}>
                    <FontAwesomeIcon icon={faThumbsUp} /> {propuesta.votos}
                  </span>
                </td>
                <td>
                  <span
                    className={`estado ${
                      propuesta.estado === "Aprobada" ? "activo" : 
                      propuesta.estado === "En votación" ? "en-votacion" : "inactivo"
                    }`}
                  >
                    {propuesta.estado}
                  </span>
                </td>
                <td className="acciones">
                  <button
                    className="btn-icon vote"
                    onClick={() => handleVotar(propuesta.id)}
                    title="Votar"
                  >
                    <FontAwesomeIcon icon={faThumbsUp} />
                  </button>
                  <button
                    className="btn-icon view"
                    onClick={() => handleView(propuesta.id)}
                    title="Ver detalles"
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                  <button
                    className="btn-icon comment"
                    onClick={() => handleEdit(propuesta.id)}
                    title="Comentar"
                  >
                    <FontAwesomeIcon icon={faComment} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button className="btn-pagination" disabled>
          Anterior
        </button>
        <span className="page-info">Página 1 de 2</span>
        <button className="btn-pagination">Siguiente</button>
      </div>
    </main>
  );
};

export default Empleados;
