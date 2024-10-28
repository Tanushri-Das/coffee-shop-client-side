import React from "react";
import Banner from "./Banner/Banner";
import Categories from "./Categories/Categories";
import Recommends from "./Recommends/Recommends";

const Home = () => {
  return (
    <div>
      <Banner />
      <Categories/>
      <Recommends/>
    </div>
  );
};

export default Home;
