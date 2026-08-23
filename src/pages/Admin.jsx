import { useState, useEffect } from "react";
import cancionesIniciales from "../../data/canciones.js";

const Admin = () => {
  const [tabActiva, setTabActiva] = useState("canciones");
  const [canciones, setCanciones] = useState([]);

  // Cargar Canciones desde localStorage
  useEffect(() => {
    const cancionesGuardadas = JSON.parse(localStorage.getItem("canciones"));
    if (cancionesGuardadas && cancionesGuardadas.length > 0) {
      setCanciones(cancionesGuardadas);
    } else {
      setCanciones(cancionesIniciales);
      localStorage.setItem("canciones", JSON.stringify(cancionesIniciales));
    }
  }, []);

  return (
    <div className="container py-4">
      {/* HEADER */}
      <div className="mb-4">
        <h2 className="text-white m-0">Gestión de Catálogo</h2>
      </div>

      {/* TABS DE NAVEGACIÓN INTERNA */}
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

      {/* TAB CANCIONES */}
      {tabActiva === "canciones" && (
        <div className="table-responsive border rounded p-2">
          <table className="table table-dark align-middle m-0">
            <thead>
              <tr>
                <th>PORTADA</th>
                <th>TÍTULO</th>
                <th>ARTISTA</th>
                <th>ÁLBUM</th>
                <th>GÉNERO</th>
                <th className="text-end">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {canciones.length > 0 ? (
                canciones.map((cancion) => (
                  <tr key={cancion.id}>
                    <td>
                      <img
                        src={cancion.imagen}
                        alt={cancion.nombre}
                        style={{ width: "40px", height: "40px", objectFit: "cover" }}
                        className="rounded"
                      />
                    </td>
                    <td className="fw-bold">{cancion.nombre}</td>
                    <td>{cancion.artista}</td>
                    <td>{cancion.album}</td>
                    <td>
                      <span className="badge bg-secondary">{cancion.genero}</span>
                    </td>
                    <td className="text-end">
                      <button className="btn btn-sm btn-outline-danger" title="Eliminar canción">
                        <i className="bi bi-trash3"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-muted">
                    No hay canciones registradas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB USUARIOS */}
      {tabActiva === "usuarios" && (
        <div className="text-white p-3 border rounded">
          <p className="m-0">Vista de gestión de usuarios</p>
        </div>
      )}
    </div>
  );
};

export default Admin;