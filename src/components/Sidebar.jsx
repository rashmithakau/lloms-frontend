import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import LogoutButton from "./buttons/LogoutButton";
import SliderNavButton from "./buttons/IconNavButton";
import { motion } from "framer-motion";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // Assuming Swal is imported for error handling

const Sidebar = ({ isOpen, toggleSidebar, navItemList = [], sliderExpandWidth, sliderNotExpandWidth, user }) => {
  const { logoutUser, outletId } = useContext(AuthContext);
  const navigate = useNavigate();
  const [outletName, setOutletName] = useState();
  const [loading, setLoading] = useState(false); // Added loading state

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const navItems = navItemList;

  useEffect(() => {
    const fetchOutletData = async () => {
      setLoading(true); // Start loading
      if(outletId != -1){
        try {
          const response = await axios.get("http://localhost:8088/api/v1/outlet/get-outlet-by-id", {
            params: { "outlet-id": 1 },
          });

          if (response.data && response.data.data.outletName) {
            setOutletName(response.data.data.outletName); // Set the outlet name
            console.log(response.data.data); // Display the fetched data
          } 
        } catch (error) {
          console.error("Error fetching outlet data:", error);
          Swal.fire("Error", "Failed to load outlet data", "error");
        } finally {
          setLoading(false); // End loading
        }
      }
      setLoading(false); // End loading
    };
    fetchOutletData();
  }, [outletId]); // Run when `outletId` changes

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 25, duration: 0.8 }} // Increased duration here
      className={`fixed top-0 left-0 h-full bg-gradient-to-r from-purple-50 to-pink-100 text-black shadow-lg transition-all duration-300 ease-in-out ${
        isOpen ? `w-${sliderExpandWidth}` : `w-${sliderNotExpandWidth}`
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-pink-300">
        {isOpen && <h2 className="text-2xl font-bold text-pink-800 opacity-65">Little Lanka Pvt Ltd</h2>}
        <button
          onClick={toggleSidebar}
          aria-expanded={isOpen}
          aria-label="Toggle sidebar"
          className="p-2 rounded-full bg-pink-200 hover:bg-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-md transition transform hover:scale-110"
        >
          {isOpen ? (
            <ChevronLeftIcon className="h-6 w-6 text-pink-600" />
          ) : (
            <ChevronRightIcon className="h-6 w-6 text-pink-600" />
          )}
        </button>
      </div>

      {/* Profile Section */}
      {isOpen && !loading && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }} // Increased duration for profile section
          className="flex flex-col items-center justify-center p-6 bg-gradient-to-r from-purple-100 via-pink-100 to-pink-200 rounded-lg shadow-xl m-5 h-60 space-y-4"
        >
          {/* Profile Photo */}
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-pink-300 mb-4">
            <img
              src="src/assets/profileImages/mathara.jpg" // Replace this with dynamic profile photo path if needed
              alt="User Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Name Section */}
          <div className="text-center">
            {/* User Name */}
            <h1 className="text-xl font-semibold text-pink-700 opacity-90 transition-transform duration-300 transform hover:scale-105">{user}</h1>
            
            {/* Outlet Name */}
            <h2 className="mt-2 text-lg font-medium text-pink-500 opacity-80 transition-transform duration-300 transform hover:scale-105">{outletName}</h2>
          </div>
        </motion.div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center h-full">
          <span className="text-pink-600 text-lg"></span>
        </div>
      )}

      {/* Navigation */}
      <nav className={`mt-6 ${isOpen ? "px-4" : "px-2"}`}>
        <ul className="space-y-4">
          {navItems.map((item) => (
            <li key={item.nameBtn} className="flex items-center">
              {!isOpen && (
                <div className="w-8 h-8 flex justify-center items-center hover:bg-pink-400 bg-pink-200 rounded-md shadow-md transition transform hover:scale-110 ml-3">
                  <img
                    src={item.iconUrl}
                    alt={`${item.nameBtn} icon`}
                    className="w-6 h-6"
                    onClick={item.fun}
                  />
                </div>
              )}
              {isOpen && (
                <SliderNavButton
                  onClick={item.fun}
                  icon={item.iconUrl}
                  isSliderBtn={true}
                  isSelected={true}
                  isActive={item.isActive}
                >
                  {item.nameBtn}
                </SliderNavButton>
              )}
            </li>
          ))}
          {isOpen && (
            <li>
              <LogoutButton
                onClick={handleLogout}
                className="hover:bg-pink-300 text-pink-800 transition duration-200 transform hover:scale-105"
              >
                Logout
              </LogoutButton>
            </li>
          )}
        </ul>
      </nav>
    </motion.div>
  );
};

export default Sidebar;
