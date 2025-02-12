import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  handleLogin: (email: string, password: string) => Promise<void>;
  handleRegister: (email: string, password: string) => Promise<void>;
  handleLogout: () => void;
  isAuth: boolean;
  message: string | null;
  user: string | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

import type { ReactNode } from "react";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleRegister = async (email: string, password: string) => {
    try {
      const response = await axios.post<{ message: string; user?: string }>(
        "http://localhost:3310/api/auth/signup",
        { email, password },
      );

      if (response.data.user) {
        setMessage("Inscription réussie, vous pouvez vous connecter.");
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage("Erreur lors de l'inscription.");
    }
  };

  interface LoginResponse {
    token: string;
    user: string;
    message: string;
  }

  const handleLogin = async (email: string, password: string) => {
    try {
      const { data } = await axios.post<LoginResponse>(
        "http://localhost:3310/api/auth/signin",
        { email, password },
      );

      if (data.token) {
        setIsAuth(true);
        setUser(data.user);
        localStorage.setItem("token", data.token);
        setMessage(null);
      } else {
        setIsAuth(false);
        setMessage(data.message || "Email ou mot de passe incorrect.");
      }
    } catch (error) {
      setMessage("Erreur lors de la connexion.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    setUser(null);
  };

  const currentUser = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const { data } = await axios.get<{ check: boolean; user?: string }>(
          "http://localhost:3310/api/auth/check",
          { headers: { Authorization: `Bearer ${token}` } },
        );

        setIsAuth(data.check);
        if (data.check) {
          setUser(data.user || null);
        } else {
          handleLogout();
        }
      } catch {
        handleLogout();
      }
    }
  };

  useEffect(() => {
    currentUser();
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{
        handleLogin,
        handleRegister,
        handleLogout,
        isAuth,
        message,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  return context;
};
