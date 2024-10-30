import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../../Firebase/Firebase.config"; 
import { signOut } from "firebase/auth";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaXmark } from "react-icons/fa6";
import { logoutUser } from "../../../redux/features/auth/authSlice";
import Button from "../../Button/Button";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  console.log("name", user?.name);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  const closeDrawer = () => {
    setIsOpen(false);
  };
  const handleLogout = () => {
    signOut(auth).then(() => {
      dispatch(logoutUser());
    });
  };

  return (
    <nav className="border-b-[1px]">
      <div className="px-8 lg:px-12 xl:px-20 py-4 flex items-center justify-between">
        <div className="text-lg font-bold md:flex-grow-0">
          <Link to="/">
            <div className="flex justify-center items-center">
              <h2 className="text-2xl xl:text-3xl font-semibold">
                <span className="doc">Dental</span> Ease
              </h2>
            </div>
          </Link>
        </div>
        <div className="flex items-center">
          <div className="hidden lg:block ml-auto">
            <div className="flex items-center justify-center space-x-8">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-xl ${
                    isActive ? "text-black font-bold" : "text-[#737373]"
                  }`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/menu"
                className={({ isActive }) =>
                  `text-xl ${
                    isActive ? "text-black font-bold" : "text-[#737373]"
                  }`
                }
              >
                Menu
              </NavLink>

              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `text-xl ${
                    isActive ? "text-black font-bold" : "text-[#737373]"
                  }`
                }
              >
                Dashboard
              </NavLink>
              {user ? (
                <>
                  <h1 className="flex justify-center items-center text-lg font-semibold">
                    Welcome, {user.name}
                  </h1>
                  <div className="flex justify-center">
                    <Button onClick={handleLogout} name={"Sign Out"}/>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-center">
                    <Link to="/login">
                      <Button name={"Login"} />
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="-mr-2 flex lg:hidden">
            <FaBars onClick={toggleDrawer} className="h-8 w-8 cursor-pointer" />
          </div>
        </div>
        {/* Mobile Menu */}
        {isOpen && (
          <>
            <div
              className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40 md:hidden"
              onClick={closeDrawer}
            ></div>
            <div
              className={`fixed inset-y-0 left-0 w-64 z-50 transform transition-transform duration-300 md:hidden ${
                isOpen ? "translate-x-0" : "-translate-x-full"
              } ${
                isDarkMode ? "bg-[#151e3d] text-white" : "bg-white text-black"
              }`}
            >
              <div className="p-5">
                <div className="flex justify-end mb-6">
                  <FaXmark
                    onClick={closeDrawer}
                    className="h-6 w-6 cursor-pointer"
                  />
                </div>
                <NavLink
                  to="/"
                  onClick={closeDrawer}
                  className={({ isActive }) =>
                    `text-xl block mb-3 ${
                      isActive ? "text-black font-bold" : "text-[#737373]"
                    }`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  onClick={closeDrawer}
                  to="/menu"
                  className={({ isActive }) =>
                    `text-xl block mb-3 ${
                      isActive ? "text-black font-bold" : "text-[#737373]"
                    }`
                  }
                >
                  Menu
                </NavLink>
                <NavLink
                  onClick={closeDrawer}
                  to="/dashboard"
                  className={({ isActive }) =>
                    `text-xl block mb-3 ${
                      isActive ? "text-black font-bold" : "text-[#737373]"
                    }`
                  }
                >
                  Dashboard
                </NavLink>
                {/* <button
                  className="text-xl mb-3 block"
                  onClick={() => {
                    toggleTheme();
                    closeDrawer();
                  }}
                >
                  {isDarkMode ? (
                    <FiSun className="text-2xl" />
                  ) : (
                    <FiMoon className="text-2xl" />
                  )}
                </button> */}
                {user ? (
                  <>
                    <h1 className="list-none text-lg font-semibold navtext block mb-5">
                      {user?.displayName}
                    </h1>
                    <>
                      <Button onClick={handleLogout} name={"Logout"} />
                    </>
                  </>
                ) : (
                  <>
                    <NavLink onClick={closeDrawer} to="/login">
                      <Button name={"Login"} />
                    </NavLink>
                  </>
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
