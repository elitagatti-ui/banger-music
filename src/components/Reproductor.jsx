import { useEffect, useRef, useState } from "react";

function Reproductor({ cancion }) {

    const audioRef = useRef(null);

    const [reproduciendo, setReproduciendo] = useState(false);
    const [progreso, setProgreso] = useState(0);
    const [duracion, setDuracion] = useState(0);
    const [volumen, setVolumen] = useState(1);


  

    const togglePlay = () => {

        if (!cancion) return;

        if (reproduciendo) {

            audioRef.current.pause();

        } else {

            audioRef.current.play();

        }

    };
        const actualizarProgreso = () => {

        if (!audioRef.current) return;

        setProgreso(audioRef.current.currentTime);

    };
    const cargarDuracion = () => {

        if (!audioRef.current) return;

        setDuracion(audioRef.current.duration);

    };
        const cambiarProgreso = (e) => {

        const nuevoTiempo = Number(e.target.value);

        audioRef.current.currentTime = nuevoTiempo;

        setProgreso(nuevoTiempo);

    };
}