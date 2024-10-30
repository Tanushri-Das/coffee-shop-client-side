import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  isSmallScreen,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div className="flex justify-center mt-6">
      {isSmallScreen ? (
        <>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            className={`${
              isPrevDisabled ? "cursor-not-allowed" : ""
            } px-4 py-2 rounded-l-md text-[16px] font-semibold ${
              isPrevDisabled
                ? "text-gray-400"
                : darkMode
                ? "text-white"
                : "text-gray-900"
            } flex items-center`}
            disabled={isPrevDisabled}
          >
            <FaArrowLeft className="mr-1" /> Prev
          </button>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className={`text-[16px] font-semibold ${
              isNextDisabled ? "cursor-not-allowed" : ""
            } px-4 py-2 ${
              isNextDisabled
                ? "text-gray-400"
                : darkMode
                ? "text-white"
                : "text-gray-900"
            } flex items-center`}
            disabled={isNextDisabled}
          >
            Next <FaArrowRight className="ml-1" />
          </button>
        </>
      ) : (
        <div className="flex">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            className={`${
              isPrevDisabled ? "cursor-not-allowed" : ""
            } px-4 py-2 rounded-l-md text-[16px] font-semibold ${
              isPrevDisabled
                ? "text-gray-400"
                : darkMode
                ? "text-white"
                : "text-gray-900"
            } flex items-center`}
            disabled={isPrevDisabled}
          >
            <FaArrowLeft className="mr-1" /> Prev
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => onPageChange(index + 1)}
              className={`text-[16px] font-semibold px-4 py-2 ${
                currentPage === index + 1
                  ? darkMode
                    ? "bg-[#6F4E37] text-white rounded-lg"
                    : "bg-[#6F4E37] text-white rounded-lg"
                  : darkMode
                  ? "bg-gray-800 text-white"
                  : "bg-white text-[#6F4E37]"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className={`text-[16px] font-semibold ${
              isNextDisabled ? "cursor-not-allowed" : ""
            } px-4 py-2 ${
              isNextDisabled
                ? "text-gray-400"
                : darkMode
                ? "text-white"
                : "text-gray-900"
            } flex items-center`}
            disabled={isNextDisabled}
          >
            Next <FaArrowRight className="ml-1" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
