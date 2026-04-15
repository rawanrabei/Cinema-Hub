import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const NotFound = () => {
  const { isDarkMode, colors } = useTheme();

  return (
    <div
      className={`min-h-screen flex items-center justify-center text-center px-6 text-white relative overflow-hidden ${
        isDarkMode
          ? "bg-gradient-to-b from-[#001328] to-[#000815]"
          : "bg-gradient-to-b from-gray-100 to-gray-300 text-gray-900"
      }`}
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,0,75,0.35),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,102,255,0.35),transparent_60%)]"></div>

      <div className="relative z-10 max-w-xl">
        {/* Big 404 Text */}
        <h1 className="text-8xl font-extrabold tracking-widest text-red-500 drop-shadow-[0_0_20px_rgba(255,0,80,0.7)] animate-pulse">
          404
        </h1>

        <h2 className="text-3xl font-semibold mt-4 text-blue-200">
          Page Not Found
        </h2>

        <p className="text-gray-300 mt-3 text-lg leading-relaxed">
          Looks like you've reached a page that doesn’t exist. Don’t worry —
          let's get you back to safety!
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-8 flex-wrap">
          <Link
            to="/"
            className="px-6 py-3 rounded-xl font-semibold transition"
            style={{ backgroundColor: colors.primary, color: "#fff" }}
          >
            Back to Home
          </Link>

          <Link
            to="/contact"
            className="px-6 py-3 rounded-xl font-semibold bg-blue-700 hover:bg-blue-600 transition shadow-[0_0_15px_rgba(0,102,255,0.5)]"
          >
            Contact Us
          </Link>
        </div>

        <p className="text-gray-500 text-sm mt-6">
          If the problem continues, please reach out to our support team.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
