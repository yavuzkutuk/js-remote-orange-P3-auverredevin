import "./App.css";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import Accueil from "./pages/Accueil/Accueil";
import Connexion from "./pages/Connexion/Connexion";
import ListeVin from "./pages/ListeVin/ListeVin";
import NotFound from "./pages/NotFound/NotFound";
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
      <Footer />
    </div>
  );
}

export default App;
