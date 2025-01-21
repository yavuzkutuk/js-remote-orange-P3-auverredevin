import "./Connexion.css";
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
          <button type="submit">Connexion</button>
        </form>

        <div className="logo-bis">
          <img src="../src/assets/images/auverredevinn.png" alt="avatar" />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Connexion;
