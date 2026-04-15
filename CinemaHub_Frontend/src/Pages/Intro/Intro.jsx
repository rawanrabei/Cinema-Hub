import React from 'react'
import IntroStats from '../../Components/Intro/IntroStats';
import IntroFeatures from '../../Components/Intro/IntroFeatures';
import IntroSteps from '../../Components/Intro/IntroSteps';
import IntroCTA from '../../Components/Intro/IntroCTA';
import IntroFooter from '../../Components/Intro/IntroFooter';
import Hero from '../../Components/Home/Hero/Hero';
import { useTheme } from "../../context/ThemeContext";

const Intro = () => {
  const { isDarkMode } = useTheme();

  return (
    <div>
      <Hero />
      <IntroStats darkMode={isDarkMode} />
      <IntroFeatures darkMode={isDarkMode} />
      <IntroSteps darkMode={isDarkMode} />
      <IntroCTA darkMode={isDarkMode} />
      <IntroFooter darkMode={isDarkMode} />
    </div>
  )
}

export default Intro