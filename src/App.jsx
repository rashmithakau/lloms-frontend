import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import OutletPage from "./pages/OutletPage";
import "./styles/App.css";
import Home from "./pages/Home.jsx";

import FactoryStaffPage from "./pages/FactoryStaffPage.jsx";
import OwnerPage from "./pages/OwnerPage.jsx";
import ShopPage from "./pages/ShopPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";

function App() {
  const PrivateRoute = ({ children }) => {
    const { token } = useContext(AuthContext);
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <>
      <Router>
        
        <Routes>
        <Route path="*" element={<Navigate to="/login" />} /> 
          <Route path="/" element={<Home />} />

          {/* Show Shop page */}
          <Route path="/shop" element={<ShopPage />} />

          {/* Show login page first */}
          <Route path="/login" element={<LoginPage />} />

          <Route path="/outlet" element={<OutletPage />} />
          {/* <PrivateRoute><OutletPage/></PrivateRoute> */}

          <Route path="/factory-Staff" element={<FactoryStaffPage />} />

          <Route path="/owner" element={<OwnerPage />} />

          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
