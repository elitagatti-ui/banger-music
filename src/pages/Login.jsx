import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import Swal from "sweetalert2";
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
    // Usuarios de prueba o recuperados de localStorage
    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [
      { email: "admin@banger.com", password: "Admin123!", rol: "admin" },
      { email: "user@banger.com", password: "User123!", rol: "user" },
    ];

    const usuarioEncontrado = usuariosGuardados.find(
      (u) => u.email === data.email && u.password === data.password
    );

    if (usuarioEncontrado) {
      login({ email: usuarioEncontrado.email, rol: usuarioEncontrado.rol });

      Swal.fire({
        title: "¡Bienvenido a BANGER!",
        text: "Sesión iniciada correctamente",
        icon: "success",
        background: "#121824",
        color: "#FFFFFF",
        confirmButtonColor: "#FF6500",
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
        iconColor: "#E53E3E",
      });
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 text-white shadow-lg border-0 login-card">
        <h2 className="text-center fw-bold mb-4 login-title">
          Iniciar Sesión
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label text-light">Email</label>
            <input
              type="email"
              className={`form-control bg-dark text-white border-secondary ${
                errors.email ? "is-invalid" : ""
              }`}
              {...register("email", {
                required: "El email es obligatorio",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Formato de email inválido",
                },
              })}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>

          <div className="mb-4">
            <label className="form-label text-light">Contraseña</label>
            <input
              type="password"
              className={`form-control bg-dark text-white border-secondary ${
                errors.password ? "is-invalid" : ""
              }`}
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 6,
                  message: "Debe tener al menos 6 caracteres",
                },
              })}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>

          <button type="submit" className="btn w-100 fw-bold py-2 btn-primary-banger">
            Ingresar
          </button>
        </form>

        <p className="mt-3 text-center text-muted small">
          ¿No tenés cuenta?{" "}
          <Link to="/registro" className="text-banger-link">
            Registrate acá
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;