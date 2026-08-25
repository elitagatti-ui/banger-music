import React, { useState } from "react";
import Swal from "sweetalert2";
import "./Ayuda.css";

const preguntasFrecuentes = [
  {
    id: 1,
    pregunta: "¿Cómo creo una playlist personalizada?",
    respuesta:
      "Iniciá sesión en tu cuenta, andá a la sección 'Playlists' en el menú principal, ingresá el nombre que quieras en el campo de texto y hacé clic en 'Crear Playlist'.",
  },
  {
    id: 2,
    pregunta: "¿Puedo escuchar música sin registrarme?",
    respuesta:
      "Sí, podés explorar todo el catálogo y reproducir canciones libremente. Sin embargo, para guardar tus playlists personalizadas vas a necesitar iniciar sesión.",
  },
  {
    id: 3,
    pregunta: "¿Cómo agrego o quito canciones de mis listas?",
    respuesta:
      "Dentro de cada canción en el catálogo vas a encontrar la opción para vincularla a tus listas. Para eliminarla, ingresá a la playlist correspondiente y hacé clic en el ícono de eliminar.",
  },
  {
    id: 4,
    pregunta: "¿Qué hago si una canción no se reproduce correctamente?",
    respuesta:
      "Verificá tu conexión a internet o intentá recargar la página. Si el problema persiste, podés enviarnos un mensaje mediante el formulario de soporte de abajo.",
  },
];

function Ayuda() {
  const [abierta, setAbierta] = useState(null);

  const togglePregunta = (id) => {
    setAbierta(abierta === id ? null : id);
  };

  const handleSoporte = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "¡Mensaje enviado!",
      text: "Nos pondremos en contacto con vos a la brevedad.",
      icon: "success",
      background: "#121824",
      color: "#FFFFFF",
      confirmButtonColor: "#FF6500",
      iconColor: "#FF6500",
    });
    e.target.reset();
  };

  return (
    <div className="container py-5 ayuda-container">
      {/* Encabezado */}
      <header className="text-center mb-5">
        <span className="ayuda-badge">SOPORTE BANGER</span>
        <h1 className="ayuda-title fw-bold">¿En qué podemos ayudarte?</h1>
        <p className="ayuda-subtitle">
          Encontrá respuestas rápidas a las dudas más comunes sobre la plataforma.
        </p>
      </header>

      {/* Acordeón de FAQ */}
      <section className="row justify-content-center mb-5">
        <div className="col-12 col-lg-8">
          <div className="faq-list">
            {preguntasFrecuentes.map((item) => (
              <div
                key={item.id}
                className={`faq-item ${abierta === item.id ? "activo" : ""}`}
              >
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => togglePregunta(item.id)}
                >
                  <span>{item.pregunta}</span>
                  <i
                    className={`bi bi-chevron-${
                      abierta === item.id ? "up" : "down"
                    }`}
                  ></i>
                </button>
                {abierta === item.id && (
                  <div className="faq-answer">
                    <p className="mb-0">{item.respuesta}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulario de contacto directo */}
      <section className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="soporte-card p-4 rounded">
            <h3 className="h4 text-white mb-2 fw-semibold">
              ¿No encontraste lo que buscabas?
            </h3>
            <p className="text-secondary small mb-4">
              Envianos tu consulta y el equipo técnico de BANGER te responderá pronto.
            </p>
            <form onSubmit={handleSoporte}>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <input
                    type="text"
                    className="form-control soporte-input"
                    placeholder="Tu nombre"
                    required
                  />
                </div>
                <div className="col-12 col-md-6">
                  <input
                    type="email"
                    className="form-control soporte-input"
                    placeholder="Tu email"
                    required
                  />
                </div>
                <div className="col-12">
                  <textarea
                    className="form-control soporte-input"
                    rows="3"
                    placeholder="Escribí tu mensaje..."
                    required
                  ></textarea>
                </div>
                <div className="col-12 text-end">
                  <button type="submit" className="btn btn-banger-primary">
                    Enviar mensaje
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Ayuda;