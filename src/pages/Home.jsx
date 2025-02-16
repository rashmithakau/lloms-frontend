import React, { useState, useEffect } from 'react';
import backgroundImage from '../assets/websitenavbar/background.png';
import Navbar from "../websiteComponents/navbar/Navbar.jsx";
import Navbarsidetext from "../websiteComponents/navbar/Navbarsidetext.jsx";
import Addbox from "../websiteComponents/navbar/Addbox.jsx";

import OutletCardContainer from "../websiteComponents/outletCardContainer/OutletCardContainer.jsx";
import Footer from "../websiteComponents/footer/Footer.jsx";
import BestProductContainer from "../websiteComponents/BestProductContainer/BestProductContainer.jsx";

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

        <div className="relative w-full max-w-[100vw] overflow-x-hidden">
            {/* Custom Scrollbar Styles */}
            <style>
                {`
                    ::-webkit-scrollbar {
                        width: 8px;
                    }

                    ::-webkit-scrollbar-track {
                        background: rgba(255, 255, 255, 0.1);
                        border-radius: 4px;
                    }

                    ::-webkit-scrollbar-thumb {
                        background: rgba(255, 255, 255, 0.3);
                        border-radius: 4px;
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        backdrop-filter: blur(5px);
                    }

                    ::-webkit-scrollbar-thumb:hover {
                        background: rgba(255, 255, 255, 0.4);
                    }

                    html {
                        scroll-behavior: smooth;
                        overflow-x: hidden;
                    }

                    body {
                        margin: 0;
                        padding: 0;
                        overflow-x: hidden;
                    }
                `}
            </style>

            {/* Background Section */}
            <div
                className="h-screen w-full bg-cover bg-center text-white flex flex-col transition-opacity duration-500"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <Navbar />

                {/* Hide when scrolling down */}
                <div
                    className={`transition-opacity duration-200 ${scrollPosition > 100 ? "opacity-0 pointer-events-none" : "opacity-100"}`}
                >
                    <Navbarsidetext />
                    <Addbox />
                </div>
            </div>

            {/* Content Section */}
            <div
                className="relative w-full z-20 bg-white transition-opacity duration-500 px-4 md:px-8"
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

