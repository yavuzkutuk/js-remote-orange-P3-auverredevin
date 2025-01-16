import "./Degustation.css";
import { useEffect, useState } from "react";

interface Tasting {
  tasting_id: number;
  name: string;
  date: string;
  city_name: string;
  website_url: string;
}
function Degustation() {
  const [tastings, setTastings] = useState<Tasting[]>([]);
  useEffect(() => {
    fetch("http://localhost:3310/api/tastings")
      .then((response) => response.json())
      .then((data) => setTastings(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="Degustation">
      <h1>Dégustations</h1>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Date</th>
            <th>Ville</th>
            <th>Site officiel</th>
          </tr>
        </thead>
        <tbody>
          {tastings.map((tasting: Tasting) => (
            <tr key={tasting.tasting_id}>
              <td>{tasting.name}</td>
              <td>{tasting.date}</td>
              <td>{tasting.city_name}</td>
              <td>
                <a href={tasting.website_url}>Site officiel</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Degustation;
