import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");
    if (storedUsername && storedPassword) {
      setUsername(storedUsername);
      setPassword(storedPassword);
    }

    setIsLoading(false);
  }, []);

  const login = (data) => {
    localStorage.setItem("username", data.username);
    localStorage.setItem("password", data.password);
    setUsername(data.username);
    setPassword(data.password);
  };

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    setUsername(null);
    setPassword(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!(username && password),
        username,
        password,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
