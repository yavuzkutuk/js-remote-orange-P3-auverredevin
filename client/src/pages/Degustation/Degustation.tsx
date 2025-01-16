import { useEffect, useState } from "react";
import "./Degustation.css";

interface Tasting {
  tasting_id: number;
  name: string;
  date: string;
  city_name: string;
  website_url: string;
}

function Degustation() {
  const [tastings, setTastings] = useState<Tasting[]>([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch("http://localhost:3310/api/tastings")
      .then((response) => response.json())
      .then((data) => setTastings(data))
      .catch((error) => console.error(error));
  }, []);

  // Get unique cities
  const cities = [
    ...new Set(tastings.map((tasting) => tasting.city_name)),
  ].sort();

  // Filter and sort tastings
  const filteredTastings = tastings
    .filter((tasting) => !selectedCity || tasting.city_name === selectedCity)
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTastings.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(filteredTastings.length / itemsPerPage);

  return (
    <div className="Degustation">
      <h1>Dégustations</h1>
      <div className="filters">
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="city-select"
        >
          <option value="">Toutes les villes</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="sort-button"
        >
          Trier par date {sortOrder === "asc" ? "↑" : "↓"}
        </button>
      </div>

      <table className="tastingTableau">
        <thead className="tastingThead">
          <tr>
            <th>Nom</th>
            <th
              className="sortable"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              onKeyUp={(e) => {
                if (e.key === "Enter")
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc");
              }}
              data-arrow={sortOrder === "asc" ? "↑" : "↓"}
            >
              Date
            </th>
            <th>Ville</th>
            <th>Site officiel</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((tasting) => (
            <tr key={tasting.tasting_id}>
              <td>{tasting.name}</td>
              <td>{tasting.date}</td>
              <td>{tasting.city_name}</td>
              <td>
                <a
                  href={tasting.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Site officiel
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            type="button"
            key={`page-${index + 1}`}
            onClick={() => setCurrentPage(index + 1)}
            className={`page-button ${currentPage === index + 1 ? "active" : ""}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Degustation;
