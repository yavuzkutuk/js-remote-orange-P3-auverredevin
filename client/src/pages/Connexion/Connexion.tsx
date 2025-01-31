import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";

function Connexion() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<{ token: string }>(
        "/api/auth/signin",
        formData,
      );
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.error("Error during login:", error);
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
          <Typography variant="h4">SE CONNECTER</Typography>
          <Box mt={2} sx={{ display: "flex", justifyContent: "center" }}>
            <img
              src="../src/assets/images/avvatar.png"
              alt="avatar"
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
          <form onSubmit={handleSubmit}>
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
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Cacher" : "Afficher"} le mot de passe
            </Button>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Connexion
            </Button>
          </form>
          <Box mt={2}>
            <Button onClick={() => navigate("/inscription")}>
              Pas encore inscrit ? S'inscrire
            </Button>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default Connexion;
