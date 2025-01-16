import "./quizz.css";
import { useEffect, useState } from "react";

interface Question {
  question_id: number;
  question_text: string;
}

function Quizz() {
  const [question, setQuestion] = useState<Question[]>([]);

  useEffect(() => {
    fetch("http://localhost:3310/api/question")
      .then((response) => response.json())
      .then((data) => setQuestion(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      {question.map((questions: Question) => (
        <div key={questions.question_id}>
          <h3>{questions.question_text}</h3>
        </div>
      ))}
    </div>
  );
}

export default Quizz;
