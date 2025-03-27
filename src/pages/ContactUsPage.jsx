import React, {useEffect, useState} from 'react';
import Navbar from "../websiteComponents/navbar/Navbar.jsx";
import Footer from "../websiteComponents/footer/Footer.jsx";
import ContactUs from "../websiteComponents/ContactUs/ContactUs.jsx";
import MapComponent from "../websiteComponents/ContactUs/MapComponent.jsx";
import "../websiteComponents/scrollbar.css";

const ContactUsPage = () => {

    const [scrollPosition, setScrollPosition] = useState(0);


    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);



    return (
        <div className='bg-[#e9e3e3]'>
            <div
                className="h-full w-full bg-[#e9e3e3]  bg-center text-white flex flex-col transition-opacity duration-500"
            >

                <Navbar />
                <br/>
                <div className="text-center mb-8">
                    <h2 className="text-[#F4952C] font-pacifico text-3xl ">Matara</h2>
                    <h3 className="text-black font-quicksand text-2xl font-semibold mt-2">
                        We Care About Our Customers <br /> Experience Too
                    </h3>
                </div>
                <MapComponent />

                
                <ContactUs/>



            </div>

            <div
                className=" w-full bg-[#e9e3e3]  bg-center text-white flex flex-col transition-opacity duration-500"
            >


                <Footer/>

            </div>
        </div>
    );
};

export default ContactUsPage;