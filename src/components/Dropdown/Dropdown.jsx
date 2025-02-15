import React from 'react'
import { useState } from 'react';
import { motion } from 'framer-motion';

function Dropdown({ categoryList}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("All");
  
    const toggleDropdown = () => setIsOpen(!isOpen);
    const selectCategory = (category) => {
      setSelectedCategory(category);
      setIsOpen(false);
    };
    const categories = categoryList;
  return (
    <div>
        {/* Category Button */}
        <button
          type="button"
          onClick={toggleDropdown}
          className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:outline-none focus:ring-0 transition duration-300 transform hover:scale-105"
        >
          {selectedCategory}
          <svg
            className="w-2.5 h-2.5 ms-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        {/* Category Dropdown with Animation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44"
          >
            <ul className="py-2 text-sm text-gray-700">
              {categories.map((category) => (
                <li key={category}>
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 hover:bg-pink-100 transition duration-200"
                    onClick={() => selectCategory(category)}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
    </div>
  )
}

export default Dropdown