import { useEffect, useRef, useState } from "react";

function Reproductor({ cancion }) {
  const audioRef = useRef(null);

  const [volumen, setVolumen] = useState(1);

  // reproducir/ pausar
  //

  const togglePlay = () => {};
  const cambiarVolumen = (e) => {
    const nuevoVolumen = Number(e.target.value);

    setVolumen(nuevoVolumen);

    audioRef.current.volume = nuevoVolumen;
  };

  return (
    <div className="reproductor">
      {/* INFORMACIÓN */}

      <div className="reproductor-info">
        <img src={cancion.imagen} alt={cancion.nombre} />

        <div>
          <h4>{cancion.nombre}</h4>

          <p>{cancion.artista}</p>
        </div>
      </div>

      {/* controles */}

      <div className="reproductor-center">
        <div className="reproductor-buttons">
          <button>
            <i className="bi bi-skip-start-fill"></i>
          </button>

          <button className="play-main" onClick={togglePlay}>
            <i className={"bi bi-play-fill"}></i>
          </button>

          <button>
            <i className="bi bi-skip-end-fill"></i>
          </button>
        </div>

        <div className="reproductor-progress"></div>
      </div>

      {/* VOLUMEN */}

      <div className="reproductor-volume">
        <i className="bi bi-volume-up-fill"></i>

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volumen}
          onChange={cambiarVolumen}
        />
      </div>
    </div>
  );
}

export default Reproductor;
