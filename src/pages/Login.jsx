import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import Swal from "sweetalert2";
import { Logo } from "../components/Logo";
import "./Login.css";

const Login = () => {
  const { login } = useAppContext();
  const navegacion = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Variables de entorno para el Administrador por defecto
    const envAdminEmail = import.meta.env.VITE_ADMIN_EMAIL;
    const envAdminPassword = import.meta.env.VITE_ADMIN_PASSWORD;


    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];

    let usuarioEncontrado = null;

    //Validar contra credenciales de Entorno (Admin)
    if (data.email === envAdminEmail && data.password === envAdminPassword) {
      usuarioEncontrado = { email: envAdminEmail, rol: "admin" };
    } else {
      //Validar contra usuarios guardados en localStorage
      const matchLocal = usuariosGuardados.find(
        (u) => u.email === data.email && u.password === data.password
      );
      if (matchLocal) {
        usuarioEncontrado = { email: matchLocal.email, rol: matchLocal.rol || "user" };
      }
    }

    if (usuarioEncontrado) {
      login(usuarioEncontrado);

      Swal.fire({
        title: "¡Bienvenido a BANGER!",
        text: "Sesión iniciada correctamente",
        icon: "success",
        background: "#121824",
        color: "#FFFFFF",
        confirmButtonColor: "#FF6500",
        confirmButtonText: "Entendido",
        iconColor: "#FF6500",
      }).then(() => {
        if (usuarioEncontrado.rol === "admin") {
          navegacion("/admin");
        } else {
          navegacion("/");
        }
      });
    } else {
      Swal.fire({
        title: "Error de autenticación",
        text: "Email o contraseña incorrectos",
        icon: "error",
        background: "#121824",
        color: "#FFFFFF",
        confirmButtonColor: "#FF6500",
        confirmButtonText: "Entendido",
        iconColor: "#E53E3E",
      });
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 text-white shadow-lg login-card position-relative">
        <Link
          to="/"
          className="position-absolute top-0 end-0 p-3 text-muted"
          style={{ textDecoration: "none" }}
        >
          <i className="bi bi-x-lg"></i>
        </Link>

        <div className="d-flex justify-content-center my-2 login-logo-wrapper">
          <Logo showText={false} />
        </div>

        <h3 className="text-center fw-bold mt-2 mb-1">¡Hola de nuevo!</h3>
        <p className="text-center text-muted small mb-4">
          Iniciá sesión para acceder a tus playlists
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label text-light small fw-semibold">
              Correo electrónico
            </label>
            <div className="input-icon-wrapper">
              <i className="bi bi-envelope"></i>
              <input
                type="email"
                placeholder="tu@email.com"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                {...register("email", {
                  required: "El correo electrónico es obligatorio",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Formato de correo inválido",
                  },
                })}
              />
            </div>
            {errors.email && (
              <div className="invalid-feedback d-block mt-1">
                {errors.email.message}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="form-label text-light small fw-semibold">
              Contraseña
            </label>
            <div className="input-icon-wrapper">
              <i className="bi bi-lock"></i>
              <input
                type="password"
                placeholder="••••••••"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                {...register("password", {
                  required: "La contraseña es obligatoria",
                  minLength: {
                    value: 6,
                    message: "Debe tener al menos 6 caracteres",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                    message: "Debe incluir mayúscula, minúscula y número",
                  },
                })}
              />
            </div>
            {errors.password && (
              <div className="invalid-feedback d-block mt-1">
                {errors.password.message}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="btn w-100 fw-bold py-2 btn-primary-banger"
          >
            Iniciar Sesión
          </button>
        </form>

        <p className="mt-4 text-center text-muted small mb-0">
          ¿No tenés una cuenta?{" "}
          <Link to="/registro" className="text-banger-link fw-semibold">
            Registrate acá
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;