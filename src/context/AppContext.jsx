import { createContext, useContext, useState, useEffect } from "react";
export const AppContext = createContext(undefined);

//Provider que maneja el estado global
export function AppProvider({ children }) {
  // Inicializa el usuario desde localStorage si existe
  const [usuarioLogueado, setUsuarioLogueado] = useState(() => {
    const usuarioGuardado = localStorage.getItem("usuarioActivo");
    return usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
  });

  // Función de Login: guarda sesión
  const login = (datosUsuario) => {
    // datosUsuario espera la estructura: { email, rol, ... }
    setUsuarioLogueado(datosUsuario);
    localStorage.setItem("usuarioActivo", JSON.stringify(datosUsuario));
  };

  // Función de Logout: limpia sesión
  const logout = () => {
    setUsuarioLogueado(null);
    localStorage.removeItem("usuarioActivo");
  };

  return (
    <AppContext.Provider
      value={{
        usuarioLogueado,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

//  Hook con validación de uso
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext debe usarse dentro de un AppProvider");
  }
  return context;
}