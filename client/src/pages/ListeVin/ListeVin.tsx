import "./ListeVin.css";
import { useState, useEffect } from "react";

interface Wine {
  wine_id: number;
  name: string;
  category: string;
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
    <div>
      {wines.map((wine: Wine) => (
        <div key={wine.wine_id}>
          <h3>{wine.name}</h3>
          <p>Catégorie : {wine.category}</p>
          <p>Origine : {wine.origin || "Non spécifiée"}</p>
          <p>Prix : {wine.price}€</p>
          {wine.description && <p>Description : {wine.description}</p>}
        </div>
      ))}
    </div>
  );
}

export default WinesList;
