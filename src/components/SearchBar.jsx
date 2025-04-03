import { useState } from "react";
import Dropdown from "./Dropdown/Dropdown";

const SearchBar = ({ 
  categoryList = [], 
  dropdown = true, 
  txt = "", 
  onCategoryChange, 
  onSearchChange 
}) => {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    if (onSearchChange) {
      onSearchChange(event.target.value);
    }
  };

  const roundstyle = dropdown ? "rounded-e-lg" : "rounded-md";

  return (
    <form className="relative max-w-lg mx-auto w-[700px] mt-4">
      <div className="flex relative">
        {/* Render Dropdown Only If Enabled */}
        {dropdown && <Dropdown categoryList={categoryList} onChange={onCategoryChange} />}

        {/* Search Input */}
        <div className="relative w-full">
          <input
            type="search"
            value={searchText}
            onChange={handleSearchChange}
            className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 ${roundstyle} border border-gray-300 focus:outline-none focus:ring-0 transition transform duration-200 ease-in-out focus:scale-105 pr-10`}
            placeholder={`Search ${txt}`}
            required
          />
          <button
            type="submit"
            className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-pink-400 rounded-e-lg border border-pink-500 hover:bg-pink-500 focus:outline-none focus:ring-0 transition duration-300 transform hover:scale-105"
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
