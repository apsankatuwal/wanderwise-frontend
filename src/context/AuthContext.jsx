import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );

  const [userData, setUserData] = useState(null);

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