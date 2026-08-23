import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const ProtectorRutas = () => {
  const { usuarioLogueado } = useAppContext();

  // Si no hay sesión activa, redirige a /login con replace
  if (!usuarioLogueado) {
    return <Navigate to="/login" replace />;
  }

  // Si hay usuario pero su rol no es admin, redirige al inicio
  if (usuarioLogueado.rol !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Si es admin, renderiza las rutas para el administrador
  return <Outlet />;
};

export default ProtectorRutas;