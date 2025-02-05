import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import OutletPage from "./pages/OutletPage";


import "./styles/App.css";
import DisplayTotal from "./components/DisplayTotal/DisplayTotal";
function App() {

  const PrivateRoute = ({ children }) => {
    const { token } = useContext(AuthContext);
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <>
      <Router>
    <Routes>
        {/* Show login page first */}
        <Route path="/login" element={<LoginPage/>} />
        {/* Protect other routes */}
        <Route path="/outlet" element={<PrivateRoute><OutletPage/></PrivateRoute>} />
        {/* <Route path="*" element={<Navigate to="/login" />} /> */}
      </Routes>
    </Router>

    <div>
      <DisplayTotal/>
    </div>
    </>
  );
}

export default App;
