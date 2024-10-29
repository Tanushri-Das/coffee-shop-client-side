import React from "react";
import Banner from "./Banner/Banner";
import Categories from "./Categories/Categories";
import Recommends from "./Recommends/Recommends";
import Features from "./Features/Features";
import Testimonials from "./Testimonials/Testimonials";

const Home = () => {
  return (
    <div>
      <Banner />
      <Categories/>
      <Recommends/>
      <Features/>
      <Testimonials/>
    </div>
  );
};

export default Home;
