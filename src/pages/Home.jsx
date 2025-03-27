import React, { useState, useEffect } from 'react';
import backgroundImage from '../assets/websitenavbar/background.png';
import Navbar from "../websiteComponents/navbar/Navbar.jsx";
import Navbarsidetext from "../websiteComponents/navbar/Navbarsidetext.jsx";
import Addbox from "../websiteComponents/navbar/Addbox.jsx";
import OutletCardContainer from "../websiteComponents/outletCardContainer/OutletCardContainer.jsx";
import Footer from "../websiteComponents/footer/Footer.jsx";
import BestProductContainer from "../websiteComponents/BestProductContainer/BestProductContainer.jsx";
import "../websiteComponents/scrollbar.css";

const Home = () => {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="relative w-full max-w-[100vw] overflow-x-hidden bg-[#e9e3e3]">
            {/* Background Section */}
            <div
                className="h-screen w-full bg-cover bg-center text-white flex flex-col transition-opacity duration-500 relative"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <Navbar />

                {/* Hide when scrolling down */}
                <div
                    className={`transition-opacity duration-200 ${scrollPosition > 100 ? "opacity-0 pointer-events-none" : "opacity-100"}`}
                >
                    <Navbarsidetext />

                    <div className="absolute right-[5%] bottom-[10%]">
                        <Addbox/>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div
                className="relative w-full z-20 bg-[#e9e3e3] transition-opacity duration-500 px-4 md:px-8"
                style={{
                    opacity: Math.min(scrollPosition / window.innerHeight, 1),
                }}
            >
                <BestProductContainer />
                <OutletCardContainer />
            </div>
            <Footer />
        </div>
    );
};

export default Home;