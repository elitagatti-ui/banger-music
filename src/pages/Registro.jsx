import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Logo } from "../components/Logo";
import "./Registro.css";
import "./Login.css";

const Registro = () => {
  const navegacion = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = (data) => {
    const usuariosGuardados =
      JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioExistente = usuariosGuardados.find(
      (u) => u.email === data.email,
    );

    if (usuarioExistente) {
      Swal.fire({
        title: "Error de registro",
        text: "El correo electrónico ya se encuentra registrado",
        icon: "error",
        background: "#121824",
        color: "#FFFFFF",
        confirmButtonColor: "#FF6500",
        confirmButtonText: "Entendido",
        iconColor: "#E53E3E",
      });
      return;
    }

    const nuevoUsuario = {
      nombre: data.nombre,
      email: data.email,
      password: data.password,
      rol: "user",
    };

    usuariosGuardados.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));

    Swal.fire({
      title: "¡Cuenta creada!",
      text: "Tu usuario fue registrado exitosamente",
      icon: "success",
      background: "#121824",
      color: "#FFFFFF",
      confirmButtonColor: "#FF6500",
      confirmButtonText: "Entendido",
      iconColor: "#FF6500",
    }).then(() => {
      navegacion("/login");
    });
  };

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 text-white shadow-lg registro-card position-relative">
        <Link to="/" className="position-absolute top-0 end-0 p-3 text-muted text-decoration-none">
          <i className="bi bi-x-lg"></i>
        </Link>

        <div className="d-flex justify-content-center my-2 login-logo-wrapper">
          <Logo showText={false} />
        </div>

        <h3 className="text-center fw-bold mt-2 mb-1">Crear cuenta</h3>
        <p className="text-center text-muted small mb-4">
          Registrate para personalizar tus listas de reproducción
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Nombre */}
          <div className="mb-3">
            <label className="form-label text-light small fw-semibold">
              Nombre completo
            </label>
            <div className="input-icon-wrapper">
              <i className="bi bi-person"></i>
              <input
                type="text"
                placeholder="Tu nombre"
                className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
                {...register("nombre", {
                  required: "El nombre es obligatorio",
                })}
              />
            </div>
            {errors.nombre && (
              <div className="invalid-feedback d-block mt-1">
                {errors.nombre.message}
              </div>
            )}
          </div>

          {/* Email */}
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

          {/* Password */}
          <div className="mb-3">
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
                    value: 8,
                    message: "Debe tener al menos 8 caracteres",
                  },
                  maxLength: {
                    value: 20,
                    message: "No puede superar los 20 caracteres",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                    message:
                      "Debe incluir al menos una mayúscula, una minúscula y un número",
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

          {/* Confirmar Password */}
          <div className="mb-4">
            <label className="form-label text-light small fw-semibold">
              Confirmar contraseña
            </label>
            <div className="input-icon-wrapper">
              <i className="bi bi-lock-fill"></i>
              <input
                type="password"
                placeholder="••••••••"
                className={`form-control ${
                  errors.confirmPassword ? "is-invalid" : ""
                }`}
                {...register("confirmPassword", {
                  required: "Confirmá tu contraseña",
                  validate: (value) =>
                    value === password || "Las contraseñas no coinciden",
                })}
              />
            </div>
            {errors.confirmPassword && (
              <div className="invalid-feedback d-block mt-1">
                {errors.confirmPassword.message}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="btn w-100 fw-bold py-2 btn-primary-banger"
          >
            Registrarse
          </button>
        </form>

        <p className="mt-4 text-center text-muted small mb-0">
          ¿Ya tenés una cuenta?{" "}
          <Link to="/login" className="text-banger-link fw-semibold">
            Iniciá sesión acá
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registro;
