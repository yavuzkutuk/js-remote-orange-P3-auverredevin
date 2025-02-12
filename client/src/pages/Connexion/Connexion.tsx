import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import { useAuth } from "../../hook/useAuth";
import { Link } from "react-router-dom";

 interface UserProps {
  id: number;
  user_id: number;
  firstname: string;
  lastname: string;
  login: string;
  password: string;
  email: string;
  date_of_birth: Date;
  phone: string;
  address: string;
  creation_date: string;
  modification_date: string;
  role_id: number;
  last_update: string;
  token: string;
 };

function Connexion() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { handleLogin, handleLogout, isAuth, message } = useAuth();
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [type, setType] = useState("password");
  const [firstname, setFirstname] = useState([] as UserProps[]); 

  
console.log("user",user);
console.log("login",login);
console.log("password",password);
  return (
    <>
    
      <NavBar />
    
        <Container
          id="signInModule"
          maxWidth="sm"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>
          {message && <div style={{ color: "red" }}>{message}</div>}
          <form
            id="form"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
<TextField
              fullWidth
              margin="normal"
              id="login"
              label="Login"
              variant="outlined"
              value={login}
              type="text"
              name="login"
              onChange={(e) => setLogin(e.target.value)}
            />
          </form>
          <div>
            <TextField
              fullWidth
              margin="normal"
              id="password"
              label="Password"
              variant="outlined"
              type={type}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
<Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 2 }}
              onClick={() => setType(type === "password" ? "text" : "password")}
            >
              {type === "password" ? "Afficher" : "Cacher"} mon mot de passe
            </Button>
          </div>
         
<Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 2 }}
              onClick={() => handleLogin(login, password)}
            >
              Je me connecte
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 2 }}
              component={Link}
              to="/signUp"
            >
              Je crée mon compte
            </Button>
        </Container>
        <Container maxWidth="sm">
          <Box>vous n'êtes pas CONNECTÉ</Box>
        </Container>
      <Footer />
    </>
  );
}

export default Connexion;
