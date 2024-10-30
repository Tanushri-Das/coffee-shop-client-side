import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ searchTerm, handleSearch, handleClearSearch }) => {
  return (
    <div className="w-full md:w-[500px] mx-auto">
      <div className="relative flex items-center w-full h-12 rounded-lg shadow-lg bg-white overflow-hidden">
        <div className="grid place-items-center h-full w-12 text-gray-300">
          <FaSearch className="h-5 w-5" />
        </div>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearch}
          className="outline-none p-3 text-black w-full md:w-[450px]"
        />
        {searchTerm && (
          <button
            onClick={handleClearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer bg-gradient-to-r bg-[#6F4E37] text-[16px] rounded-lg font-semibold text-white px-8 py-2"
          >
            Clear
          </button>
          
        )}
      </div>
    </div>
  );
};
export default SearchBar;
