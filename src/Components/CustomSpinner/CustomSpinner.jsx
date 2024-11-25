import React from "react";
import loaderImage from "../../assets/load.jpg";
import './CustomSpinner.css'

const CustomSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <img
        src={loaderImage}
        alt="Loading..."
        className="spinner w-28 h-28"
      />
    </div>
  );
};

export default CustomSpinner;