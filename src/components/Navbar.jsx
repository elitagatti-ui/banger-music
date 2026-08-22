import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  return (
    <nav className="navbar">
      {/* LOGO */}
      <div className="logo">
        <div className="logo-icon">♪</div>

        <span>Banger-MusicA</span>
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

        <div className="mobile-account">
          <a href="/" onClick={cerrarMenu}>
            Registrarse
          </a>

          <a href="/" onClick={cerrarMenu}>
            Iniciar sesión
          </a>

          <button onClick={cerrarMenu}>Probar ahora</button>
        </div>
      </div>

      <div className="separator"></div>

      <div className="account-links">
        <a href="/">Registrarse</a>

        <a href="/">Iniciar sesión</a>

        <button>Probar ahora</button>
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
