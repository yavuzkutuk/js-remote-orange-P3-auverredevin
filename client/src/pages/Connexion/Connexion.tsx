import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";
import "./Connexion.css";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";

function Connexion() {
  const { handleLogin, handleRegister, message, isAuth } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false); // État pour basculer entre login et inscription

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isRegistering) {
      await handleRegister(email, password);
    } else {
      await handleLogin(email, password);
    }

    // Rediriger si l'utilisateur est authentifié
    if (isAuth) {
      navigate("/"); // Ou "/admin" selon le rôle
    }
  };

  return (
    <>
      <NavBar />
      <div className="connecter">
        <div className="logo">
          <img src="../src/assets/images/Logo.png" alt="Logo Au Verre de Vin" />
        </div>
        <h1>{isRegistering ? "S'INSCRIRE" : "SE CONNECTER"}</h1>
        <div className="avatar">
          <img src="../src/assets/images/avvatar.png" alt="avatar" />
        </div>

        <form className="case" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Adresse e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Cacher" : "Afficher"} le mot de passe
          </button>

          <div className="home">
            <button type="submit">
              {isRegistering ? "S'inscrire" : "Connexion"}
            </button>
          </div>
        </form>

        {message && <p style={{ color: "red" }}>{message}</p>}

        {/* Bouton pour basculer entre connexion et inscription */}
        <button type="button" onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering
            ? "Déjà un compte ? Se connecter"
            : "Pas encore inscrit ? S'inscrire"}
        </button>

        <Footer />
      </div>
    </>
  );
}

export default Connexion;
