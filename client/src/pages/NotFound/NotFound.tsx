import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-message">
          Oups, la page que vous cherchez n'existe pas !
        </p>
        <Link to="/" className="back-home-button">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
