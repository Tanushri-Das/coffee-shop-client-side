import React from "react";
import Banner from "./Banner/Banner";
import Categories from "./Categories/Categories";
import Recommends from "./Recommends/Recommends";
import Features from "./Features/Features";

const Home = () => {
  return (
    <div>
      <Banner />
      <Categories/>
      <Recommends/>
      <Features/>
    </div>
  );
};

export default Home;
