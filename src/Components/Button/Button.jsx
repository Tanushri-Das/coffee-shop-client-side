import React from "react";

const Button = ({ name, onClick }) => {
  return (
    <>
      <button
        type="submit"
        onClick={onClick}
        className="bg-[#6F4E37] text-lg text-white px-6 py-2 rounded-md font-semibold"
      >
        {name}
      </button>
    </>
  );
};

export default Button;
