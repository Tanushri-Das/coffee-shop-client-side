import React, { useState } from "react";
import { useSelector } from "react-redux";

const SearchByPrice = ({ onPriceChange, onClear }) => {
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const darkMode = useSelector((state) => state.theme.darkMode);

  const handlePriceChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedPriceRange(selectedValue);
    onPriceChange(selectedValue); // Trigger the price change callback
  };
  const handleReset = () => {
    setSelectedPriceRange(""); // Clear the input
    onClear(); // Call the onClear function to reset the state
  };
  return (
    <>
      <h1
        className={`text-xl font-semibold mb-3 text-center ${
          darkMode ? "text-white" : "text-black"
        }`}
      >
        Search by Price
      </h1>
      <div className="flex items-center">
        <select
          id="priceRange"
          value={selectedPriceRange}
          onChange={handlePriceChange}
          className={`block w-full p-2 border rounded cursor-pointer ${
            darkMode
              ? "bg-gray-700 text-white border-gray-500"
              : "bg-white text-black border-gray-300"
          }`}
        >
          <option value="">Select a price range</option>
          <option value="0-50">0-50</option>
          <option value="51-100">51-100</option>
          <option value="101-150">101-150</option>
        </select>
        <button
          onClick={handleReset}
          className={`ml-2 2xl:ml-4 px-4 py-2 rounded-md transition-colors ${
            darkMode
              ? "bg-gray-600 text-white hover:bg-gray-700"
              : "bg-gray-500 text-white hover:bg-gray-600"
          }`}
        >
          Reset
        </button>
      </div>
    </>
  );
};

export default SearchByPrice;
