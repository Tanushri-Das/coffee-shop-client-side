import React from "react";

const Button = ({ name, onClick }) => {
  return (
    <>
      <button
        type="submit"
        onClick={onClick}
        className="bg-[#a865b5] text-lg text-white px-5 py-2 rounded-md font-semibold"
      >
        {name}
      </button>
    </>
  );
};

export default Button;
