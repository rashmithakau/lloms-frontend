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
import ContactUsPage from "./pages/ContactUsPage.jsx";
import Aboutpage from "./pages/Aboutpage.jsx";


function App() {
  const PrivateRoute = ({ children, allowedRoles }) => {
    const { token, role } = useContext(AuthContext);
  
    if (!token || !allowedRoles.includes(role)) {
      return <Navigate to="/login" />;
    }
  
    return children;
  };


  return (
    <>
      <Router>
        
        <Routes>
        <Route path="*" element={<Navigate to="/login" />} /> 
          <Route path="/" element={<Home />} />

          {/* Show Shop page */}
          <Route path="/shop" element={<ShopPage />} />

          {/* Show Contact Us page */}
          <Route path="/contactus" element={<ContactUsPage />} />

          {/* Show About page */}
          <Route path="/about" element={<Aboutpage />} />

          {/* Show login page first */}
          <Route path="/login" element={<LoginPage />} />

          <Route path="/outlet" element={<PrivateRoute allowedRoles={[1]}><OutletPage /></PrivateRoute>} />
          {/* <PrivateRoute><OutletPage/></PrivateRoute> */}

          

          <Route path="/factory-Staff" element={<PrivateRoute allowedRoles={[2]}><FactoryStaffPage /></PrivateRoute>} />

          
          <Route path="/owner" element={<PrivateRoute allowedRoles={[3]}><OwnerPage /></PrivateRoute>} />

          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </Router>

      

    </>
  );
}

export default App;
