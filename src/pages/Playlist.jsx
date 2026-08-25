import { useEffect, useState } from "react";
import canciones from "../data/canciones";



function Playlists() {

  const [nombre, setNombre] = useState("");

  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {


    const playlistsGuardadas =
      JSON.parse(localStorage.getItem("playlists")) || [];

    setPlaylists(playlistsGuardadas);

  }, []);

  const crearPlaylist = () => {

  if (!nombre.trim()) {
    alert("Escribí un nombre para la playlist");
    return;
  }

  const nuevaPlaylist = {
    id: Date.now(),
    nombre: nombre,
    canciones: []
  };

     const playlistsActuales =
      JSON.parse(localStorage.getItem("playlists")) || [];

    playlistsActuales.push(nuevaPlaylist);

    localStorage.setItem(
      "playlists",
      JSON.stringify(playlistsActuales)
    );
   setPlaylists(playlistsActuales);

  setNombre("");

};
const eliminarCancion = (playlistId, cancionId) => {
  const playlistsActuales =
    JSON.parse(localStorage.getItem("playlists")) || [];

  const playlistsActualizadas = playlistsActuales.map((playlist) => {
    if (playlist.id === playlistId) {
      return {
        ...playlist,
        canciones: playlist.canciones.filter(
          (id) => id !== cancionId
        )
      };
    }

    return playlist;
  });

  localStorage.setItem(
    "playlists",
    JSON.stringify(playlistsActualizadas)
  );

  setPlaylists(playlistsActualizadas);
};

  return (
    <div className="container py-5">

      <h1>Mis Playlists</h1>
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
     onClick={crearPlaylist}>
  Crear Playlist
</button>
</div>
<div className="lista-playlists">

        {playlists.length === 0 ? (

          <p>
            Todavía no tenés ninguna playlist.
          </p>

        ) : (

                   playlists.map((playlist) => {

            const cancionesPlaylist = canciones.filter(
              (cancion) => playlist.canciones.includes(cancion.id)
            );

            return (
              <div
                className="playlist-card"
                key={playlist.id}
              >

                <h3>
                  {playlist.nombre}
                </h3>

                <p>
                  {cancionesPlaylist.length} canciones
                </p>
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

        <h4>
          {cancion.nombre}
        </h4>

        <p>
          {cancion.artista}
        </p>
<button
  className="btn-eliminar"
  onClick={() => eliminarCancion(playlist.id, cancion.id)}
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