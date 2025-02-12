import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import OutletPage from "./pages/OutletPage";
import "./styles/App.css";
import Home from "./pages/Home.jsx";
import OrderHistoryPage from "./pages/OrderHistoryPage.jsx";
import CustomerOrderHistoryPage from "./pages/CustomerOrderHistory.jsx";
import ReturnHistoryPage from "./pages/ReturnHistory.jsx";

import FactoryStaffPage from "./pages/FactoryStaffPage.jsx";
import OwnerPage from "./pages/OwnerPage.jsx";

function App() {
  const PrivateRoute = ({ children }) => {
    const { token } = useContext(AuthContext);
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <>
      <Router>
        <Routes>
          {/* Show Home page */}
          <Route path="/" element={<Home />} />

          {/* Show login page first */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protect other routes */}
          <Route path="/outlet" element={<OutletPage />} />
          {/* <PrivateRoute><OutletPage/></PrivateRoute> */}

          {/* Show order history page */}
          <Route path="/order-history" element={<OrderHistoryPage />} />

          <Route path="/factory-Staff" element={<FactoryStaffPage/>}/>

          <Route path="/owner" element={<OwnerPage/>}/>

          {/* Show customer order history page */}
          <Route
            path="/customer-order-history"
            element={<CustomerOrderHistoryPage />}
          />
          {/* Show customer order history page */}
          <Route path="/return-history" element={<ReturnHistoryPage />} />

          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </Router>

    </>
  );
}

export default App;
