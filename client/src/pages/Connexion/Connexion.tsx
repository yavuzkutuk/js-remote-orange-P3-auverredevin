import "./Connexion.css";

function Connexion() {
  return (
    <div className="connecter">
      {/* Logo */}
      <div className="logo">
        <img src="../src/assets/images/Logo.png" alt="Logo Au Verre de Vin" />
      </div>

      <h1>SE CONNECTER</h1>
      <div className="avatar">
      <img src="..//src/assets/images/avvatar.png" alt="avvatar" />
      </div> 

      {/* Formulaire de connexion */}
      <form className="case">
        <input type="email" placeholder="Adresse e-mail" />
        <input type="password" placeholder="Mot de passe" />
        <button type="submit">Connexion</button>
      </form>

      <div className="logo-bis">
  <img src="../src/assets/images/auverredevinn.png" alt="avatar" />
</div>


      {/* Navigation */}
      <nav className="navigation">
        <a href="/nosvins">Nos Vins</a>
        <a href="/degustations">Dégustation</a>
        <a href="/reservations">Mes Réservations</a>
        <a href="/quizz">Quiz</a>
        <a href="/inscription">S'inscrire</a>
      </nav>

      {/* Pied de page */}
      <footer>
        <p>
          © 2024 Au Verre De Vin. L'abus d'alcool est dangereux pour la santé. À consommer avec modération.
        </p>
      </footer>
    </div>
  );
}

export default Connexion;
