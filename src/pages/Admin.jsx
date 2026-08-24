import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import cancionesIniciales from "../data/canciones.js";

const Admin = () => {
  const [tabActiva, setTabActiva] = useState("canciones");
  const [canciones, setCanciones] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [idEnEdicion, setIdEnEdicion] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Cargar Canciones desde localStorage
  useEffect(() => {
    const cancionesGuardadas = JSON.parse(localStorage.getItem("canciones"));
    if (cancionesGuardadas && cancionesGuardadas.length > 0) {
      setCanciones(cancionesGuardadas);
    } else {
      setCanciones(cancionesIniciales);
      localStorage.setItem("canciones", JSON.stringify(cancionesIniciales));
    }
  }, []);

  // Cargar Usuarios desde localStorage
  useEffect(() => {
    const usuariosGuardados =
      JSON.parse(localStorage.getItem("usuarios")) || [];
    setUsuarios(usuariosGuardados);
  }, []);

  // Configuración base de SweetAlert idéntica a Login
  const mostrarAlerta = (titulo, texto, icono, callback) => {
    Swal.fire({
      title: titulo,
      text: texto,
      icon: icono,
      background: "#121824",
      color: "#FFFFFF",
      confirmButtonColor: "#FF6500",
      confirmButtonText: "Entendido",
      iconColor: icono === "error" ? "#E53E3E" : "#FF6500",
    }).then(() => {
      if (callback) callback();
    });
  };

  // Guardar (Alta / Edición) Canción
  const onGuardarCancion = (data) => {
    let listaActualizada;

    if (idEnEdicion) {
      listaActualizada = canciones.map((c) =>
        c.id === idEnEdicion ? { ...c, ...data, anio: Number(data.anio) } : c,
      );
      mostrarAlerta(
        "¡Actualizado!",
        "La canción fue modificada con éxito.",
        "success",
      );
    } else {
      const nuevaCancion = {
        id: Date.now(),
        ...data,
        anio: Number(data.anio),
      };
      listaActualizada = [...canciones, nuevaCancion];
      mostrarAlerta(
        "¡Creada!",
        "La canción fue agregada al catálogo.",
        "success",
      );
    }

    setCanciones(listaActualizada);
    localStorage.setItem("canciones", JSON.stringify(listaActualizada));
    limpiarFormulario();
  };

  // Cargar datos en el formulario para editar y hacer scroll hacia arriba
  const handleEditarCancion = (cancion) => {
    setIdEnEdicion(cancion.id);
    setValue("nombre", cancion.nombre);
    setValue("artista", cancion.artista);
    setValue("album", cancion.album);
    setValue("anio", cancion.anio);
    setValue("genero", cancion.genero);
    setValue("imagen", cancion.imagen);
    setValue("archivo", cancion.archivo);
    setMostrarFormulario(true);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Limpiar y cerrar formulario
  const limpiarFormulario = () => {
    reset();
    setIdEnEdicion(null);
    setMostrarFormulario(false);
  };

  // Eliminar Canción con Confirmación
  const handleEliminarCancion = (id, nombre) => {
    Swal.fire({
      title: "¿Eliminar canción?",
      text: `Vas a borrar "${nombre}" del catálogo.`,
      icon: "warning",
      showCancelButton: true,
      background: "#121824",
      color: "#FFFFFF",
      confirmButtonColor: "#E53E3E",
      cancelButtonColor: "#6C757D",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      iconColor: "#E53E3E",
    }).then((result) => {
      if (result.isConfirmed) {
        const listaFiltrada = canciones.filter((c) => c.id !== id);
        setCanciones(listaFiltrada);
        localStorage.setItem("canciones", JSON.stringify(listaFiltrada));
        mostrarAlerta("Eliminada", "La canción fue removida.", "success");
      }
    });
  };

  // Cambiar Rol de Usuario
  const handleCambiarRol = (email, rolActual) => {
    const nuevoRol = rolActual === "admin" ? "user" : "admin";
    const listaActualizada = usuarios.map((u) =>
      u.email === email ? { ...u, rol: nuevoRol } : u,
    );
    setUsuarios(listaActualizada);
    localStorage.setItem("usuarios", JSON.stringify(listaActualizada));
    mostrarAlerta(
      "Rol actualizado",
      `El usuario ahora es ${nuevoRol}.`,
      "info",
    );
  };

  // Eliminar Usuario con Confirmación
  const handleEliminarUsuario = (email) => {
    Swal.fire({
      title: "¿Eliminar usuario?",
      text: `El usuario ${email} perderá acceso.`,
      icon: "warning",
      showCancelButton: true,
      background: "#121824",
      color: "#FFFFFF",
      confirmButtonColor: "#E53E3E",
      cancelButtonColor: "#6C757D",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      iconColor: "#E53E3E",
    }).then((result) => {
      if (result.isConfirmed) {
        const listaFiltrada = usuarios.filter((u) => u.email !== email);
        setUsuarios(listaFiltrada);
        localStorage.setItem("usuarios", JSON.stringify(listaFiltrada));
        mostrarAlerta("Eliminado", "El usuario fue borrado.", "success");
      }
    });
  };

  return (
    <div className="container py-4">
      {/* HEADER */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-4">
        <h2 className="text-white m-0 fw-bold">Gestión de Catálogo</h2>
        {tabActiva === "canciones" && (
          <button
            className="btn btn-warning fw-semibold align-self-start align-self-sm-auto"
            onClick={() => {
              if (mostrarFormulario) {
                limpiarFormulario();
              } else {
                setMostrarFormulario(true);
              }
            }}
          >
            <i
              className={`bi ${mostrarFormulario ? "bi-x-lg" : "bi-plus-lg"} me-2`}
            ></i>
            {mostrarFormulario ? "Cancelar" : "Agregar Canción"}
          </button>
        )}
      </div>

      {/* FORMULARIO DE ALTA / EDICIÓN */}
      {tabActiva === "canciones" && mostrarFormulario && (
        <div className="card bg-dark text-white border-secondary p-3 p-md-4 mb-4 shadow-sm">
          <h4 className="mb-3 fw-bold text-warning">
            {idEnEdicion ? "Editar Canción" : "Nueva Canción"}
          </h4>
          <form onSubmit={handleSubmit(onGuardarCancion)}>
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label text-secondary small fw-bold">
                  Nombre
                </label>
                <input
                  type="text"
                  className={`form-control bg-dark text-white border-secondary ${errors.nombre ? "is-invalid" : ""}`}
                  {...register("nombre", {
                    required: "El nombre es obligatorio",
                  })}
                />
                {errors.nombre && (
                  <span className="invalid-feedback">
                    {errors.nombre.message}
                  </span>
                )}
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label text-secondary small fw-bold">
                  Artista
                </label>
                <input
                  type="text"
                  className={`form-control bg-dark text-white border-secondary ${errors.artista ? "is-invalid" : ""}`}
                  {...register("artista", {
                    required: "El artista es obligatorio",
                  })}
                />
                {errors.artista && (
                  <span className="invalid-feedback">
                    {errors.artista.message}
                  </span>
                )}
              </div>

              <div className="col-12 col-sm-6 col-md-4">
                <label className="form-label text-secondary small fw-bold">
                  Álbum
                </label>
                <input
                  type="text"
                  className={`form-control bg-dark text-white border-secondary ${errors.album ? "is-invalid" : ""}`}
                  {...register("album", {
                    required: "El álbum es obligatorio",
                  })}
                />
                {errors.album && (
                  <span className="invalid-feedback">
                    {errors.album.message}
                  </span>
                )}
              </div>

              <div className="col-6 col-sm-3 col-md-4">
                <label className="form-label text-secondary small fw-bold">
                  Año
                </label>
                <input
                  type="number"
                  className={`form-control bg-dark text-white border-secondary ${errors.anio ? "is-invalid" : ""}`}
                  {...register("anio", { required: "El año es obligatorio" })}
                />
                {errors.anio && (
                  <span className="invalid-feedback">
                    {errors.anio.message}
                  </span>
                )}
              </div>

              <div className="col-6 col-sm-3 col-md-4">
                <label className="form-label text-secondary small fw-bold">
                  Género
                </label>
                <input
                  type="text"
                  className={`form-control bg-dark text-white border-secondary ${errors.genero ? "is-invalid" : ""}`}
                  {...register("genero", {
                    required: "El género es obligatorio",
                  })}
                />
                {errors.genero && (
                  <span className="invalid-feedback">
                    {errors.genero.message}
                  </span>
                )}
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label text-secondary small fw-bold">
                  URL Imagen de Carátula
                </label>
                <input
                  type="url"
                  className={`form-control bg-dark text-white border-secondary ${errors.imagen ? "is-invalid" : ""}`}
                  placeholder="https://..."
                  {...register("imagen", {
                    required: "La URL de imagen es obligatoria",
                  })}
                />
                {errors.imagen && (
                  <span className="invalid-feedback">
                    {errors.imagen.message}
                  </span>
                )}
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label text-secondary small fw-bold">
                  URL Archivo de Audio
                </label>
                <input
                  type="url"
                  className={`form-control bg-dark text-white border-secondary ${errors.archivo ? "is-invalid" : ""}`}
                  placeholder="https://..."
                  {...register("archivo", {
                    required: "La URL del audio es obligatoria",
                  })}
                />
                {errors.archivo && (
                  <span className="invalid-feedback">
                    {errors.archivo.message}
                  </span>
                )}
              </div>
            </div>

            <div className="mt-4 text-end d-flex gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-outline-secondary fw-semibold"
                onClick={limpiarFormulario}
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-warning fw-semibold">
                {idEnEdicion ? "Guardar Cambios" : "Guardar Canción"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TABS DE NAVEGACIÓN INTERNA */}
      <div className="d-flex gap-2 border-bottom border-secondary mb-4 pb-2">
        <button
          className={`btn ${
            tabActiva === "canciones" ? "btn-warning" : "btn-outline-secondary"
          }`}
          onClick={() => setTabActiva("canciones")}
        >
          Canciones ({canciones.length})
        </button>
        <button
          className={`btn ${
            tabActiva === "usuarios" ? "btn-warning" : "btn-outline-secondary"
          }`}
          onClick={() => setTabActiva("usuarios")}
        >
          Usuarios ({usuarios.length})
        </button>
      </div>

      {/* TAB CANCIONES */}
      {tabActiva === "canciones" && (
        <div className="table-responsive border border-secondary rounded-3 p-2 bg-dark">
          <table className="table table-dark align-middle m-0">
            <thead>
              <tr>
                <th>PORTADA</th>
                <th>TÍTULO</th>
                <th className="d-none d-sm-table-cell">ARTISTA</th>
                <th className="d-none d-md-table-cell">ÁLBUM</th>
                <th className="d-none d-lg-table-cell">GÉNERO</th>
                <th className="text-end">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {canciones.length > 0 ? (
                canciones.map((cancion) => (
                  <tr key={cancion.id}>
                    <td>
                      <img
                        src={cancion.imagen}
                        alt={cancion.nombre}
                        style={{
                          width: "42px",
                          height: "42px",
                          objectFit: "cover",
                        }}
                        className="rounded"
                      />
                    </td>
                    <td>
                      <div className="fw-bold text-white">{cancion.nombre}</div>
                      <small className="text-secondary d-sm-none">
                        {cancion.artista}
                      </small>
                    </td>
                    <td className="d-none d-sm-table-cell text-secondary">
                      {cancion.artista}
                    </td>
                    <td className="d-none d-md-table-cell text-secondary">
                      {cancion.album}
                    </td>
                    <td className="d-none d-lg-table-cell">
                      <span className="badge bg-secondary">
                        {cancion.genero}
                      </span>
                    </td>
                    <td className="text-end">
                      <div className="d-flex gap-1 justify-content-end">
                        <button
                          className="btn btn-sm btn-outline-warning"
                          onClick={() => handleEditarCancion(cancion)}
                          title="Editar canción"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() =>
                            handleEliminarCancion(cancion.id, cancion.nombre)
                          }
                          title="Eliminar canción"
                        >
                          <i className="bi bi-trash3"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-muted">
                    No hay canciones registradas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB USUARIOS */}
      {tabActiva === "usuarios" && (
        <div className="table-responsive border border-secondary rounded-3 p-2 bg-dark">
          <table className="table table-dark align-middle m-0">
            <thead>
              <tr>
                <th>NOMBRE</th>
                <th>EMAIL</th>
                <th>ROL</th>
                <th className="text-end">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.length > 0 ? (
                usuarios.map((usr, index) => (
                  <tr key={usr.email || index}>
                    <td className="fw-bold text-white">
                      {usr.nombre || "Sin Nombre"}
                    </td>
                    <td className="text-secondary">{usr.email}</td>
                    <td>
                      <button
                        className={`btn btn-sm ${
                          usr.rol === "admin"
                            ? "btn-warning text-dark fw-bold"
                            : "btn-outline-secondary"
                        }`}
                        onClick={() => handleCambiarRol(usr.email, usr.rol)}
                        title="Click para alternar rol"
                      >
                        {usr.rol || "user"}
                      </button>
                    </td>
                    <td className="text-end">
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleEliminarUsuario(usr.email)}
                        title="Eliminar usuario"
                      >
                        <i className="bi bi-trash3"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-muted">
                    No hay usuarios registrados en el sistema.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;
