import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import LogoutButton from "./buttons/LogoutButton";
import SliderNavButton from "./buttons/IconNavButton";
import ProfilePhoto from "./ProfilePhoto";
import { motion } from "framer-motion";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

const Sidebar = ({ isOpen, toggleSidebar, navItemList = [], sliderExpandWidth, sliderNotExpandWidth , user}) => 
  {
  const { logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const navItems=navItemList;
  console.log(navItems);


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
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }} // Increased duration for profile section
          className="flex flex-col items-center justify-center p-10 bg-pink-50 rounded-lg shadow-md m-5 h-60 "
        >
          <ProfilePhoto
            src="src/assets/profileImages/mathara.jpg"
            alt="User Profile"
            size={10}
            border={true}
          />
          <h2 className="mt-4 text-lg font-semibold text-pink-700 opacity-60">{user}</h2>
        </motion.div>
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
