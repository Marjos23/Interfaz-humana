import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import "../styles.css";

const MainWrapper = () => {
  const navigate = useNavigate();
  // para simular rutas protegidas por autentificacion, se usa un useEffect que lea si existe currentUser en localStorage
  // y redirija a login si no existe
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      alert("Por favor, inicia sesión para continuar.");
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="main-wrapper">
      <Sidebar />
      <div className="content-wrapper">
        <Outlet />
      </div>
    </div>
  );
};

export default MainWrapper;
