import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const restoreUser = async () => {
      if (!token || userData) return;

      try {
        const { userId } = jwtDecode(token);
        if (!userId) return;

        const { data: user } = await api.get(`/users/${userId}`);
        setUserData(user);
      } catch (error) {
        console.error("Failed to restore user session:", error);
      }
    };

    restoreUser();
  }, [token, userData]);

  const onLogin = (jwtToken, user) => {
    localStorage.setItem("token", jwtToken);
    setToken(jwtToken);
    setUserData(user);
  };

  const onLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUserData(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        token,
        userData,
        isAuthenticated,
        onLogin,
        onLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};