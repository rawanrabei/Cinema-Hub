import React from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaPhone, FaClock } from "react-icons/fa";
import { useTheme } from "../../../context/ThemeContext";

const CinemaLocations = () => {
  const navigate = useNavigate();
  const { isDarkMode, colors } = useTheme();

  const cinemas = [
    {
      id: 1,
      name: "Grand Cinema Downtown",
      address: "123 Main Street, Downtown",
      hours: "9:00 AM - 11:00 PM",
      image: "/cinemas/c.jpg",
    },
    {
      id: 2,
      name: "Luxury Cinema Mall",
      address: "456 Shopping Mall, North District",
      hours: "10:00 AM - 12:00 AM",
      image: "/cinemas/c5.jpg",
    },
    {
      id: 3,
      name: "Family Cinema Center",
      address: "789 Luxury Avenue, East Side",
      hours: "9:00 AM - 11:00 PM",
      image: "/cinemas/c4.jpg",
    },
  ];

  return (
    <section
      className={`py-16 transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-r from-gray-900 via-gray-900 to-gray-800"
          : "bg-white"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2
            className={`text-3xl md:text-4xl font-bold transition-colors duration-300`}
            style={{ color: colors.primary }}
          >
            Our Cinemas
          </h2>
          <p
            className={`transition-colors duration-300 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Find a location near you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cinemas.map((cinema) => (
            <div
              key={cinema.id}
              className={`rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
                isDarkMode ? "bg-[#111111] border border-white/10" : "bg-white"
              }`}
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={cinema.image}
                  alt={cinema.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3
                  className={`text-xl font-bold mb-4 transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {cinema.name}
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt
                      className="mt-1 flex-shrink-0"
                      style={{ color: colors.primary }}
                    />
                    <p
                      className={`text-sm transition-colors duration-300 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {cinema.address}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <FaClock
                      className="flex-shrink-0"
                      style={{ color: colors.primary }}
                    />
                    <p
                      className={`text-sm transition-colors duration-300 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {cinema.hours}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    navigate("/cinemas");

                    setTimeout(() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }, 100);
                  }}
                  className="block w-full text-center px-4 py-2 text-white font-semibold rounded-lg transition-colors duration-300 border-2 hover:shadow-md"
                  style={{
                    backgroundColor: colors.primary,
                    borderColor: colors.primary,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = colors.primary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = colors.primary;
                    e.currentTarget.style.color = "white";
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CinemaLocations;
