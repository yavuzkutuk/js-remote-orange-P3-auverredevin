import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import "./IndexBackOffice.css";
import { Link } from "react-router-dom";

function IndexBackOffice() {
  return (
    <div>
      <NavBar />
      <section className="IndexBackOffice">
      <h1>IndexBackOffice</h1>
      <Link to="/suggestionsBO">
        <button type="submit">Liste des suggestions</button>
      </Link>
      <Link to="/utilisateursBO">
        <button type="submit">Liste des utilisateurs</button>
      </Link>
      <Link to="/vinsBO">
        <button type="submit">Liste des vins</button>
      </Link>
      <Link to="/evenementsBO">
        <button type="submit">Liste des évenements</button>
      </Link>
      </section>
      <Footer />
    </div>
  );
}

export default IndexBackOffice;
