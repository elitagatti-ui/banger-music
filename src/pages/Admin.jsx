import { useState } from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  const [tabActiva, setTabActiva] = useState("canciones");

  return (
    <div className="container py-4">
      {/* HEADER & VOLVER */}
      <div className="mb-4">
        <Link to="/" className="text-decoration-none text-secondary">
          <i className="bi bi-arrow-left me-2"></i>Volver a BANGER
        </Link>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <h2 className="text-white m-0">Gestión de Catálogo</h2>
        </div>
      </div>

      {/* TABS PARA CANCIONES Y USUARIOS */}
      <div className="d-flex gap-3 border-bottom border-secondary mb-4 pb-2">
        <button
          className={`btn ${
            tabActiva === "canciones" ? "btn-warning" : "btn-outline-secondary"
          }`}
          onClick={() => setTabActiva("canciones")}
        >
          Canciones
        </button>
        <button
          className={`btn ${
            tabActiva === "usuarios" ? "btn-warning" : "btn-outline-secondary"
          }`}
          onClick={() => setTabActiva("usuarios")}
        >
          Usuarios
        </button>
      </div>

      {/* VISTAS TEMPORALES */}
      {tabActiva === "canciones" && (
        <div className="text-white p-3 border rounded">
          <p className="m-0">Vista de gestión de canciones</p>
        </div>
      )}

      {tabActiva === "usuarios" && (
        <div className="text-white p-3 border rounded">
          <p className="m-0">Vista de gestión de usuarios</p>
        </div>
      )}
    </div>
  );
};

export default Admin;