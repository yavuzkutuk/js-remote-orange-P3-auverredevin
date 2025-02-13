import "./AboutUs.css";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";

function AboutUs() {
  return (
    <>
      <NavBar />

      <div className="AboutBox">
        <h1>À propos de nous</h1>
        <div className="aboutimg">
          <img src="../src/assets/images/AboutUS.png" alt="Logo" />
        </div>
        <p className="Abouttext">
          Passionnés par les vins français, nous avons créé ce site pour
          partager la richesse et la diversité de nos terroirs. De Bordeaux à la
          Provence, chaque bouteille raconte une histoire que nous souhaitons
          vous faire découvrir.
        </p>
        <p className="Abouttext">
          Que vous soyez amateur ou curieux, embarquez avec nous dans un voyage
          sensoriel au cœur des vignobles français.
        </p>
        <p className="Abouttext">À votre santé 🍷!</p>
      </div>
      <Footer />
    </>
  );
}

export default AboutUs;
