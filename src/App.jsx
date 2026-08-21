import Navbar from "./components/Navbar";
import Cancion from './components/CancionCardj';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Catalogo from "./pages/Catalogo";
import Detalle from "./pages/Detalle";
function App() {
  return (
     <BrowserRouter>

            <Navbar />

            <Routes>

                

                <Route
                    path="/"
                    element={<Catalogo />}

                />
                       <Route path="/detalle/:id" element={<Detalle />} />

               

            </Routes>

        </BrowserRouter>

    );
}

export default App;