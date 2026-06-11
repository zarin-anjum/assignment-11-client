import React from "react";
import Hero from "../../components/Hero/Hero";
import PopularContests from "../../components/PopularContests/PopularContests";
import Stats from "../../components/Stats/Stats";
import WinnerSection from "../../components/WinnerSection/WinnerSection";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import Footer from "../../components/Footer/Footer";
import FAQ from "../../components/FAQ/FAQ";
import Newsletter from "../../components/Newsletter/Newsletter";
import CallToAction from "../../components/CallToAction/CallToAction";

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <PopularContests></PopularContests>
      <Stats></Stats>
      <WinnerSection></WinnerSection>
      <HowItWorks></HowItWorks>
      <FAQ></FAQ>
      <Newsletter></Newsletter>
      <CallToAction></CallToAction>
    </div>
  );
};

export default Home;
