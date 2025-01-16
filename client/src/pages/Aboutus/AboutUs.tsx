import "./AboutUs.css";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";

function AboutUs() {
  return (
    <div>
      <NavBar />
      <div className="AboutBox">
        <h1>À propos de nous</h1>
        <p>
          Passionnés par les vins français, nous avons créé ce site pour
          partager la richesse et la diversité de nos terroirs. De Bordeaux à la
          Provence, chaque bouteille raconte une histoire que nous souhaitons
          vous faire découvrir.
        </p>
        <p>
          Que vous soyez amateur ou curieux, embarquez avec nous dans un voyage
          sensoriel au cœur des vignobles français.
        </p>
        <p>À votre santé !</p>
      </div>
      <Footer />
    </div>
  );
}

export default AboutUs;
