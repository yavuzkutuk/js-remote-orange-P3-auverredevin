import "./Accueil.css";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";

function Accueil() {
  return (
    <div className="Accueil">
      <NavBar />

      <div className="main">
        <h1>
          <strong>DECOUVREZ VOTRE PROFIL</strong>
        </h1>
        <h4>Participez à ce quizz pour en savoir plus sur vous goûts !</h4>
        <button type="button" className="button-quizz">
          <strong>QUIZZ</strong>
        </button>
      </div>

      <section className="nav-buttons">
        <button type="button" className="button-vin">
          <img
            className="raisin"
            src="../src/assets/images/Raisin.png"
            alt="Raisin"
          />
          <strong>Nos vins</strong>
          <p>
            Réveillez votre palais gustativement avec notre sélection de 50 vins
            au choix !
          </p>
        </button>
        <button type="button" className="button-degustation">
          <img
            className="degustation"
            src="../src/assets/images/Degustation.png"
            alt="degustation"
          />
          <strong>Dégustation</strong>
          <p>
            Venez participer à nos séances dégustation qui réveillera vos
            papilles !
          </p>
        </button>

        <button type="button" className="button-francais">
          <img
            className="Francais"
            src="../src/assets/images/Francais.png"
            alt="100% Francais"
          />
          <strong>100% Français</strong>
          <p>Tout nos vins sont directement produits de vignes française !</p>
        </button>
      </section>

      <section>
        <h1>
          <strong>PRÊT A RELEVER L’AVENTURE ?</strong>
        </h1>
        <button type="button" className="button-vins">
          <strong>NOS VINS</strong>
        </button>
      </section>
      <Footer />
    </div>
  );
}

export default Accueil;
