import { useState, useEffect } from "react";
import "./Hero.css";

export const Hero = ({ canciones = [], onPlay }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (!canciones || canciones.length === 0) return;

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % canciones.length);
        setFade(true);
      }, 300);
    }, 6000);

    return () => clearInterval(interval);
  }, [canciones]);

  if (!canciones || canciones.length === 0) return null;

  const currentSong = canciones[currentIndex];

  return (
    <section
      className="hero-container"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(10, 14, 23, 0.95) 0%, rgba(10, 14, 23, 0.75) 50%, rgba(10, 14, 23, 0.45) 100%), url(${currentSong.imagen})`
      }}
    >
      <div className={`hero-content ${fade ? "fade-in" : "fade-out"}`}>
        <span className="hero-badge">DESTACADO DE LA SEMANA</span>
        <h1 className="hero-title">{currentSong.nombre || currentSong.titulo}</h1>
        <p className="hero-subtitle">
          {currentSong.artista} · {currentSong.genero || "Track"}
        </p>
        <button
          type="button"
          className="hero-btn"
          onClick={() => onPlay(currentSong)}
        >
          <i className="bi bi-play-fill me-2"></i> Reproducir Ahora
        </button>
      </div>
    </section>
  );
};