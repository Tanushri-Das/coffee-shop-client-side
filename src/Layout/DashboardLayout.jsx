import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar/Sidebar";
import { useSelector } from "react-redux";
import Header from "../Components/Shared/Header/Header";
import Footer from "../Components/Shared/Footer/Footer";

const DashboardLayout = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <div
      className={`flex flex-col h-60 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main
          className={`flex-1 p-6 bg-gray-100 overflow-auto ${
            darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
          }`}
        >
          <Outlet />
        </main>
      </div>
      <Footer/>
    </div>
  );
};

export default DashboardLayout;
