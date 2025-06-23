import React from "react";
import Hero from "../Components/Hero";
import Categories from "../Components/Categories";
import RecentItems from "../Components/RecentItems";
import Explanation from "../Components/Explanation";

const Landing = () => {
  return (
    <div>
      <Hero />
      <Categories />
      <RecentItems />
      <Explanation />
    </div>
  );
};

export default Landing;
