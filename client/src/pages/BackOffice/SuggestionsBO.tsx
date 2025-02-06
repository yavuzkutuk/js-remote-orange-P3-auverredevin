import "./SuggestionsBO.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";

function SuggestionsBO() {
  return (
    <div>
      <NavBar />
      <h1>SuggestionsBO</h1>
      <Box display="flex" justifyContent="center" sx={{ marginBottom: 2 }}>
        <Link to="/backoffice">
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "#9f0c00",
              "&:hover": { backgroundColor: "#dd1e0d" },
            }}
          >
            Index BackOffice
          </Button>
        </Link>
      </Box>
      <Footer />
    </div>
  );
}
export default SuggestionsBO;
