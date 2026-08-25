import { useState } from "react";

function Playlists() {

  const [nombre, setNombre] = useState("");

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