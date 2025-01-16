import "./Connexion.css";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";

function Connexion() {
  return (
    <div className="connecter">
      <NavBar />
      <div className="logo">
        <img src="../src/assets/images/Logo.png" alt="Logo Au Verre de Vin" />
      </div>

      <h1>SE CONNECTER</h1>
      <div className="avatar">
        <img src="../src/assets/images/avvatar.png" alt="avvatar" />
      </div>

      <form className="case">
        <input type="email" placeholder="Adresse e-mail" />
        <input type="password" placeholder="Mot de passe" />
        <button type="submit">Connexion</button>
      </form>

      <div className="logo-bis">
        <img src="../src/assets/images/auverredevinn.png" alt="avatar" />
      </div>

      <nav className="navigation">
        <a href="/nosvins">Nos Vins</a>
        <a href="/degustations">Dégustation</a>
        <a href="/reservations">Mes Réservations</a>
        <a href="/quizz">Quiz</a>
        <a href="/inscription">S'inscrire</a>
      </nav>

      <Footer />
    </div>
  );
}

export default Connexion;
