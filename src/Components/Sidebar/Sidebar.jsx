import React from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaShoppingCart, FaHome } from "react-icons/fa";
import { FaBell, FaUtensils } from "react-icons/fa6";
import logo from "../../assets/logo.png";
import { PiSignOutBold } from "react-icons/pi";

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-16 md:w-64 h-screen flex flex-col">
      <div className="flex px-4 items-center my-6">
        <img
          alt="logo"
          className="w-14 h-14 bg-gray-100 object-cover rounded-full"
          src={logo}
        />
        <h1 className="text-white ps-2 italic text-xl lg:text-2xl font-bold">
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
          <FaTachometerAlt className="text-lg" />
          <span className="ml-3 hidden md:block">Dashboard</span>
        </NavLink>
        <NavLink
          to="/dashboard/myCart"
          className={({ isActive }) =>
            `flex items-center p-4 hover:bg-gray-700 ${
              isActive ? "bg-gray-700" : ""
            }`
          }
        >
          <FaShoppingCart className="text-lg" />
          <span className="ml-3 hidden md:block">My Cart</span>
        </NavLink>
        <NavLink
          to="/dashboard/myWishlist"
          className={({ isActive }) =>
            `flex items-center p-4 hover:bg-gray-700 ${
              isActive ? "bg-gray-700" : ""
            }`
          }
        >
          <FaBell className="text-lg" />
          <span className="ml-3 hidden md:block">My Wishlist</span>
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center p-4 hover:bg-gray-700 ${
              isActive ? "bg-gray-700" : ""
            }`
          }
        >
          <FaHome className="text-lg" />
          <span className="ml-3 hidden md:block">Home</span>
        </NavLink>
        <NavLink
          to="/menu"
          className={({ isActive }) =>
            `flex items-center p-4 hover:bg-gray-700 ${
              isActive ? "bg-gray-700" : ""
            }`
          }
        >
          <FaUtensils className="text-lg" />
          <span className="ml-3 hidden md:block">Menu</span>
        </NavLink>
        <NavLink
          to="/menu"
          className={({ isActive }) =>
            `flex items-center p-4 hover:bg-gray-700 ${
              isActive ? "bg-gray-700" : ""
            }`
          }
        >
          <PiSignOutBold className="text-lg" />
          <span className="ml-3 hidden md:block">Sign Out</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
