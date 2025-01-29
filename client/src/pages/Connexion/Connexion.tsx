import "./Connexion.css";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";

function Connexion() {
  return (
    <>
      <NavBar />
      <div className="connecter">

        <h1>SE CONNECTER</h1>
        <div className="avatar">
          <img src="..//src/assets/images/avvatar.png" alt="avvatar" />
        </div>

        <form className="case">
          <input type="email" placeholder="Adresse e-mail" />
          <input type="password" placeholder="Mot de passe" />

          <div className="home">
            <Link to="/">
              <button type="button">Connexion</button>
            </Link>
          </div>
        </form>

        <form className="sign-up">
          <Link to="/Inscription">
            <button type="submit">S'inscrire</button>
          </Link>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Connexion;
