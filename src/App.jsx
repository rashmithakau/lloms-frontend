import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import OutletPage from "./pages/OutletPage";
import "./styles/App.css";
import Home from "./pages/Home.jsx";
import Item from "./components/Item.jsx";
import PopUpWindow from "./components/PopUpWindow.jsx";

function App() {

  const PrivateRoute = ({ children }) => {
    const { token } = useContext(AuthContext);
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <>
      

    
      <Item/>
    
    </>

    
  );
}

export default App;
