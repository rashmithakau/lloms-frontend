import { useState } from "react";
import Sidebar from "./Sidebar";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";



const Layout = ({ children , navItemList=[],user="Mathara Outlet"}) => {
  const { username } = useContext(AuthContext);
  console.log("username:", username);
  const sliderExpandWidth = 90;
  const sliderNotExpandWidth = 16;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };



  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} user={username}
         sliderExpandWidth={sliderExpandWidth} 
         sliderNotExpandWidth={sliderNotExpandWidth} 
         navItemList={navItemList} />


      {/* Main Content */}
      <div
        className={`transition-all duration-300 flex-1 bg-gray-50 m-0 ${
          isSidebarOpen
            ? `pl-90`
            : `pl-16`
        }`}
      >
        <main className="px-5 py-2 bg-white h-full">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
