import Navbar from "./components/Navbar";
import Cancion from "./components/CancionCardj";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Catalogo from "./pages/Catalogo";
import Detalle from "./pages/Detalle";
import Error from "./pages/PaginaError";
import Login from "./pages/Login"
import Registro from "./pages/Registro";
import Admin from "./pages/Admin";
import ProtectorRutas from "./components/routes/ProtectorRutas";
import Playlists from "./pages/Playlist";
import Ayuda from "./pages/Ayuda";
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Catalogo />} />
        <Route path="/detalle/:id" element={<Detalle />} />
         <Route path="/playlists" element={<Playlists />} />
       
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/ayuda" element={<Ayuda />} />
        <Route element={<ProtectorRutas />}>
          <Route path="/admin" element={<Admin />} />
          
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
