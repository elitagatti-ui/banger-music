import { Link } from "react-router-dom";

function Error() {

    return (
        <main className="error-page">

            <div className="error-content">

                {/* ÍCONO */}

                <div className="error-icon">
                    ♪
                </div>


                {/* CÓDIGO */}

                <span className="error-code">
                    ERROR 404
                </span>


                {/* TÍTULO */}

                <h1>
                    Página no encontrada
                </h1>


                {/* DESCRIPCIÓN */}

                <p>
                    Parece que esta canción se perdió en el camino.
                    <br />
                    La página que estás buscando no existe.
                </p>


                {/* BOTÓN */}

                <Link
                    to="/"
                    className="error-button"
                >
                    <i className="bi bi-house-fill"></i>
                    Volver al inicio
                </Link>

            </div>

        </main>
    );
}

export default Error;