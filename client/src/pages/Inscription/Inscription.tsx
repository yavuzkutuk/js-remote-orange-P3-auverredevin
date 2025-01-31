import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";

function Inscription() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    date_of_birth: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    newsletter: false,
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/users", formData);
      navigate("/connexion");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <>
      <NavBar />
      <Container maxWidth="sm">
        <Box
          mt={5}
          textAlign="center"
          bgcolor="whitesmoke"
          p={3}
          borderRadius={2}
        >
          <Typography variant="h4">INSCRIPTION</Typography>
          <Box mt={2}>
            <img src="../src/assets/images/avvatar.png" alt="avatar" />
          </Box>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Prénom"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Nom"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Date de naissance"
              name="date_of_birth"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.date_of_birth}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Mot de passe"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Téléphone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Adresse"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleChange}
                />
              }
              label="Acceptez-vous de recevoir nos offres personnalisées par email"
            />
            <Link to="/welcome">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                S'inscrire
              </Button>
            </Link>
          </form>
          <Box mt={2}>
            <Link to="/connexion">Déjà inscrit ? Connectez-vous</Link>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default Inscription;
