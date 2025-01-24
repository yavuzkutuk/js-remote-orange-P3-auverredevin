import "./ListEventsBO.css";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";

function ListEventsBO() {
  return (
    <div className="ListEventsBO">
      <NavBar />
      <Link to="/backoffice">BackOffice</Link>
      <h1>ListEventsBO</h1>
      <Footer />
    </div>
  );
}

export default ListEventsBO;
