import React from 'react';
import { Link } from "react-router-dom";

function Navbar() {
    return (

        
        <nav className="navbar">

            {/* LOGO */}
            <div className="logo">
                <div className="logo-icon">
                    ♪
                </div>

                <span>Banger-MusicA</span>
            </div>


            {/* LINKS */}
            <div className="nav-links">

                <Link to="/">
                    inicio
                </Link>

                <Link to="/detalle">
                    Explorar
                </Link>

                <Link to="/playlists">
                    Playlists
                </Link>

                <Link to="/ayuda">
                    Ayuda
                </Link>

            </div>



            {/* SEPARADOR */}
            <div className="separator"></div>


            {/* CUENTA */}
            <div className="account-links">

                <a href="/">
                    Registrarse
                </a>

                <a href="/">
                    Iniciar sesión
                </a>

                <button>
                    Probar ahora
                </button>

            </div>

        </nav>
    );
}

export default Navbar;