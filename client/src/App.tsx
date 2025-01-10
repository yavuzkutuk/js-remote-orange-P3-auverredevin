import "./App.css";
import { Route, Routes } from "react-router-dom";
import Accueil from "./pages/Accueil/Accueil";
import Connexion from "./pages/Connexion/Connexion";
import ListeVin from "./pages/ListeVin/ListeVin";
import NotFound from "./pages/NotFound/NotFound";
import NavBar from "./components/Footer/NavBar";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/liste-vin" element={<ListeVin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <NavBar />
    </div>
  );
}

export default App;
