import React from "react";
import Banner from "./Banner/Banner";
import Categories from "./Categories/Categories";
import Recommends from "./Recommends/Recommends";
import Features from "./Features/Features";
import Testimonials from "./Testimonials/Testimonials";
import { useSelector } from "react-redux";
import PoweredBy from "./PoweredBy/PoweredBy";
import ContactUs from "./ContactUs/ContactUs";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <>
      <Helmet>
        <title>Sip Coffee | Home</title>
      </Helmet>
      <div
        className={`${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        <Banner />
        <Categories />
        <Recommends />
        <Features />
        <PoweredBy />
        <Testimonials />
        <ContactUs />
      </div>
    </>
  );
};

export default Home;
