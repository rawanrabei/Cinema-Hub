import React from "react";
import Hero from "../../Components/Home/Hero/Hero";
import NowShowing from "../../Components/Home/NowShowing/NowShowing";
import SpecialOffers from "../../Components/Home/SpecialOffers/SpecialOffers";
import CinemaLocations from "../../Components/Home/CinemaLocations/CinemaLocations";
import Features from "../../Components/Home/Features/Features";
import ExperienceHighlight from "../../Components/Home/ExperienceHighlight/ExperienceHighlight";
import IntroHero from "../../Components/Intro/IntroHero";
import { useTheme } from "../../context/ThemeContext";

const MainContent = () => {
  const { isDarkMode } = useTheme();

  return (
    <main>
      <IntroHero darkMode={isDarkMode} />
      <NowShowing />
      <Features />
      <SpecialOffers />
      <CinemaLocations />
      <ExperienceHighlight />
    </main>
  );
};

export default MainContent;
