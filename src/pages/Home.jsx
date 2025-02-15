import React from 'react';
import backgroundImage from '../assets/websitenavbar/background.png';
import Navbar from "../websiteComponents/navbar/Navbar.jsx";
import Navbarsidetext from "../websiteComponents/navbar/Navbarsidetext.jsx";
import Addbox from "../websiteComponents/navbar/Addbox.jsx";
import Footer from "../websiteComponents/footer/Footer.jsx"


const Home = () => {
    return (
        <div>
            < div
                className="h-screen bg-cover bg-center text-white flex flex-col"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <Navbar/>
                <Navbarsidetext/>
                <Addbox/>
                
            </div>
            <Footer/>
        </div>
    );
};

export default Home;