import React from "react";
import Hero from "../../components/Hero/Hero";
import PopularContests from "../../components/PopularContests/PopularContests";
import WinnerSection from "../../components/WinnerSection/WinnerSection";
import HowItWorks from "../../components/HowItWorks/HowItWorks";

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <PopularContests></PopularContests>
      <WinnerSection></WinnerSection>
      <HowItWorks></HowItWorks>
    </div>
  );
};

export default Home;
