import { useState } from "react";

function Playlists() {

  const [nombre, setNombre] = useState("");
  const crearPlaylist = () => {

  if (!nombre.trim()) {
    alert("Escribí un nombre para la playlist");
    return;
  }

  const playlist = {
    id: Date.now(),
    nombre: nombre,
    canciones: []
  };

  const playlistsGuardadas =
    JSON.parse(localStorage.getItem("playlists")) || [];

  playlistsGuardadas.push(playlist);

  localStorage.setItem(
    "playlists",
    JSON.stringify(playlistsGuardadas)
  );

  setNombre("");

  alert("Playlist creada");
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

      <button>
        Crear Playlist
      </button>

    </div>
  );
}

export default Playlists;