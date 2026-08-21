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