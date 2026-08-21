function Cancion({ nombre, artista, imagen,album,genero }) {

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

                <button className="btn-reproducir">
    <i className="bi bi-play-fill"></i>
    Reproducir
</button>

            </div>

        </div>
    );
}

export default Cancion;
