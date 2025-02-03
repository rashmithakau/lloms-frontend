import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import OutletPage from "./pages/OutletPage";


import "./styles/App.css";
function App() {

  const PrivateRoute = ({ children }) => {
    const { token } = useContext(AuthContext);
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <>
      {/* <Layout>

        <div className="flex">
          <SearchBar categoryList={categories}/>
          <NotificationButton />
        </div>

        <div className="flex justify-center items-center my-5">
          <CardContainer>
            {Array.from({ length: 30 }).map((_, index) => (
              <ItemCard key={index} />
            ))}
          </CardContainer>
        </div>

      </Layout> */}

    {/* <LoginPage/> */}

    <Router>
    <Routes>
        {/* Show login page first */}
        <Route path="/login" element={<LoginPage/>} />

        {/* Protect other routes */}
        <Route path="/outlet" element={<PrivateRoute><OutletPage/></PrivateRoute>} />
        {/* <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} /> */}

        {/* Redirect unknown routes to login */}
        {/* <Route path="*" element={<Navigate to="/login" />} /> */}
      </Routes>
    </Router>

 

    </>
  );
}

export default App;
