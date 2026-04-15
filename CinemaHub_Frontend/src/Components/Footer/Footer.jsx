import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

const Footer = () => {
  const { isDarkMode, colors } = useTheme();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: "/home", label: "Home" },
    { path: "/movies", label: "Movies" },
    { path: "/cinemas", label: "Cinemas" },
    { path: "/offers", label: "Offers" },
  ];

  const supportLinks = [
    { path: "/about", label: "About Us" },
    { path: "/contact", label: "Contact Us" },
    { path: "/booking", label: "Book Tickets" },
    { path: "/snacks", label: "Snacks & Drinks" },
  ];

  return (
    <footer
      className={`transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <Link to="/home" className="flex items-center gap-2 mb-4">
              <div
                className="text-2xl font-bold transition-colors duration-300"
                style={{ color: colors.primary }}
              >
                Cinema Hub
              </div>
              <span
                className={`text-sm transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Cinema
              </span>
            </Link>
            <p
              className={`mb-4 text-sm transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Experience the magic of cinema with the latest blockbusters,
              premium comfort, and state-of-the-art technology.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-full transition-colors duration-300 ${
                  isDarkMode ? "bg-gray-800" : "bg-white border border-gray-300"
                }`}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.primary;
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isDarkMode
                    ? "#1F2937"
                    : "#ffffff";
                  e.currentTarget.style.color = "";
                }}
              >
                <FaFacebook />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-full transition-colors duration-300 ${
                  isDarkMode ? "bg-gray-800" : "bg-white border border-gray-300"
                }`}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.primary;
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isDarkMode
                    ? "#1F2937"
                    : "#ffffff";
                  e.currentTarget.style.color = "";
                }}
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-full transition-colors duration-300 ${
                  isDarkMode ? "bg-gray-800" : "bg-white border border-gray-300"
                }`}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.primary;
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isDarkMode
                    ? "#1F2937"
                    : "#ffffff";
                  e.currentTarget.style.color = "";
                }}
              >
                <FaInstagram />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-full transition-colors duration-300 ${
                  isDarkMode ? "bg-gray-800" : "bg-white border border-gray-300"
                }`}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.primary;
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isDarkMode
                    ? "#1F2937"
                    : "#ffffff";
                  e.currentTarget.style.color = "";
                }}
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          <div>
            <h3
              className={`text-lg font-bold mb-4 transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`transition-colors duration-300 text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = colors.primary;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = isDarkMode
                        ? "#9CA3AF"
                        : "#4B5563";
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3
              className={`text-lg font-bold mb-4 transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Support
            </h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`transition-colors duration-300 text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = colors.primary;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = isDarkMode
                        ? "#9CA3AF"
                        : "#4B5563";
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3
              className={`text-lg font-bold mb-4 transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt
                  className="mt-1 flex-shrink-0 transition-colors duration-300"
                  style={{ color: colors.primary }}
                />
                <span
                  className={`text-sm transition-colors duration-300 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  123 Cinema Street, Entertainment District, City 12345
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone
                  className="flex-shrink-0 transition-colors duration-300"
                  style={{ color: colors.primary }}
                />
                <span
                  className={`text-sm transition-colors duration-300 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  +1 (555) 123-4567
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope
                  className="flex-shrink-0 transition-colors duration-300"
                  style={{ color: colors.primary }}
                />
                <span
                  className={`text-sm transition-colors duration-300 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  info@Cinema Hub.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div
          className={`border-t pt-8 mt-8 transition-colors duration-300 ${
            isDarkMode ? "border-gray-800" : "border-gray-300"
          }`}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p
              className={`text-sm transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              © {currentYear} Cinema Hub. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                to="/"
                className={`transition-colors duration-300 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = colors.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isDarkMode
                    ? "#9CA3AF"
                    : "#4B5563";
                }}
              >
                Privacy Policy
              </Link>
              <Link
                to="/"
                className={`transition-colors duration-300 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = colors.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isDarkMode
                    ? "#9CA3AF"
                    : "#4B5563";
                }}
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
