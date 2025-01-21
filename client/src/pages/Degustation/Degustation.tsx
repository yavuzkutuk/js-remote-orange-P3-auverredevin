import { useEffect, useState } from "react";
import "./Degustation.css";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

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

  // Get the cities
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

  // Pagination calculation
  const totalPages = Math.ceil(filteredTastings.length / itemsPerPage);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <h1>Dégustations</h1>
      <FormControl className="form-control">
        <InputLabel>Ville</InputLabel>
        <Select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          label="Ville"
        >
          <MenuItem value="">Toutes les villes</MenuItem>
          {cities.map((city) => (
            <MenuItem key={city} value={city}>
              {city}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        className="button"
      >
        Trier par date {sortOrder === "asc" ? "↑" : "↓"}
      </Button>

      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
                className="table-cell-sortable"
              >
                Date {sortOrder === "asc" ? "↑" : "↓"}
              </TableCell>
              <TableCell>Ville</TableCell>
              <TableCell>Site officiel</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((tasting) => (
              <TableRow key={tasting.tasting_id}>
                <TableCell>{tasting.name}</TableCell>
                <TableCell>
                  {new Date(tasting.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{tasting.city_name}</TableCell>
                <TableCell>
                  <a
                    href={tasting.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visiter
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack spacing={2} sx={{ padding: "20px", alignItems: "center" }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          showFirstButton
          showLastButton
        />
      </Stack>
    </div>
  );
}

export default Degustation;
