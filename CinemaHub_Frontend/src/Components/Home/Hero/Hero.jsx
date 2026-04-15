import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFilm, FaGift, FaArrowRight, FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../../../context/ThemeContext";
import { LogIn, Clapperboard } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const { isDarkMode, colors, toggleTheme } = useTheme();
  const fullText = "tarts Here";
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 500 : 2000;

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < fullText.length) {
        setDisplayedText(fullText.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setDisplayedText(fullText.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (charIndex === fullText.length) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (charIndex === 0 && isDeleting) {
        setIsDeleting(false);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, fullText]);

  return (
    <section className="relative w-full h-[650px] md:h-[720px] lg:h-[820px] overflow-hidden">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 w-full flex justify-between items-center px-6 py-4 z-30 ">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Clapperboard size={30} color={colors.primary} />
          <span className="font-bold text-xl" style={{ color: colors.primary }}>
            Cinema Hub
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* <button
            onClick={toggleDarkMode}
            className="p-2 cursor-pointer"
            style={{ color: darkMode ? "#fff" : "#FF0800" }}
          >
            {darkMode ? <Sun size={25} /> : <Moon size={25} />}
          </button> */}

          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg transition-all text-sm"
            style={{
              color: colors.primary,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = isDarkMode
                ? "rgba(255,255,255,0.1)"
                : "rgba(0,0,0,0.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>

          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 text-white px-4 py-2 rounded-lg font-semibold hover:scale-105 transition"
            style={{ backgroundColor: colors.primary }}
          >
            <LogIn size={16} />
            Login
          </button>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/15 to-black/10 z-10"></div>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-300"
        style={{
          backgroundImage: isDarkMode
            ? "url(/background%20photo/cinema%20main%20photo%202.jpg)"
            : "url(/background%20photo/cinema%20main%20photo.jpeg)",
        }}
      ></div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/15 z-[15]"></div>

      <div className="relative z-20 w-full px-4 md:px-10 h-full flex items-start py-14 md:py-20">
        <div className="w-full max-w-3xl text-white">
          <div className="flex items-center gap-3 mb-6 ">
            <span
              className="px-3 py-1.5 text-white text-xs font-semibold rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300"
              style={{ backgroundColor: colors.primary }}
            >
              Now Showing
            </span>
          </div>

          <h1
            className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-relaxed text-shadow-lg ${
              isDarkMode ? "text-white" : "text-gray-600"
            }`}
          >
            Welcome to Cinema Hub
          </h1>

          <h2
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-relaxed"
            style={{ color: colors.primary }}
          >
            S<span className="inline-block min-w-[2ch]">{displayedText}</span>
            <span className="animate-pulse">|</span>
          </h2>

          <p
            className={`text-base md:text-lg lg:text-xl mb-8 leading-loose font-medium max-w-2xl ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Experience cinema like never before. Book your tickets, choose your
            perfect seats, and enjoy the magic of movies.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/home"
              className="group px-6 py-3 text-white text-sm font-semibold rounded-lg transition-all duration-300 flex items-center gap-3 hover:scale-105 hover:bg-transparent hover:border-2 hover:border-white transform"
              style={{ backgroundColor: colors.primary }}
            >
              <FaGift className="text-base" />
              <span>Get Started</span>
              <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              to="/movies"
              className={`px-6 py-3 ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              } border-2 hover:bg-transparent hover:text-white hover:border-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-3 shadow-sm`}
            >
              <FaFilm className="text-base" />
              <span>Browse Movies</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div
          className="w-6 h-10 border-2 rounded-full flex justify-center"
          style={{ borderColor: colors.primary }}
        >
          <div
            className="w-1 h-3 rounded-full mt-2"
            style={{ backgroundColor: colors.primary }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
