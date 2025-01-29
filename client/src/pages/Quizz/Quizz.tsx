import "./Quizz.css";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";

interface Quizz {
  question_id: number;
  question_text: string;
}

function Quizz() {
  return (
    <div className="Quizz">
      <NavBar />
      <h1>Quizz</h1>
      <p>Laissez vous guider</p>
      <div className="card-container">
        <div className="card">
          <h3>Question 1</h3>
          <p>Réponse à la question 1</p>
        </div>
        <div className="card">
          <h3>Question 2</h3>
          <p>Réponse à la question 2</p>
        </div>
        <div className="card">
          <h3>Question 3</h3>
          <p>Réponse à la question 3</p>
        </div>
        <div className="card">
          <h3>Question 4</h3>
          <p>Réponse à la question 4</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Quizz;
