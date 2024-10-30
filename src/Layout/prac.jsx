import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Shared/Header/Header";
import Sidebar from "../Components/Sidebar/Sidebar";
import Footer from "../Components/Shared/Footer/Footer";
import useTheme from "../Hooks/useTheme";

const DashboardLayout = () => {
  const { isDarkMode } = useTheme();
  return (
    <div
      className={`flex flex-col h-60 ${
        isDarkMode
          ? "bg-dark-background text-dark-text"
          : "bg-light-background text-light-text"
      }`}
    >
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main
          className={`flex-1 p-2 sm:p-4 lg:p-6 overflow-auto ${
            isDarkMode
              ? "bg-dark-background text-dark-text"
              : "bg-light-background text-light-text"
          }`}
        >
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
