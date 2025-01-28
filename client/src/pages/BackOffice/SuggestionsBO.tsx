import "./SuggestionsBO.css";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";

function SuggestionsBO() {
  return (
    <div>
      <NavBar />
      <Link to="/backoffice">BackOffice</Link>
      <section className="SuggestionsBO">
        <h1>SuggestionsBO</h1>
      </section>
      <Footer />
    </div>
  );
}

export default SuggestionsBO;
