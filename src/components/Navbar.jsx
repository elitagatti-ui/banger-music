import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { Logo } from "./Logo";

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { usuarioLogueado, logout } = useAppContext();
  const navegacion = useNavigate();

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  const handleLogout = () => {
    cerrarMenu();
    logout();
    navegacion("/login");
  };

  return (
    <nav className="navbar">
      {/* LOGO */}
      <div className="logo">
        <Link to="/" onClick={cerrarMenu} style={{ textDecoration: "none" }}>
          <Logo showText={true} />
        </Link>
      </div>

      {/* LINKS */}
      <div className={`nav-links ${menuAbierto ? "menu-abierto" : ""}`}>
        <Link to="/" onClick={cerrarMenu}>
          inicio
        </Link>

        <Link to="/detalle" onClick={cerrarMenu}>
          Explorar
        </Link>

        <Link to="/playlists" onClick={cerrarMenu}>
          Playlists
        </Link>

        <Link to="/ayuda" onClick={cerrarMenu}>
          Ayuda
        </Link>

        {/* MOBILE */}
        <div className="mobile-account">
          {usuarioLogueado ? (
            <>
              {usuarioLogueado.rol === "admin" && (
                <Link to="/admin" onClick={cerrarMenu}>
                  Panel Admin
                </Link>
              )}
              <span className="user-display-name">
                {usuarioLogueado.nombre || usuarioLogueado.email}
              </span>
              <button onClick={handleLogout}>Cerrar sesión</button>
            </>
          ) : (
            <>
              <Link to="/registro" onClick={cerrarMenu}>
                Registrarse
              </Link>
              <Link to="/login" onClick={cerrarMenu}>
                Iniciar sesión
              </Link>
              <button onClick={() => navegacion("/registro")}>
                Probar ahora
              </button>
            </>
          )}
        </div>
      </div>

      <div className="separator"></div>

      {/* DESKTOP */}
      <div className="account-links">
        {usuarioLogueado ? (
          <>
            {usuarioLogueado.rol === "admin" && (
              <Link to="/admin">Panel Admin</Link>
            )}
            <span className="user-display-name">
              {usuarioLogueado.nombre || usuarioLogueado.email}
            </span>
            <button onClick={handleLogout}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <Link to="/registro">Registrarse</Link>
            <Link to="/login">Iniciar sesión</Link>
            <button onClick={() => navegacion("/registro")}>
              Probar ahora
            </button>
          </>
        )}
      </div>

      {/* BOTÓN HAMBURGUESA */}
      <button
        className={`hamburger ${menuAbierto ? "activo" : ""}`}
        onClick={() => setMenuAbierto(!menuAbierto)}
        aria-label="Abrir menú"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
}

export default Navbar;