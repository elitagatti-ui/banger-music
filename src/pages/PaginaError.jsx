import { Link } from "react-router-dom";

function Error() {
  return (
    <main className="error-page">
      <div className="error-content">
        <div className="error-icon">♪</div>

        <span className="error-code">ERROR 404</span>

        <h1>Página no encontrada</h1>

        <p>
          Parece que esta canción se perdió en el camino.
          <br />
          La página que estás buscando no existe.
        </p>

        <Link to="/" className="error-button">
          <i className="bi bi-house-fill"></i>
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}

export default Error;
