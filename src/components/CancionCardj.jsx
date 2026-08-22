import { Link } from "react-router-dom"

function Cancion({ id, nombre, artista, imagen, album, genero, onPlay }) {

    return (
        <div className="card bg-dark text-white h-100">

            <img
                src={imagen}
                className="card-img-top"
                alt={nombre}
            />

            <div className="card-body">

                <h5 className="card-title">
                    {nombre}
                </h5>

                <p className="card-text text-secondary">
                    {artista}
                </p>

                <p className="card-text text-secondary">
                    {album}
                </p>

                <p className="card-text text-secondary">
                    {genero}
                </p>

                <div className="card-buttons">

                    <button
                        className="btn-reproducir"
                        onClick={onPlay}
                    >
                        <i className="bi bi-play-fill"></i>
                        Reproducir
                    </button>

                    <Link
                        to={`/detalle/${id}`}
                        className="btn-detalle"
                    >
                        Ver detalle
                        <i className="bi bi-arrow-right"></i>
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default Cancion;