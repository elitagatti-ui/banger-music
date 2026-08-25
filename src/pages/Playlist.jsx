import { useEffect, useState } from "react";

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


  return (
    <div className="container py-5">

      <h1>Mis Playlists</h1>

      <input
        type="text"
        placeholder="Nombre de la playlist"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

     <button onClick={crearPlaylist}>
  Crear Playlist
</button>
<div className="lista-playlists">

        {playlists.length === 0 ? (

          <p>
            Todavía no tenés ninguna playlist.
          </p>

        ) : (

          playlists.map((playlist) => (

            <div
              className="playlist-card"
              key={playlist.id}
            >

              <h3>
                {playlist.nombre}
              </h3>

              <p>
                {playlist.canciones.length} canciones
              </p>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default Playlists;