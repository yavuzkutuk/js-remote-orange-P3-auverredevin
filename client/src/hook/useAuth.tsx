import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  handleLogin: (email: string, password: string) => Promise<void>;
  handleRegister: (email: string, password: string) => Promise<void>;
  handleLogout: () => Promise<void>;
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
    if (email === null || password === null) {
      setMessage("Veuillez saisir les datas");
      return;
    }

    const values = { email: email, password: password };

    const response = await axios.post<{ message: string; user?: string }>(
      "http://localhost:3310/api/auth/signin",
      {
        method: "POST",
        values: values,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = response.data;

    if (data.message && data.user) {
      setMessage(data.message);
    } else {
      setMessage(data.message);
    }
  };

  interface LoginResponse {
    token: string;
    user: string;
    message: string;
  }

  const handleLogin = async (email: string, password: string) => {
    if (email === null || password === null) {
      //setMessage('Veuillez saisir les datas');
      return;
    }

    const values = { email: email, password: password };
    const { data } = await axios.post<LoginResponse>(
      "http://localhost:3310/api/auth/signin",
      {
        method: "POST",
        values: values,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (data.token) {
      setIsAuth(true);
      setUser(data.user);
      localStorage.setItem("token", data.token);
    } else {
      setIsAuth(false);
      setMessage(data.message || "Password erronné");
    }
  };

  const handleLogout = async () => {
    await handleClean();
  };

  const currentUser = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      // Test de connexion back
      const { data } = await axios.get("http://localhost:3310/api/auth/check", {
        headers: { token: token },
      });

      setIsAuth((data as { check: boolean })?.check);
      if (!(data as { check: boolean })?.check) {
        await handleClean();
      }
    } else {
      await handleClean();
    }
  };

  const handleClean = async () => {
    localStorage.removeItem("token");
    setIsAuth(false);
  };

  useEffect(() => {
    currentUser();
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
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

  if (!context) throw new Error("Pour utiliser useAuth context est necessaire");
  return context;
};
