import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/websitenavbar/logo.png';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="relative flex items-center justify-between bg-[#FF8C42] px-4 py-3 shadow-md md:px-8 md:py-4">
            {/* Logo and Navigation */}
            <div className="flex items-center gap-6">
                {/* Logo and Brand */}
                <div className="flex items-center gap-3">
                    <Link to="/" className="flex items-center gap-3">
                        <img
                            src={logo}
                            alt="Little Lanka Logo"
                            className="h-10 w-10 transition-transform duration-300 hover:scale-110"
                        />
                        <span className="text-lg text-white font-pacifico md:text-2xl">
                            Little Lanka
                        </span>
                    </Link>

                    <div className="h-6 w-[4px] bg-white"></div>
                </div>

                {/* Desktop Navigation - Now placed next to the logo */}
                <div className="hidden md:flex">
                    <ul className="flex gap-8 ml-6">
                        {['Home', 'Shop', 'Contact', 'About'].map((item) => (
                            <li key={item}>
                                <Link
                                    to={item === 'Shop' ? '/shop' : item === 'Contact' ? '/contactus' : item === 'About' ? '/about': item === 'Home' ? '/': '#'}
                                    className="relative text-white transition-all duration-300 hover:text-orange-100
                                    text-sm lg:text-base
                                    before:absolute before:-bottom-1 before:left-0 before:h-[2px] before:w-0 before:bg-white
                                    before:transition-all before:duration-300 hover:before:w-full"
                                >
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Search and Mobile Menu */}
            <div className="flex items-center gap-4">
                {/* Desktop Search */}
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
                <button
                    className="text-white md:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
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

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-[#FF8C42] md:hidden z-50 shadow-lg">
                    <div className="px-4 py-4">
                        <ul className="space-y-4 mb-4">
                            {['Home', 'Shop', 'Contact', 'About'].map((item) => (
                                <li key={item}>
                                    <Link
                                        to={item === 'Shop' ? '/shop' : item === 'Contact' ? '/contactus' : item === 'About' ? '/about': item === 'Home' ? '/': '#'}
                                        className="block text-white hover:text-orange-100 text-base"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full rounded-lg bg-white/20 px-3 py-2 pl-10 text-white placeholder-white/80
                                focus:outline-none focus:ring-2 focus:ring-white"
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
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;