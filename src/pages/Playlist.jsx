import { useEffect, useState } from "react";
import cancionesIniciales from "../data/canciones";
import Swal from "sweetalert2";
import { useAppContext } from "../context/AppContext";
const canciones = JSON.parse(localStorage.getItem("canciones")) || cancionesIniciales;

function Playlists() {
  const [nombre, setNombre] = useState("");
  const [playlists, setPlaylists] = useState([]);

  // Usuario actualmente logueado
  const { usuarioLogueado } = useAppContext();

  // Cargar solamente las playlists del usuario
  useEffect(() => {
    if (!usuarioLogueado) {
      setPlaylists([]);
      return;
    }

    const playlistsGuardadas =
      JSON.parse(localStorage.getItem("playlists")) || [];

    const misPlaylists = playlistsGuardadas.filter(
      (playlist) => playlist.usuario === usuarioLogueado.email
    );

    setPlaylists(misPlaylists);
  }, [usuarioLogueado]);

  const crearPlaylist = () => {
    // Verificar que haya usuario logueado
    if (!usuarioLogueado) {
      Swal.fire({
        title: "Iniciá sesión",
        text: "Tenés que iniciar sesión para crear una playlist",
        icon: "warning",
        background: "#121824",
        color: "#FFFFFF",
        confirmButtonColor: "#FF6500",
        confirmButtonText: "Entendido",
        iconColor: "#FF6500",
      });
      return;
    }

    // Verificar nombre
    if (!nombre.trim()) {
      Swal.fire({
        title: "Error",
        text: "Ingresar Nombre de Playlist",
        icon: "error",
        background: "#121824",
        color: "#FFFFFF",
        confirmButtonColor: "#FF6500",
        confirmButtonText: "Entendido",
        iconColor: "#E53E3E",
      });
      return;
    }

    const nuevaPlaylist = {
      id: Date.now(),
      nombre: nombre,
      usuario: usuarioLogueado.email,
      canciones: [],
    };

    const playlistsActuales =
      JSON.parse(localStorage.getItem("playlists")) || [];

    playlistsActuales.push(nuevaPlaylist);

    localStorage.setItem(
      "playlists",
      JSON.stringify(playlistsActuales)
    );

    // Mostrar solamente las playlists del usuario
    const misPlaylists = playlistsActuales.filter(
      (playlist) => playlist.usuario === usuarioLogueado.email
    );

    setPlaylists(misPlaylists);
    setNombre("");

    Swal.fire({
      title: "¡Creaste Playlist!",
      text: "Playlist creada correctamente",
      icon: "success",
      background: "#121824",
      color: "#FFFFFF",
      confirmButtonColor: "#FF6500",
      confirmButtonText: "Entendido",
      iconColor: "#FF6500",
    });
  };

  const eliminarCancion = (playlistId, cancionId) => {
    // Verificar que haya usuario logueado
    if (!usuarioLogueado) {
      Swal.fire({
        title: "Iniciá sesión",
        text: "Tenés que iniciar sesión para modificar tus playlists",
        icon: "warning",
        background: "#121824",
        color: "#FFFFFF",
        confirmButtonColor: "#FF6500",
        confirmButtonText: "Entendido",
        iconColor: "#FF6500",
      });
      return;
    }

    const playlistsActuales =
      JSON.parse(localStorage.getItem("playlists")) || [];

    const playlistsActualizadas = playlistsActuales.map((playlist) => {
      // Solamente modificar una playlist que pertenezca al usuario
      if (
        playlist.id === playlistId &&
        playlist.usuario === usuarioLogueado.email
      ) {
        return {
          ...playlist,
          canciones: playlist.canciones.filter(
            (id) => id !== cancionId
          ),
        };
      }

      return playlist;
    });

    localStorage.setItem(
      "playlists",
      JSON.stringify(playlistsActualizadas)
    );

    // Volver a mostrar solamente las playlists del usuario
    const misPlaylists = playlistsActualizadas.filter(
      (playlist) => playlist.usuario === usuarioLogueado.email
    );

    setPlaylists(misPlaylists);

    Swal.fire({
      title: "¡Canción eliminada!",
      text: "Eliminaste correctamente tu canción",
      icon: "success",
      background: "#121824",
      color: "#FFFFFF",
      confirmButtonColor: "#FF6500",
      confirmButtonText: "Entendido",
      iconColor: "#FF6500",
    });
  };

  return (
    <div className="container py-5">
      <h1>Mis Playlists</h1>

      {!usuarioLogueado && (
        <p>
          Iniciá sesión para crear y administrar tus playlists.
        </p>
      )}

      {usuarioLogueado && (
        <div className="form-playlist">
          <input
            className="input-playlist"
            type="text"
            placeholder="Nombre de la playlist"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <button
            className="btn-crear-playlist"
            onClick={crearPlaylist}
          >
            Crear Playlist
          </button>
        </div>
      )}

      <div className="lista-playlists">
        {playlists.length === 0 ? (
          <p>Todavía no tenés ninguna playlist.</p>
        ) : (
          playlists.map((playlist) => {
            const cancionesPlaylist = canciones.filter((cancion) =>
              playlist.canciones.includes(cancion.id)
            );

            return (
              <div
                className="playlist-card"
                key={playlist.id}
              >
                <h3>{playlist.nombre}</h3>

                <p>{cancionesPlaylist.length} canciones</p>

                <div className="playlist-canciones">
                  {cancionesPlaylist.map((cancion) => (
                    <div
                      className="playlist-cancion"
                      key={cancion.id}
                    >
                      <img
                        src={cancion.imagen}
                        alt={cancion.nombre}
                      />

                      <div>
                        <h4>{cancion.nombre}</h4>

                        <p>{cancion.artista}</p>

                        <button
                          className="btn-eliminar"
                          onClick={() =>
                            eliminarCancion(
                              playlist.id,
                              cancion.id
                            )
                          }
                        >
                          Eliminar canción
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Playlists;