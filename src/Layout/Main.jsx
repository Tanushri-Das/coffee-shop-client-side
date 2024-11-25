import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Shared/Footer/Footer";
import Header from "../Components/Shared/Header/Header";
import { useSelector } from "react-redux";
import ScrollToTop from "../Components/ScrollToTop";
import CustomSpinner from "../Components/CustomSpinner/CustomSpinner";

const Main = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // লোডিং সময় (মিলিসেকেন্ডে)

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div>
        {loading ? (
          <CustomSpinner />
        ) : (
          <>
            <Header />
            <div className="min-h-screen">
              <Outlet />
            </div>
            <Footer />
            <ScrollToTop />
          </>
        )}
      </div>
    </div>
  );
};

export default Main;
