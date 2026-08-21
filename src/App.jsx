import Navbar from "./components/Navbar";
import Cancion from './components/CancionCardj';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Catalogo from "./pages/Catalogo";

function App() {
  return (
     <BrowserRouter>

            <Navbar />

            <Routes>

                

                <Route
                    path="/"
                    element={<Catalogo />}
                />

            </Routes>

        </BrowserRouter>

    );
}

export default App;