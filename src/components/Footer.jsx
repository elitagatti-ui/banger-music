import { Link, useLocation } from "react-router-dom";
import { Logo } from "./Logo"
import "./Footer.css";

const Footer = () => {
  const location = useLocation();

  const handleInicioClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="app-footer mt-auto py-4">
      <div className="container">
        <div className="row gy-3 align-items-center text-center text-md-start">
          {/* Componente Logo reusado */}
          <div className="col-12 col-md-4">
            <div className="footer-logo-container">
              <Logo />
            </div>
            <p className="footer-tagline small mb-0 mt-2">
              Tu música, tus playlists, tu ritmo.
            </p>
          </div>

          {/* Links de navegación */}
          <div className="col-12 col-md-4 text-center">
            <ul className="footer-links list-inline mb-0">
              <li className="list-inline-item mx-2">
                <Link to="/" onClick={handleInicioClick}>
                  Inicio
                </Link>
              </li>
              <li className="list-inline-item mx-2">
                <Link to="/playlists">Playlists</Link>
              </li>
              <li className="list-inline-item mx-2">
                <Link to="/ayuda">Ayuda</Link>
              </li>
            </ul>
          </div>

          {/* Copyright */}
          <div className="col-12 col-md-4 text-center text-md-end">
            <span className="small text-secondary">
              © {new Date().getFullYear()} Banger. Todos los derechos
              reservados.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
