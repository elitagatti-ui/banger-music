import React from 'react';

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

                <a href="/">Catalogo</a>

                <a href="/">Explorar</a>

                <a href="/">Playlists</a>

                <a href="/">Ayuda</a>

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