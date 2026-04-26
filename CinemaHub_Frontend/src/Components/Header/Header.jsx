import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaSearch,
  FaHome,
  FaFilm,
  FaMapMarkerAlt,
  FaGift,
  FaUtensils,
  FaInfoCircle,
  FaPhone,
  FaSun,
  FaMoon,
  FaTachometerAlt,
} from "react-icons/fa";
import { Clapperboard } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme, colors } = useTheme();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  // Check if user is admin or manager
  const isAdminOrManager = user && (user.role === 'admin' || user.role === 'manager');
  const dashboardPath = user?.role === 'admin' ? '/admin' : user?.role === 'manager' ? '/manager' : null;

  const navLinks = [
    { path: "/home", label: "Home", icon: FaHome },
    { path: "/movies", label: "Movies", icon: FaFilm },
    { path: "/cinemas", label: "Cinemas", icon: FaMapMarkerAlt },
    { path: "/snacks", label: "Food & Drinks", icon: FaUtensils },
    { path: "/offers", label: "Offers", icon: FaGift },
  ];

  // Header background based on theme
  const headerBg = isDarkMode
    ? "bg-gray-900/95"
    : "bg-white/95 border-b border-gray-200";

  // Text colors
  const textColor = isDarkMode ? "text-white" : "text-gray-900";
  const textSecondary = isDarkMode ? "text-gray-400" : "text-gray-600";

  return (
    <header
      className={`${headerBg} backdrop-blur-md sticky top-0 z-50 shadow-2xl transition-colors duration-300`}
      style={isDarkMode ? {} : { borderBottom: "1px solid rgba(0,0,0,0.1)" }}
    >
      <div className="w-full px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          <Link to="/home" className="flex items-center gap-2 group">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full blur-xl transition-all duration-300"
                style={{
                  backgroundColor: isDarkMode
                    ? `${colors.primary}20`
                    : `${colors.primary}20`,
                }}
              ></div>
              
              <Clapperboard size={30} color={colors.primary} />
            </div>
            <div className="flex items-baseline gap-1">
              <span
                className="text-lg md:text-xl font-bold"
                style={{ color: colors.primary }}
              >
                Cinema Hub
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`group relative flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-all duration-300 transform ${
                    active
                      ? "text-white font-semibold shadow-lg scale-105"
                      : "hover:scale-105"
                  }`}
                  style={
                    active
                      ? { backgroundColor: colors.primary }
                      : { color: colors.primary }
                  }
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.backgroundColor = isDarkMode
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(0,0,0,0.05)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  <Icon
                    className="text-base transition-all duration-300"
                    style={{ color: active ? "white" : colors.primary }}
                  />
                  <span className="transition-colors duration-300">
                    {link.label}
                  </span>
                  {active && (
                    <div
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ backgroundColor: colors.primary }}
                    ></div>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-1.5">
              <Link
                to="/about"
                className={`p-1.5 rounded-lg ${textSecondary} transition-all duration-300 text-sm`}
                style={{
                  color: textSecondary,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = colors.primary;
                  e.currentTarget.style.backgroundColor = isDarkMode
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(0,0,0,0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "";
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
                title="About Us"
              >
                <FaInfoCircle />
              </Link>
              <Link
                to="/contact"
                className={`p-1.5 rounded-lg ${textSecondary} transition-all duration-300 text-sm`}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = colors.primary;
                  e.currentTarget.style.backgroundColor = isDarkMode
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(0,0,0,0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "";
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
                title="Contact"
              >
                <FaPhone />
              </Link>
              <button
                onClick={toggleTheme}
                className="p-1.5 rounded-lg transition-all duration-300 text-sm"
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
                title="Toggle Theme"
              >
                {isDarkMode ? <FaSun /> : <FaMoon />}
              </button>
            </div>

            {isAdminOrManager && dashboardPath && (
              <Link
                to={dashboardPath}
                className={`hidden md:flex items-center gap-2 px-3 py-2 text-sm backdrop-blur-sm border rounded-lg transition-all duration-300 group transform hover:scale-105`}
                style={{
                  backgroundColor: colors.primary,
                  borderColor: colors.primary,
                  color: "white",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#e60000";
                  e.currentTarget.style.borderColor = "#e60000";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = colors.primary;
                  e.currentTarget.style.borderColor = colors.primary;
                }}
              >
                <FaTachometerAlt className="transition-colors duration-300" />
                <span className="font-medium">Dashboard</span>
              </Link>
            )}

            <Link
              to="/user-profile"
              className={`hidden md:flex items-center gap-2 px-3 py-2 text-sm backdrop-blur-sm border rounded-lg transition-all duration-300 group transform hover:scale-105 ${textColor}`}
              style={{
                backgroundColor: isDarkMode
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.05)",
                borderColor: isDarkMode
                  ? "rgba(255,255,255,0.2)"
                  : "rgba(0,0,0,0.1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = colors.primary;
                e.currentTarget.style.backgroundColor = isDarkMode
                  ? "rgba(255,255,255,0.15)"
                  : "rgba(0,0,0,0.08)";
                e.currentTarget.style.color = colors.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = isDarkMode
                  ? "rgba(255,255,255,0.2)"
                  : "rgba(0,0,0,0.1)";
                e.currentTarget.style.backgroundColor = isDarkMode
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.05)";
                e.currentTarget.style.color = "";
              }}
            >
              <FaUser className="transition-colors duration-300" />
              <span className="font-medium">Profile</span>
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-2 rounded-lg ${textSecondary} transition-all duration-300`}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = colors.primary;
                e.currentTarget.style.backgroundColor = isDarkMode
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div
            className={`lg:hidden pb-4 border-t mt-4 pt-4 transition-colors duration-300`}
            style={{
              borderColor: isDarkMode
                ? "rgba(255,255,255,0.1)"
                : "rgba(0,0,0,0.1)",
            }}
          >
            {/* Mobile Search */}
            <div className="mb-4 flex items-center relative">
              <FaSearch
                className={`absolute left-3 ${textSecondary} text-sm`}
              />
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-9 pr-4 py-2 text-sm border rounded-lg ${textColor} placeholder-gray-400 focus:outline-none transition-all duration-300`}
                style={{
                  backgroundColor: isDarkMode
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(0,0,0,0.05)",
                  borderColor: isDarkMode
                    ? "rgba(255,255,255,0.2)"
                    : "rgba(0,0,0,0.1)",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = colors.primary;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = isDarkMode
                    ? "rgba(255,255,255,0.2)"
                    : "rgba(0,0,0,0.1)";
                }}
              />
            </div>

            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition-all duration-300 ${
                      active ? "text-white font-semibold" : ""
                    }`}
                    style={
                      active
                        ? { backgroundColor: colors.primary }
                        : { color: colors.primary }
                    }
                    onMouseEnter={(e) => {
                      if (!active) {
                        e.currentTarget.style.backgroundColor = isDarkMode
                          ? "rgba(255,255,255,0.1)"
                          : "rgba(0,0,0,0.05)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }
                    }}
                  >
                    <Icon
                      className="text-base transition-colors duration-300"
                      style={{ color: active ? "white" : colors.primary }}
                    />
                    <span>{link.label}</span>
                  </Link>
                );
              })}

              <div
                className="flex items-center gap-2 px-4 py-2 border-t mt-2 pt-2"
                style={{
                  borderColor: isDarkMode
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(0,0,0,0.1)",
                }}
              >
                <Link
                  to="/about"
                  onClick={() => setIsMenuOpen(false)}
                  className={`p-1.5 rounded-lg ${textSecondary} transition-all text-sm`}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = colors.primary;
                    e.currentTarget.style.backgroundColor = isDarkMode
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                  title="About Us"
                >
                  <FaInfoCircle />
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className={`p-1.5 rounded-lg ${textSecondary} transition-all text-sm`}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = colors.primary;
                    e.currentTarget.style.backgroundColor = isDarkMode
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                  title="Contact"
                >
                  <FaPhone />
                </Link>
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
              </div>

              {isAdminOrManager && dashboardPath && (
                <Link
                  to={dashboardPath}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm border rounded-lg transition-all mt-2`}
                  style={{
                    backgroundColor: colors.primary,
                    borderColor: colors.primary,
                    color: "white",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#e60000";
                    e.currentTarget.style.borderColor = "#e60000";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = colors.primary;
                    e.currentTarget.style.borderColor = colors.primary;
                  }}
                >
                  <FaTachometerAlt />
                  <span>Dashboard</span>
                </Link>
              )}

              <Link
                to="/user-profile"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm border rounded-lg transition-all mt-2 ${textColor}`}
                style={{
                  backgroundColor: isDarkMode
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(0,0,0,0.05)",
                  borderColor: isDarkMode
                    ? "rgba(255,255,255,0.2)"
                    : "rgba(0,0,0,0.1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = colors.primary;
                  e.currentTarget.style.backgroundColor = isDarkMode
                    ? "rgba(255,255,255,0.15)"
                    : "rgba(0,0,0,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = isDarkMode
                    ? "rgba(255,255,255,0.2)"
                    : "rgba(0,0,0,0.1)";
                  e.currentTarget.style.backgroundColor = isDarkMode
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(0,0,0,0.05)";
                }}
              >
                <FaUser />
                <span>Profile</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
