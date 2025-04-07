import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import {getOutletOutletId} from "../api/outlet_service/outletController.js";



const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem("token");

  const [token, setToken] = useState(storedToken || null);//dw
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [role, setRole] = useState(null);
  const [outletId, setOutletId] = useState(null);
  const [outletName, setoutletName] = useState(null);

  const fetchOutlet = async (outletId) => {
    try {
      const data = await getOutletOutletId(outletId); // Call the function with ID
      setoutletName(data.outletName); // Save response in state
    } catch (err) {
      setError("Failed to fetch outlet");
      console.error(err);
    }
  };

  // Decode token only once on initial load
  useEffect(() => {
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        setUserId(decoded.userId);
        setUsername(decoded.username);
        setRole(decoded.role);
        setOutletId(decoded.outeltid);
        
        if(decoded.outletId!=-1){
          fetchOutlet(decoded.outletId); // Fetch outlet name using the outlet ID
          setoutletName(outletName);
        }else{
          setoutletName("");
        }



        
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

      if(decoded.outletId!=-1){
        fetchOutlet(decoded.outletId); // Fetch outlet name using the outlet ID
        setoutletName(outletName);
      }else{
        setoutletName("");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("userId", decoded.userId);
      localStorage.setItem("username", decoded.username);
      localStorage.setItem("role", decoded.role);
      localStorage.setItem("outletId", decoded.outeltid);
      localStorage.setItem("outletName", decoded.outletName);
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
    setoutletName(null);

    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("outletId");
    localStorage.removeItem("outletName");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        username,
        role,
        outletId,
        outletName,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
