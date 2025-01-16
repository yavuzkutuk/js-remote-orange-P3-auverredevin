import "./inscription.css";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";

function Inscription() {
  return (
    <>
      <NavBar />
      <div className="connecter">
        <h1>INSCRIPTION</h1>
        <div className="avatar">
          <img src="..//src/assets/images/avvatar.png" alt="avvatar" />
        </div>
        <form className="case">
          <input type="text" placeholder="Prénom" />
          <input type="text" placeholder="Nom" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Mots de passe" />
          <input type="text" placeholder="Adresse" />

          <div className="newsletter">
            <input type="checkbox" />
            Acceptez-vous de recevoir nos offres personnalisé par email
          </div>

          <button type="submit">S'inscrire</button>
        </form>

        <nav className="navigation">
          <a href="/nosvins">NOS VINS</a>
          <a href="/degustations">DEGUSTATION</a>
          <a href="/reservations">MES RESERVATIONS</a>
          <a href="/quizz">QUIZ</a>
          <a href="/seconnecter">SE CONNECTER</a>
        </nav>
      </div>
      <Footer />
    </>
  );
}

export default Inscription;
