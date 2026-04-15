import React from "react";
import { FaTicketAlt, FaStar } from "react-icons/fa";
import { useTheme } from "../../../context/ThemeContext";

const ExperienceHighlight = () => {
  const { isDarkMode, colors } = useTheme();

  return (
    <section
      className={`py-16 md:py-20   transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-r from-gray-900 via-gray-900 to-gray-800"
          : "bg-gradient-to-r from-white via-rose-50 to-red-50/80 border-red-100"
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 md:px-8 text-center space-y-6">
        <p
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest shadow-sm transition-colors duration-300 ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
          style={{ color: colors.primary }}
        >
          <FaStar style={{ color: colors.primary }} /> Premium Experience
        </p>

        <div>
          <h2
            className={`text-3xl md:text-4xl font-bold transition-colors duration-300 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Ready for Your Next
          </h2>
          <h3
            className="text-3xl md:text-4xl font-bold mt-2 transition-colors duration-300"
            style={{ color: colors.primary }}
          >
            Cinema Experience?
          </h3>
        </div>

        <p
          className={`text-base md:text-lg max-w-3xl mx-auto leading-relaxed transition-colors duration-300 ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Book your tickets now, select the perfect seats, and unlock exclusive
          member rewards with every visit. Enjoy premium comfort, gourmet
          treats, and immersive sound that brings every story to life.
        </p>
      </div>
    </section>
  );
};

export default ExperienceHighlight;
