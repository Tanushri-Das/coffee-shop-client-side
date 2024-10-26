import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

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

  return (
    <div className="flex justify-center mt-10">
      {isSmallScreen ? (
        <>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            className={`pagination-btn ${
              isPrevDisabled ? "cursor-not-allowed" : ""
            } px-4 py-2 rounded-l-md text-[16px] font-semibold ${
              isPrevDisabled ? "text-gray-400" : "text-gray-900"
            } flex items-center`}
            disabled={isPrevDisabled}
          >
            <FaArrowLeft className="mr-1" /> Prev
          </button>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className={`pagination-btn text-[16px] font-semibold ${
              isNextDisabled ? "cursor-not-allowed" : ""
            } px-4 py-2 ${
              isNextDisabled ? "text-gray-400" : "text-gray-900"
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
            className={`pagination-btn ${
              isPrevDisabled ? "cursor-not-allowed" : ""
            } px-4 py-2 rounded-l-md text-[16px] font-semibold ${
              isPrevDisabled ? "text-gray-400" : "text-gray-900"
            } flex items-center`}
            disabled={isPrevDisabled}
          >
            <FaArrowLeft className="mr-1" /> Prev
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => onPageChange(index + 1)}
              className={`pagination-btn text-[16px] font-semibold ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white rounded-lg"
                  : "bg-white text-blue-500"
              } px-4 py-2`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className={`pagination-btn text-[16px] font-semibold ${
              isNextDisabled ? "cursor-not-allowed" : ""
            } px-4 py-2 ${
              isNextDisabled ? "text-gray-400" : "text-gray-900"
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
