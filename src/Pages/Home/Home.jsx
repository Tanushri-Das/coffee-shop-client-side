import React from "react";
import Banner from "./Banner/Banner";
import Categories from "./Categories/Categories";
import Recommends from "./Recommends/Recommends";
import Features from "./Features/Features";
import Testimonials from "./Testimonials/Testimonials";
import { useSelector } from "react-redux";

const Home = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <Banner />
      <Categories />
      <Recommends />
      <Features />
      <Testimonials />
    </div>
  );
};

export default Home;
