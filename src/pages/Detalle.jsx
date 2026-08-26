import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import cancionesIniciales from "../data/canciones";
import Swal from "sweetalert2";
import { useAppContext } from "../context/AppContext";

function Detalle() {
  const { id } = useParams();
  const [playlists, setPlaylists] = useState([]);
  const [playlistSeleccionada, setPlaylistSeleccionada] = useState("");
  const { usuarioLogueado } = useAppContext();

  const canciones =
    JSON.parse(localStorage.getItem("canciones")) || cancionesIniciales;

  const agregarAPlaylist = () => {
    if (!playlistSeleccionada) {
      alert("Seleccioná una playlist");
      return;
    }

    const playlistsGuardadas =
      JSON.parse(localStorage.getItem("playlists")) || [];

    const playlistsActualizadas = playlistsGuardadas.map((playlist) => {
      if (playlist.id === Number(playlistSeleccionada)) {
        return {
          ...playlist,
          canciones: [...playlist.canciones, cancion.id],
        };
      }

      return playlist;
    });

    localStorage.setItem("playlists", JSON.stringify(playlistsActualizadas));

    setPlaylists(playlistsActualizadas);

    Swal.fire({
      title: "¡Cancion Agregada!",
      text: "Cancion en Playlist",
      icon: "success",
      background: "#121824",
      color: "#FFFFFF",
      confirmButtonColor: "#FF6500",
      confirmButtonText: "Entendido",
      iconColor: "#FF6500",
    });
  };

  useEffect(() => {
    const playlistsGuardadas =
      JSON.parse(localStorage.getItem("playlists")) || [];

    setPlaylists(playlistsGuardadas);
  }, []);

  const cancion = canciones.find((cancion) => cancion.id === Number(id));

  if (!cancion) {
    return (
      <div className="detalle-page detalle-error">
        <h2>🎵 Canción no encontrada</h2>

        <p>La canción no existe o fue eliminada.</p>

        <Link to="/" className="detalle-btn">
          ← Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <main className="detalle-page">
      <section className="detalle-main">
        <div className="detalle-cover">
          <img src={cancion.imagen} alt={cancion.nombre} />
        </div>

        <div className="detalle-info">
          <span className="detalle-label">CANCIÓN</span>

          <h1>{cancion.nombre}</h1>

          <h2>Artista: {cancion.artista}</h2>

          <p className="detalle-album">
            Álbum: <strong>{cancion.album}</strong>
          </p>
          {usuarioLogueado && (
            <div className="detalle-actions">
              <select
                className="select-playlist"
                value={playlistSeleccionada}
                onChange={(e) => setPlaylistSeleccionada(e.target.value)}
              >
                <option value="">Elegir Playlist</option>

                {playlists.map((playlist) => (
                  <option key={playlist.id} value={playlist.id}>
                    {playlist.nombre}
                  </option>
                ))}
              </select>
              <button className="btn-detalle" onClick={agregarAPlaylist}>
                <i className="bi bi-play-fill"></i>
                Agregar a Playlist
              </button>
            </div>
          )}

          {/* DATOS */}

          <div className="detalle-data">
            <div>
              <span>GÉNERO</span>
              <strong>{cancion.genero}</strong>
            </div>

            <div>
              <span>AÑO</span>
              <strong>{cancion.año}</strong>
            </div>

            <div>
              <span>ÁLBUM</span>
              <strong>{cancion.album}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* ESTADÍSTICAS */}

      <section className="detalle-section">
        <h2>Estadísticas</h2>

        <div className="stats-grid">
          <div className="stat-card">
            <span>▶ REPRODUCCIONES</span>

            <strong>{cancion.reproducciones || "1.2 M"}</strong>
          </div>

          <div className="stat-card">
            <span>♫ GÉNERO</span>

            <strong>{cancion.genero}</strong>
          </div>

          <div className="stat-card">
            <span>★ PREMIOS</span>

            <strong>{cancion.premios || "Reconocida"}</strong>
          </div>
        </div>
      </section>

      {/* DESCRIPCIÓN */}

      <section className="detalle-section">
        <h2>Sobre esta canción</h2>

        <div className="description-card">
          <p>
            {cancion.descripcion ||
              `${cancion.nombre} es una canción interpretada por ${cancion.artista}, perteneciente al álbum ${cancion.album}. Su estilo combina diferentes elementos musicales y se convirtió en una canción reconocida dentro de su género.`}
          </p>
        </div>
      </section>

      {/* VOLVER */}

      <div className="detalle-bottom">
        <Link to="/" className="detalle-btn">
          ← Volver al catálogo
        </Link>
      </div>
    </main>
  );
}

export default Detalle;
