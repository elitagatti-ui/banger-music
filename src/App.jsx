import Navbar from "./components/Navbar";
import Cancion from "./components/CancionCardj";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Catalogo from "./pages/Catalogo";
import Detalle from "./pages/Detalle";
import Error from "./pages/PaginaError";
import Login from "./pages/Login"
import Registro from "./pages/Registro";
import Admin from "./pages/Admin";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Catalogo />} />
        <Route path="/detalle/:id" element={<Detalle />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
