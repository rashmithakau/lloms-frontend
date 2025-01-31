import { useState } from "react";
import { motion } from "framer-motion";

const SearchBar = ({ categoryList }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All categories");

  const toggleDropdown = () => setIsOpen(!isOpen);
  const selectCategory = (category) => {
    setSelectedCategory(category);
    setIsOpen(false);
  };
  const categories = categoryList;

  return (
    <form className="max-w-lg mx-auto w-700">
      <div className="flex relative">
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

        {/* Search Input with Improved Focus Styles */}
        <div className="relative w-full">
          <input
            type="search"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:outline-none focus:ring-0 transition transform duration-200 ease-in-out focus:scale-105"
            placeholder="Search for products"
            required
          />
          <button
            type="submit"
            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-pink-400 rounded-e-lg border border-pink-500 hover:bg-pink-500 focus:outline-none focus:ring-0 transition duration-300 transform hover:scale-105"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
