import React from 'react';
import logo from '../../assets/websitenavbar/logo.png';
const Navbar = () => {  
    return (
        <nav className="flex items-center justify-between bg-[#FF8C42] px-4 py-3 shadow-md md:px-8 md:py-4">
            {/* Combined Logo and Navigation Section */}
            <div className="flex items-center gap-6">
                {/* Logo Section */}
                <div className="flex items-center gap-3">
                    <img
                        src={logo}
                        alt="Little Lanka Logo"
                        className="h-8 w-8 transition-transform duration-300 hover:scale-110"
                    />
                    <div className="flex items-center gap-2">
                        <span className="font-pacifico text-lg text-white md:text-xl">
                            Little Lanka
                        </span>
                        <div className="h-6 w-[4px] bg-white/50"></div>
                    </div>
                </div>

                {/* Navigation Links - Hidden on mobile */}
                <div className="hidden flex-grow items-center justify-center md:flex">
                    <ul className="flex gap-8">
                        {['Home', 'About', 'Shop', 'Contact'].map((item) => (
                            <li key={item}>
                                <a
                                    href="#"
                                    className="relative text-white transition-all duration-300 hover:text-orange-100
                                    before:absolute before:-bottom-1 before:left-0 before:h-[2px] before:w-0 before:bg-white
                                    before:transition-all before:duration-300 hover:before:w-full"
                                >
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Search Bar */}
            <div className="flex items-center gap-4">
                {/* Search Input with Icon */}
                <div className="relative hidden md:block">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-40 rounded-lg bg-white/20 px-3 py-1 pl-10 text-white placeholder-white/80
            transition-all duration-300 focus:w-48 focus:outline-none focus:ring-2 focus:ring-white"
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-white/80"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 10-10.61 0 7.5 7.5 0 0010.61 0z"
                        />
                    </svg>
                </div>

                {/* Mobile Menu Button */}
                <button className="text-white md:hidden">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
            </div>

        </nav>
    );
};

export default Navbar;