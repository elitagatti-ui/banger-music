import Cancion from "../components/CancionCardj";
import cancionesIniciales from "../data/canciones";
import { useState } from "react";
import Reproductor from "../components/Reproductor";
import { Hero } from "../components/Hero";

function Catalogo() {
  const [cancionActual, setCancionActual] = useState(null);
  const [canciones] = useState(() => {
    const guardadas = localStorage.getItem("canciones");
    return guardadas ? JSON.parse(guardadas) : cancionesIniciales;
  });
  const [busqueda, setBusqueda] = useState("");

  const cancionesFiltradas = canciones.filter(
    (cancion) =>
      cancion.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      cancion.artista.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="container py-5">
      <div className="buscador-catalogo">
        <i className="bi bi-search"></i>

        <input
          type="text"
          placeholder="Buscar canción o artista..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        {busqueda && (
          <button
            className="btn-limpiar-busqueda"
            onClick={() => setBusqueda("")}
          >
            <i className="bi bi-x"></i>
          </button>
        )}
      </div>

      {!busqueda.trim() && (
        <Hero
          canciones={canciones}
          onPlay={(cancion) => setCancionActual(cancion)}
        />
      )}

      <header className="catalogo-section-header">
        <span className="catalogo-badge">DESCUBRÍ MÚSICA</span>
        <h2 className="catalogo-main-title">
          {busqueda ? `Resultados para "${busqueda}"` : "Todas las canciones"}
        </h2>
        <p className="catalogo-quote">
          "Cuando las palabras fallan, la música habla."
        </p>
      </header>

      {cancionesFiltradas.length > 0 ? (
        <div className="row g-4 songs-grid">
          {cancionesFiltradas.map((cancion) => (
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
      ) : (
        <div className="sin-resultados">
          <i className="bi bi-music-note-list"></i>
          <h3>No encontramos canciones</h3>
          <p>Probá buscando otro nombre de canción o artista.</p>
        </div>
      )}

      {cancionActual && <Reproductor cancion={cancionActual} />}
    </div>
  );
}

export default Catalogo;