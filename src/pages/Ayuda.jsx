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

// Escapa caracteres críticos para prevenir Inyección HTML / XSS en Render
const sanitizeString = (str) => {
  return str
    .trim()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
};

function Ayuda() {
  const [abierta, setAbierta] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });
  const [errors, setErrors] = useState({});

  const togglePregunta = (id) => {
    setAbierta(abierta === id ? null : id);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    // 1. Nombre: Solo letras, espacios y acentos (2 a 50 chars). No acepta símbolos ni código.
    const nombreClean = formData.nombre.trim();
    const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/;
    if (!nombreClean) {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    } else if (!regexNombre.test(nombreClean)) {
      nuevosErrores.nombre = "Solo se permiten letras y espacios (2 a 50 caracteres).";
    }

    // 2. Email: Formato estricto de e-mail (max 100 chars)
    const emailClean = formData.email.trim();
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailClean) {
      nuevosErrores.email = "El email es obligatorio.";
    } else if (emailClean.length > 100 || !regexEmail.test(emailClean)) {
      nuevosErrores.email = "Ingresá un correo electrónico válido.";
    }

    // 3. Mensaje: Entre 10 y 500 chars. Rechaza etiquetas HTML (<script>, <img>, etc)
    const mensajeClean = formData.mensaje.trim();
    const regexSinHTML = /<[^>]*>/g;
    if (!mensajeClean) {
      nuevosErrores.mensaje = "El mensaje no puede estar vacío.";
    } else if (mensajeClean.length < 10 || mensajeClean.length > 500) {
      nuevosErrores.mensaje = "El mensaje debe tener entre 10 y 500 caracteres.";
    } else if (regexSinHTML.test(mensajeClean)) {
      nuevosErrores.mensaje = "No se permiten etiquetas o código HTML/JS.";
    }

    setErrors(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSoporte = (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    // Sanitización final antes de enviar
    const datosSeguros = {
      nombre: sanitizeString(formData.nombre),
      email: sanitizeString(formData.email),
      mensaje: sanitizeString(formData.mensaje),
    };

    console.log("Payload limpio y seguro:", datosSeguros);

    Swal.fire({
      title: "¡Mensaje enviado!",
      text: "Nos pondremos en contacto con vos a la brevedad.",
      icon: "success",
      background: "#121824",
      color: "#FFFFFF",
      confirmButtonColor: "#FF6500",
      iconColor: "#FF6500",
    });

    setFormData({ nombre: "", email: "", mensaje: "" });
    setErrors({});
  };

  return (
    <div className="container py-5 ayuda-container">
      <header className="text-center mb-5">
        <span className="ayuda-badge">SOPORTE BANGER</span>
        <h1 className="ayuda-title fw-bold">¿En qué podemos ayudarte?</h1>
        <p className="ayuda-subtitle">
          Encontrá respuestas rápidas a las dudas más comunes sobre la plataforma.
        </p>
      </header>

      {/* Preguntas frecuentes */}
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

      {/* Formulario blindado */}
      <section className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="soporte-card p-4 rounded">
            <h3 className="h4 text-white mb-2 fw-semibold">
              ¿No encontraste lo que buscabas?
            </h3>
            <p className="text-secondary small mb-4">
              Envianos tu consulta y el equipo técnico de BANGER te responderá pronto.
            </p>
            <form onSubmit={handleSoporte} noValidate>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className={`form-control soporte-input ${
                      errors.nombre ? "is-invalid" : ""
                    }`}
                    placeholder="Tu nombre"
                    maxLength={50}
                  />
                  {errors.nombre && (
                    <div className="invalid-feedback">{errors.nombre}</div>
                  )}
                </div>

                <div className="col-12 col-md-6">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-control soporte-input ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    placeholder="Tu email"
                    maxLength={100}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>

                <div className="col-12">
                  <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    className={`form-control soporte-input ${
                      errors.mensaje ? "is-invalid" : ""
                    }`}
                    rows="3"
                    placeholder="Escribí tu mensaje..."
                    maxLength={500}
                  ></textarea>
                  {errors.mensaje && (
                    <div className="invalid-feedback">{errors.mensaje}</div>
                  )}
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