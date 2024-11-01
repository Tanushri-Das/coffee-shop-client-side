import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaXmark } from "react-icons/fa6";
import Button from "../../Button/Button";
import { FaRegMoon } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";
import { toggleDarkMode } from "../../../redux/features/theme/themeSlice";
import useSignOut from "../../../hooks/useSignOut";
import logo from "../../../assets/logo.png";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [isOpen, setIsOpen] = useState(false);
  const handleSignOut = useSignOut();

  const toggleDrawer = () => {
    setIsOpen((prev) => !prev);
  };
  const closeDrawer = () => {
    setIsOpen(false);
  };

  const handleThemeToggle = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <nav
      className={`border-b-[1px] ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="px-8 lg:px-12 xl:px-20 py-4 flex items-center justify-between">
        <div className="text-lg font-bold md:flex-grow-0">
          <Link to="/">
            <div className="flex justify-center items-center">
              <img
                src={logo}
                alt=""
                className="w-[60px] h-[60px]"
              />
              <h2 className="text-2xl xl:text-3xl font-semibold italic">Sip Coffee</h2>
            </div>
          </Link>
        </div>
        <div className="flex items-center">
          {/* Main navigation for large screens */}
          <div className="hidden lg:block ml-auto">
            <div className="flex items-center justify-center space-x-8">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-xl ${
                    isActive
                      ? `${darkMode ? "text-white" : "text-black"} font-bold`
                      : "text-[#737373]"
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/menu"
                className={({ isActive }) =>
                  `text-xl ${
                    isActive
                      ? `${darkMode ? "text-white" : "text-black"} font-bold`
                      : "text-[#737373]"
                  }`
                }
              >
                Menu
              </NavLink>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `text-xl ${
                    isActive
                      ? `${darkMode ? "text-white" : "text-black"} font-bold`
                      : "text-[#737373]"
                  }`
                }
              >
                Dashboard
              </NavLink>
              <button onClick={handleThemeToggle} className="text-xl">
                {darkMode ? (
                  <FaRegMoon className="text-2xl" />
                ) : (
                  <IoSunnyOutline className="text-2xl" />
                )}
              </button>
              {user ? (
                <>
                  <h1 className="text-lg font-semibold">
                    Welcome, {user.name}
                  </h1>
                  <Button onClick={handleSignOut} name="Sign Out" />
                </>
              ) : (
                <Link to="/login">
                  <Button name="Login" />
                </Link>
              )}
            </div>
          </div>

          {/* Bar icon for small to medium screens */}
          <div className="lg:hidden">
            <FaBars onClick={toggleDrawer} className="h-8 w-8 cursor-pointer" />
          </div>
        </div>

        {/* Drawer overlay and content, only visible on small to medium screens */}
        {isOpen && (
          <>
            <div
              className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40 md:block lg:hidden"
              onClick={closeDrawer}
            ></div>
            <div
              className={`fixed inset-y-0 left-0 w-64 z-50 transform ${
                isOpen ? "translate-x-0" : "-translate-x-full"
              } transition-transform duration-300 ${
                darkMode ? "bg-[#151e3d] text-white" : "bg-white text-black"
              } md:block lg:hidden`}
            >
              <div className="p-5">
                <button onClick={closeDrawer} className="flex justify-end mb-6">
                  <FaXmark className="h-6 w-6" />
                </button>
                <NavLink
                  to="/"
                  onClick={closeDrawer}
                  className={({ isActive }) =>
                    `text-xl block mb-3 ${
                      isActive
                        ? `${darkMode ? "text-white" : "text-black"} font-bold`
                        : "text-[#737373]"
                    }`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/menu"
                  onClick={closeDrawer}
                  className={({ isActive }) =>
                    `text-xl block mb-3 ${
                      isActive
                        ? `${darkMode ? "text-white" : "text-black"} font-bold`
                        : "text-[#737373]"
                    }`
                  }
                >
                  Menu
                </NavLink>
                <NavLink
                  to="/dashboard"
                  onClick={closeDrawer}
                  className={({ isActive }) =>
                    `text-xl block mb-3 ${
                      isActive
                        ? `${darkMode ? "text-white" : "text-black"} font-bold`
                        : "text-[#737373]"
                    }`
                  }
                >
                  Dashboard
                </NavLink>
                <button
                  onClick={() => {
                    handleThemeToggle();
                    closeDrawer();
                  }}
                  className="text-xl block mb-3"
                >
                  {darkMode ? (
                    <FaRegMoon className="text-2xl" />
                  ) : (
                    <IoSunnyOutline className="text-2xl" />
                  )}
                </button>
                {user ? (
                  <>
                    <h1 className="text-lg font-semibold mb-5">
                      {user.displayName}
                    </h1>
                    <Button onClick={handleSignOut} name="Logout" />
                  </>
                ) : (
                  <Link to="/login">
                    <Button name="Login" />
                  </Link>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
