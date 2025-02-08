import React from 'react';
import backgroundImage from '../assets/websitenavbar/background.png';
import Navbar from "../websiteComponents/navbar/Navbar.jsx";
import Navbarsidetext from "../websiteComponents/navbar/Navbarsidetext.jsx";
import Addbox from "../websiteComponents/navbar/Addbox.jsx";



const Home = () => {
    return (
        < div
            className="h-screen bg-cover bg-center text-white flex flex-col"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <Navbar/>
            <Navbarsidetext/>
            <Addbox/>
        </div>
    );
};

export default Home;