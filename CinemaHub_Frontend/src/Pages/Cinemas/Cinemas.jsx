import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaClock,
  FaStar,
  FaPhone,
  FaParking,
} from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";
import { useTheme } from "../../context/ThemeContext";

const Cinemas = () => {
  const { isDarkMode, colors } = useTheme();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);
  const cinemas = [
    {
      id: 1,
      name: "Grand Cinema Downtown",
      location: "123 Main Street, Downtown",
      hours: "10:00 AM - 12:00 AM",
      phone: "+1 (555) 123-4567",
      features: [
        "IMAX",
        "Dolby Atmos",
        "Recliner Seats",
        "Air Conditioning",
        "4K Projection",
        "Premium Sound",
      ],
      image: "/cinemas/c.jpg",
      screens: 12,
      parking: "Available",
    },
    {
      id: 2,
      name: "Luxury Cinema Mall",
      location: "456 Shopping Blvd, Mall District",
      hours: "11:00 AM - 1:00 AM",
      phone: "+1 (555) 987-6543",
      features: [
        "VIP Lounge",
        "Recliner Seats",
        "Air Conditioning",
        "Dolby Atmos",
        "Restaurant",
        "Bar",
      ],
      image: "/cinemas/c5.jpg",
      screens: 8,
      parking: "Mall Parking",
    },
    {
      id: 3,
      name: "Family Cinema Center",
      location: "789 Family Street, Suburb Area",
      hours: "9:00 AM - 11:00 PM",
      phone: "+1 (555) 456-7890",
      features: [
        "Kids Area",
        "Family Seats",
        "Air Conditioning",
        "3D Movies",
        "Snack Bar",
        "Games Zone",
      ],
      image: "cinemas/c3.jpg",
      screens: 6,
      parking: "Free Parking",
    },
    {
      id: 4,
      name: "Downtown Movieplex",
      location: "321 Center Ave, Downtown",
      hours: "10:00 AM - 12:00 AM",
      phone: "+1 (555) 321-7654",
      features: [
        "4DX",
        "Dolby Atmos",
        "Recliner Seats",
        "Air Conditioning",
        "Premium Sound",
        "Arcade",
      ],
      image: "/cinemas/c4.jpg",
      screens: 10,
      parking: "Valet Parking",
    },
    {
      id: 5,
      name: "Open Air Cinema Park",
      location: "654 Park Lane, Greenfield",
      hours: "6:00 PM - 11:00 PM",
      phone: "+1 (555) 654-3210",
      features: [
        "Open Air",
        "Standard Seating",
        "No Air Conditioning",
        "Food Trucks",
        "Live Music",
        "Picnic Areas",
      ],
      image: "/cinemas/c3.jpg",
      screens: 3,
      parking: "Street Parking",
    },
    {
      id: 6,
      name: "Cineplex 20",
      location: "987 Entertainment Rd, Uptown",
      hours: "10:00 AM - 1:00 AM",
      phone: "+1 (555) 789-0123",
      features: [
        "20 Screens",
        "IMAX",
        "Dolby Atmos",
        "Recliner Seats",
        "Air Conditioning",
        "Luxury Lounge",
      ],
      image: "/cinemas/c6.jpg",
      screens: 20,
      parking: "Underground Parking",
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-b from-gray-900 via-black to-gray-900"
          : "bg-gradient-to-b from-white via-gray-50 to-white"
      }`}
    >
      {/* Hero Section */}
      <section
        className={`relative overflow-hidden rounded-b-[40px] shadow-2xl border-b transition-colors duration-300 ${
          isDarkMode ? "border-white/10" : "border-gray-200"
        }`}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-b transition-colors duration-300 ${
            isDarkMode
              ? "from-black via-[#1c1c1c]/90 to-transparent"
              : "from-white via-white/90 to-transparent"
          }`}
        />
        <img
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&q=80&auto=format&fit=crop"
          alt="Cinema"
          className={`w-full h-80 object-cover transition-opacity duration-300 ${
            isDarkMode ? "opacity-30" : "opacity-20"
          }`}
        />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 md:px-10 space-y-4">
            <div
              className="flex items-center gap-3"
              style={{ color: colors.primary }}
            >
              <MdLocalMovies className="text-5xl" />
            </div>
            <div className="flex items-baseline gap-3">
              <h1
                className={`text-4xl md:text-5xl font-bold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Our
              </h1>
              <h1
                className="text-4xl md:text-5xl font-bold"
                style={{ color: colors.primary }}
              >
                Cinemas
              </h1>
            </div>
            <p
              className={`text-lg max-w-3xl ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Premium cinema locations with state-of-the-art facilities. Find
              the perfect venue for your movie experience.
            </p>
          </div>
        </div>
      </section>

      {/* Cinema Cards */}
      <section className="container mx-auto px-4 md:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {cinemas.map((cinema) => (
            <article
              key={cinema.id}
              className={`rounded-3xl border shadow-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300 ${
                isDarkMode
                  ? "bg-[#111111] border-white/10"
                  : "bg-white border-gray-200"
              }`}
            >
              {/* Image */}
              <div className="relative h-96 overflow-hidden group">
                <img
                  src={cinema.image}
                  alt={cinema.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {cinema.name}
                  </h2>
                  <div className="flex items-start gap-2 text-gray-200">
                    <FaMapMarkerAlt
                      className="mt-1 flex-shrink-0"
                      style={{ color: colors.primary }}
                    />
                    <p className="text-sm">{cinema.location}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-5">
                {/* Working Hours */}
                <div
                  className={`flex items-center gap-3 rounded-2xl p-4 border transition-colors duration-300 ${
                    isDarkMode
                      ? "bg-gray-900/70 border-white/5"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300"
                    style={{ backgroundColor: `${colors.primary}10` }}
                  >
                    <FaClock
                      style={{ color: colors.primary }}
                      className="text-xl"
                    />
                  </div>
                  <div>
                    <p
                      className={`text-xs uppercase tracking-wide ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Working Hours
                    </p>
                    <p
                      className={`font-semibold ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {cinema.hours}
                    </p>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="grid grid-cols-3 gap-3">
                  <div
                    className={`rounded-xl p-3 text-center border transition-colors duration-300 ${
                      isDarkMode
                        ? "bg-gray-900/70 border-white/5"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <p
                      className={`text-xs ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Screens
                    </p>
                    <p
                      className={`font-bold text-lg ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {cinema.screens}
                    </p>
                  </div>
                  <div
                    className={`rounded-xl p-3 text-center border transition-colors duration-300 ${
                      isDarkMode
                        ? "bg-gray-900/70 border-white/5"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <FaParking
                      style={{ color: colors.primary }}
                      className="mx-auto mb-1"
                    />
                    <p
                      className={`text-xs ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {cinema.parking}
                    </p>
                  </div>
                  <div
                    className={`rounded-xl p-3 text-center border transition-colors duration-300 ${
                      isDarkMode
                        ? "bg-gray-900/70 border-white/5"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <FaStar
                      style={{ color: colors.primary }}
                      className="mx-auto mb-1"
                    />
                    <p
                      className={`text-xs ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Premium
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <p
                    className={`text-sm mb-3 flex items-center gap-2 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    <FaStar style={{ color: colors.primary }} />
                    Premium Features
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {cinema.features.map((feature, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1.5 rounded-full text-xs border transition-colors duration-300 ${
                          isDarkMode
                            ? "bg-gray-900 text-gray-300 border-white/10"
                            : "bg-gray-100 text-gray-700 border-gray-200"
                        }`}
                        style={{
                          borderColor:
                            "currentColor" === colors.primary
                              ? colors.primary
                              : undefined,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = colors.primary;
                          e.currentTarget.style.color = colors.primary;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = isDarkMode
                            ? "rgba(255,255,255,0.1)"
                            : "#e5e7eb";
                          e.currentTarget.style.color = isDarkMode
                            ? "#d1d5db"
                            : "#374151";
                        }}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Cinemas;
