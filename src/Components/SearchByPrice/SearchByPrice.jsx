import React, { useState } from "react";

const SearchByPrice = ({ onPriceChange, onClear }) => {
  const [selectedPriceRange, setSelectedPriceRange] = useState("");

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
      <h1 className="text-xl text-center font-semibold mb-4">
        Search by Price{" "}
      </h1>
      <div className="flex items-center">
        <select
          id="priceRange"
          value={selectedPriceRange}
          onChange={handlePriceChange}
          className="block w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select a price range</option>
          <option value="0-50">0-50</option>
          <option value="51-100">51-100</option>
          <option value="101-150">101-150</option>
        </select>
        <button
          onClick={handleReset}
          className="ml-2 2xl:ml-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
        >
          Reset
        </button>
      </div>
    </>
  );
};

export default SearchByPrice;
