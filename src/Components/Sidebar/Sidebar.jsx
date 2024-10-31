import React from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaShoppingCart, FaHome } from "react-icons/fa";
import { FaBell, FaUtensils } from "react-icons/fa6";
import logo from "../../assets/logo.png";
import { PiSignOutBold } from "react-icons/pi";
import useSignOut from "../../hooks/useSignOut";
import { MdReviews } from "react-icons/md";

const Sidebar = () => {
  const handleSignOut = useSignOut();
  return (
    <div className="bg-gray-800 text-white w-16 md:w-64 min-h-screen flex flex-col">
      <div className="flex justify-center items-center my-6">
        <img
          alt="logo"
          className="w-12 h-12 sm:w-14 sm:h-14 xl:w-16 xl:h-16 bg-gray-100 object-cover rounded-full"
          src={logo}
        />
        <h1 className="text-white ps-2 italic text-xl lg:text-2xl font-bold hidden md:block">
          Sip Coffee
        </h1>
      </div>

      <nav>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center p-4 hover:bg-gray-700 ${
              isActive ? "bg-gray-700" : ""
            }`
          }
          end
        >
          <FaTachometerAlt className="text-xl" />
          <span className="ml-3 hidden md:block text-[16px] font-medium">
            Dashboard
          </span>
        </NavLink>
        <NavLink
          to="/dashboard/myCart"
          className={({ isActive }) =>
            `flex items-center p-4 hover:bg-gray-700 ${
              isActive ? "bg-gray-700" : ""
            }`
          }
        >
          <FaShoppingCart className="text-xl" />
          <span className="ml-3 hidden md:block text-[16px] font-medium">
            My Cart
          </span>
        </NavLink>
        <NavLink
          to="/dashboard/myWishlist"
          className={({ isActive }) =>
            `flex items-center p-4 hover:bg-gray-700 ${
              isActive ? "bg-gray-700" : ""
            }`
          }
        >
          <FaBell className="text-xl" />
          <span className="ml-3 hidden md:block text-[16px] font-medium">
            My Wishlist
          </span>
        </NavLink>
        <NavLink
          to="/dashboard/addReview"
          className={({ isActive }) =>
            `flex items-center p-4 hover:bg-gray-700 ${
              isActive ? "bg-gray-700" : ""
            }`
          }
        >
          <MdReviews className="text-xl" />
          <span className="ml-3 hidden md:block text-[16px] font-medium">
            Add Review
          </span>
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center p-4 hover:bg-gray-700 ${
              isActive ? "bg-gray-700" : ""
            }`
          }
        >
          <FaHome className="text-xl" />
          <span className="ml-3 hidden md:block text-[16px] font-medium">
            Home
          </span>
        </NavLink>
        <NavLink
          to="/menu"
          className={({ isActive }) =>
            `flex items-center p-4 hover:bg-gray-700 ${
              isActive ? "bg-gray-700" : ""
            }`
          }
        >
          <FaUtensils className="text-xl" />
          <span className="ml-3 hidden md:block text-[16px] font-medium">
            Menu
          </span>
        </NavLink>
        <div className="flex items-center p-4">
          <button onClick={handleSignOut} className="flex items-center">
            <PiSignOutBold className="text-xl" />
            <span className="ml-3 hidden md:block text-[16px] font-medium">
              Sign Out
            </span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
