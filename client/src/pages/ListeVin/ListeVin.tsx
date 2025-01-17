import "./ListeVin.css";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";

interface Wine {
  wine_id: number;
  name: string;
  img_url: string;
  origin: string | null;
  price: number;
  description: string | null;
}

function WinesList() {
  const [wines, setWines] = useState<Wine[]>([]);

  useEffect(() => {
    fetch("http://localhost:3310/api/wines")
      .then((response) => response.json())
      .then((data) => setWines(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <NavBar />
      <div className="cards-wines">
        {wines.map((wine: Wine) => (
          <article className="cards-wine" key={wine.wine_id}>
            <img
              src={`${import.meta.env.VITE_API_URL}/${wine.img_url}`}
              alt={wine.name}
            />
            <h3>{wine.name}</h3>
            <p>Origine : {wine.origin || "Non spécifiée"}</p>
            <p>Prix : {wine.price}€</p>
            {wine.description && <p>{wine.description}</p>}
          </article>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default WinesList;
