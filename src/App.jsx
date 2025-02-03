import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import OutletPage from "./pages/OutletPage";


import "./styles/App.css";
import OutletCardContainer from "./websiteComponents/outletCardContainer/OutletCardContainer";
function App() {

  const PrivateRoute = ({ children }) => {
    const { token } = useContext(AuthContext);
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <>
    <OutletCardContainer />

    </>
  );
}

export default App;
