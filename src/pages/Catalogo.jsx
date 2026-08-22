import Cancion from "../components/CancionCardj";
import canciones from "../data/canciones";
import { useState } from "react";
import Reproductor from "../components/Reproductor";
function Catalogo() {
  const [cancionActual, setCancionActual] = useState(null);
  return (
    <div className="container py-5">
      <section className="catalogo-header">
        <p>DESCUBRÍ MÚSICA</p>

        <h1>Catálogo</h1>

        <span>Cuando las Palabras fallan, La Música habla.</span>
      </section>
      <div className="catalogo-title">
        <h2>Todas las canciones</h2>

        <button>+ Agregar canción</button>
      </div>
      <div className="row g-4">
        {canciones.map((cancion) => (
          <div className="col-6 col-md-4 col-lg-3" key={cancion.id}>
            <Cancion
              id={cancion.id}
              nombre={cancion.nombre}
              artista={cancion.artista}
              imagen={cancion.imagen}
              album={cancion.album}
              genero={cancion.genero}
              onPlay={() => setCancionActual(cancion)}
            />
          </div>
        ))}
      </div>
      {/* REPRODUCTOR */}

      {cancionActual && <Reproductor cancion={cancionActual} />}
    </div>
  );
}
export default Catalogo;
