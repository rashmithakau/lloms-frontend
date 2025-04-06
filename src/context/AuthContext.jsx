import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem("token");

  const [token, setToken] = useState(storedToken || null);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [role, setRole] = useState(null);
  const [outletId, setOutletId] = useState(null);

  // Decode token only once on initial load
  useEffect(() => {
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        setUserId(decoded.userId);
        setUsername(decoded.username);
        setRole(decoded.role);
        setOutletId(decoded.outeltid);
      } catch (err) {
        console.error("Invalid token:", err);
        logoutUser(); // If token is invalid, logout
      }
    }
  }, [storedToken]);

  const loginUser = (token) => {
    try {
      const decoded = jwtDecode(token);

      setToken(token);
      setUserId(decoded.userId);
      setUsername(decoded.username);
      setRole(decoded.role);
      setOutletId(decoded.outeltid);

      localStorage.setItem("token", token);
      localStorage.setItem("userId", decoded.userId);
      localStorage.setItem("username", decoded.username);
      localStorage.setItem("role", decoded.role);
      localStorage.setItem("outletId", decoded.outeltid);
    } catch (err) {
      console.error("Failed to decode login token:", err);
    }
  };

  const logoutUser = () => {
    setToken(null);
    setUserId(null);
    setUsername(null);
    setRole(null);
    setOutletId(null);

    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("outletId");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        username,
        role,
        outletId,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
