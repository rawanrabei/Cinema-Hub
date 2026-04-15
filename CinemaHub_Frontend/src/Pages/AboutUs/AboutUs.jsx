import React from "react";
import { FaFilm, FaAward, FaUsers, FaHeart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { HiOutlineFilm } from "react-icons/hi";
import { GoPeople } from "react-icons/go";
import { FiAward } from "react-icons/fi";
import { FaRegStar } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { LuAward } from "react-icons/lu";
import { IoShieldOutline } from "react-icons/io5";
import { SlEnergy } from "react-icons/sl";

const AboutUs = () => {
  const { isDarkMode, colors } = useTheme();

  const stats = [
    { icon: <FaFilm />, number: "1000+", label: "Movies Screened" },
    { icon: <FaUsers />, number: "500K+", label: "Happy Customers" },
    { icon: <FaAward />, number: "50+", label: "Awards Won" },
    { icon: <FaStar />, number: "4.8", label: "Average Rating" },
  ];

  const values = [
    {
      icon: <FaHeart />,
      title: "Customer First",
      description: "Your comfort and satisfaction are our top priorities.",
    },
    {
      icon: <FaFilm />,
      title: "Quality Experience",
      description:
        "State-of-the-art technology for the best viewing experience.",
    },
    {
      icon: <FaUsers />,
      title: "Community",
      description:
        "Building a community of movie lovers and cinema enthusiasts.",
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white"
          : "bg-gradient-to-b from-white via-gray-50 to-white text-gray-900"
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
          src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1920&q=80&auto=format&fit=crop"
          alt="Cinema"
          className={`w-full h-64 md:h-96 object-cover transition-opacity duration-300 ${
            isDarkMode ? "opacity-30" : "opacity-20"
          }`}
        />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 md:px-10 space-y-3 md:space-y-4">
            <div
              className="flex items-center gap-3 transition-colors duration-300"
              style={{ color: colors.primary }}
            >
              <FaFilm className="text-3xl md:text-5xl" />
            </div>
            <h1
              className={`text-3xl md:text-5xl lg:text-6xl font-bold transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              About <span style={{ color: colors.primary }}>Cinema Hub</span>
            </h1>
            <p
              className={`text-base md:text-lg max-w-3xl transition-colors duration-300 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Where stories come to life on the big screen
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="container mx-auto px-4 md:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2
              className={`text-2xl md:text-3xl lg:text-4xl font-bold transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Our <span style={{ color: colors.primary }}>Story</span>
            </h2>
            <p
              className={`text-sm md:text-base leading-relaxed transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Founded in 2010, Cinema Hub Cinema has been bringing the magic of
              movies to audiences for over a decade. What started as a
              single-screen theater has grown into a premium cinema chain, known
              for exceptional service and cutting-edge technology.
            </p>
            <p
              className={`text-sm md:text-base leading-relaxed transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              We believe cinema is more than just watching a movie—it's an
              experience. From our luxurious seating to our gourmet snacks,
              every detail is designed to make your visit unforgettable.
            </p>
            <p
              className={`text-sm md:text-base leading-relaxed transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Today, we operate multiple locations across the city, each
              equipped with IMAX screens, Dolby Atmos sound, and the latest in
              projection technology. Our mission remains the same: to create
              magical moments for movie lovers everywhere.
            </p>
          </div>
          <div
            className={`rounded-3xl overflow-hidden shadow-2xl border transition-colors duration-300 ${
              isDarkMode ? "border-white/10" : "border-gray-200"
            }`}
          >
            <img
              src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&q=80&auto=format&fit=crop"
              alt="Cinema Interior"
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Icons */}
      <section className="container mx-auto px-4 md:px-10 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          <div className="flex flex-col items-center text-center gap-2">
            <div
              className={`p-4 rounded-full mb-6 transition-colors duration-300 ${
                isDarkMode ? "bg-blue-900/20" : "bg-red-200/20"
              }`}
            >
              <HiOutlineFilm
                className="text-4xl md:text-5xl"
                style={{ color: colors.primary }}
              />
            </div>
            <p
              className={`text-3xl md:text-5xl font-bold transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              10+
            </p>
            <p
              className={`text-sm md:text-base transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Premium Screens
            </p>
          </div>

          <div className="flex flex-col items-center text-center gap-2">
            <div
              className={`p-4 rounded-full mb-6 transition-colors duration-300 ${
                isDarkMode ? "bg-blue-900/20" : "bg-red-200/20"
              }`}
            >
              <GoPeople
                className="text-4xl md:text-5xl"
                style={{ color: colors.primary }}
              />
            </div>
            <p
              className={`text-3xl md:text-5xl font-bold transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              1M+
            </p>
            <p
              className={`text-sm md:text-base transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Happy Customers
            </p>
          </div>

          <div className="flex flex-col items-center text-center gap-2">
            <div
              className={`p-4 rounded-full mb-6 transition-colors duration-300 ${
                isDarkMode ? "bg-blue-900/20" : "bg-red-200/20"
              }`}
            >
              <FiAward
                className="text-4xl md:text-5xl"
                style={{ color: colors.primary }}
              />
            </div>
            <p
              className={`text-3xl md:text-5xl font-bold transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              50+
            </p>
            <p
              className={`text-sm md:text-base transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Awards Won
            </p>
          </div>

          <div className="flex flex-col items-center text-center gap-2">
            <div
              className={`p-4 rounded-full mb-6 transition-colors duration-300 ${
                isDarkMode ? "bg-blue-900/20" : "bg-red-200/20"
              }`}
            >
              <FaRegStar
                className="text-4xl md:text-5xl"
                style={{ color: colors.primary }}
              />
            </div>
            <p
              className={`text-3xl md:text-5xl font-bold transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              4.8
            </p>
            <p
              className={`text-sm md:text-base transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Average Rating
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section
        className={`mt-20 transition-colors duration-300 ${
          isDarkMode ? "bg-gray-800/50" : "bg-gray-100"
        }`}
      >
        <div className="container mx-auto px-4 md:px-10">
          <div className="text-center pt-14 pb-8 flex flex-col gap-2">
            <h1
              className={`text-3xl md:text-5xl font-bold transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Our <span style={{ color: colors.primary }}>Values</span>
            </h1>
            <p
              className={`text-sm md:text-base transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-11">
            <div
              className={`p-6 md:p-8 rounded-xl flex flex-col items-center justify-center text-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-2xl group cursor-pointer ${
                isDarkMode
                  ? "bg-gray-900 border border-white/10 hover:shadow-blue-900/30"
                  : "bg-white border border-gray-200 hover:shadow-red-900/20"
              }`}
            >
              <div
                className={`p-4 rounded-full mb-6 transition-colors duration-300 ${
                  isDarkMode ? "bg-blue-900/20" : "bg-red-100"
                }`}
              >
                <FaRegHeart
                  className={`text-4xl md:text-5xl transition-all duration-500 ${
                    isDarkMode
                      ? "group-hover:drop-shadow-[0_0_20px_rgba(54,116,181,0.8)]"
                      : "group-hover:drop-shadow-[0_0_20px_rgba(255,8,0,0.8)]"
                  }`}
                  style={{ color: colors.primary }}
                />
              </div>
              <h2
                className={`text-xl md:text-2xl font-semibold transition-colors duration-300 group-hover:transition-colors ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
                style={{ "--hover-color": colors.primary }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = colors.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isDarkMode
                    ? "#ffffff"
                    : "#111827";
                }}
              >
                Customer First
              </h2>
              <p
                className={`text-sm md:text-base transition-colors duration-300 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                We prioritize your comfort and entertainment, ensuring every
                visit is memorable.
              </p>
            </div>

            <div
              className={`p-6 md:p-8 rounded-xl flex flex-col items-center justify-center text-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-2xl group cursor-pointer ${
                isDarkMode
                  ? "bg-gray-900 border border-white/10 hover:shadow-blue-900/30"
                  : "bg-white border border-gray-200 hover:shadow-red-900/20"
              }`}
            >
              <div
                className={`p-4 rounded-full mb-6 transition-colors duration-300 ${
                  isDarkMode ? "bg-blue-900/20" : "bg-red-100"
                }`}
              >
                <LuAward
                  className={`text-4xl md:text-5xl transition-all duration-500 ${
                    isDarkMode
                      ? "group-hover:drop-shadow-[0_0_20px_rgba(54,116,181,0.8)]"
                      : "group-hover:drop-shadow-[0_0_20px_rgba(255,8,0,0.8)]"
                  }`}
                  style={{ color: colors.primary }}
                />
              </div>
              <h2
                className={`text-xl md:text-2xl font-semibold transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = colors.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isDarkMode
                    ? "#ffffff"
                    : "#111827";
                }}
              >
                Quality Experience
              </h2>
              <p
                className={`text-sm md:text-base transition-colors duration-300 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                State-of-the-art technology and premium amenities for the best
                cinema experience.
              </p>
            </div>

            <div
              className={`p-6 md:p-8 rounded-xl flex flex-col items-center justify-center text-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-2xl group cursor-pointer ${
                isDarkMode
                  ? "bg-gray-900 border border-white/10 hover:shadow-blue-900/30"
                  : "bg-white border border-gray-200 hover:shadow-red-900/20"
              }`}
            >
              <div
                className={`p-4 rounded-full mb-6 transition-colors duration-300 ${
                  isDarkMode ? "bg-blue-900/20" : "bg-red-100"
                }`}
              >
                <IoMdTime
                  className={`text-4xl md:text-5xl transition-all duration-500 ${
                    isDarkMode
                      ? "group-hover:drop-shadow-[0_0_20px_rgba(54,116,181,0.8)]"
                      : "group-hover:drop-shadow-[0_0_20px_rgba(255,8,0,0.8)]"
                  }`}
                  style={{ color: colors.primary }}
                />
              </div>
              <h2
                className={`text-xl md:text-2xl font-semibold transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = colors.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isDarkMode
                    ? "#ffffff"
                    : "#111827";
                }}
              >
                Convenience
              </h2>
              <p
                className={`text-sm md:text-base transition-colors duration-300 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Easy online booking, flexible showtimes, and hassle-free ticket
                management.
              </p>
            </div>

            <div
              className={`p-6 md:p-8 rounded-xl flex flex-col items-center justify-center text-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-2xl group cursor-pointer ${
                isDarkMode
                  ? "bg-gray-900 border border-white/10 hover:shadow-blue-900/30"
                  : "bg-white border border-gray-200 hover:shadow-red-900/20"
              }`}
            >
              <div
                className={`p-4 rounded-full mb-6 transition-colors duration-300 ${
                  isDarkMode ? "bg-blue-900/20" : "bg-red-100"
                }`}
              >
                <IoShieldOutline
                  className={`text-4xl md:text-5xl transition-all duration-500 ${
                    isDarkMode
                      ? "group-hover:drop-shadow-[0_0_20px_rgba(54,116,181,0.8)]"
                      : "group-hover:drop-shadow-[0_0_20px_rgba(255,8,0,0.8)]"
                  }`}
                  style={{ color: colors.primary }}
                />
              </div>
              <h2
                className={`text-xl md:text-2xl font-semibold transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = colors.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isDarkMode
                    ? "#ffffff"
                    : "#111827";
                }}
              >
                Safety & Security
              </h2>
              <p
                className={`text-sm md:text-base transition-colors duration-300 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Your safety is paramount. We maintain the highest standards of
                hygiene and security.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section
        className={`mt-20 transition-colors duration-300 ${
          isDarkMode ? "bg-gray-900/50" : "bg-white"
        }`}
      >
        <div className="container mx-auto px-4 md:px-10">
          <div className="text-center pt-14 pb-8 flex flex-col gap-2">
            <h1
              className={`text-3xl md:text-5xl font-bold transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Why Choose <span style={{ color: colors.primary }}>Cinema Hub</span>
            </h1>
            <p
              className={`text-sm md:text-base transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-11">
            <div
              className={`p-6 md:p-8 rounded-xl flex flex-col justify-center text-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-2xl group cursor-pointer ${
                isDarkMode
                  ? "bg-gray-800 border border-white/10 hover:shadow-blue-900/30"
                  : "bg-gray-50 border border-gray-200 hover:shadow-red-900/20"
              }`}
            >
              <div className="rounded-full">
                <SlEnergy
                  className={`text-4xl transition-all duration-500 mx-auto ${
                    isDarkMode
                      ? "group-hover:drop-shadow-[0_0_20px_rgba(54,116,181,0.8)]"
                      : "group-hover:drop-shadow-[0_0_20px_rgba(255,8,0,0.8)]"
                  }`}
                  style={{ color: colors.primary }}
                />
              </div>
              <h2
                className={`text-xl md:text-2xl font-semibold transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = colors.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isDarkMode
                    ? "#ffffff"
                    : "#111827";
                }}
              >
                Latest Technology
              </h2>
              <p
                className={`text-sm md:text-base transition-colors duration-300 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Experience movies with cutting-edge projection systems, Dolby
                Atmos sound, and comfortable seating.
              </p>
            </div>

            <div
              className={`p-6 md:p-8 rounded-xl flex flex-col justify-center text-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-2xl group cursor-pointer ${
                isDarkMode
                  ? "bg-gray-800 border border-white/10 hover:shadow-blue-900/30"
                  : "bg-gray-50 border border-gray-200 hover:shadow-red-900/20"
              }`}
            >
              <div className="rounded-full">
                <HiOutlineFilm
                  className={`text-4xl transition-all duration-500 mx-auto ${
                    isDarkMode
                      ? "group-hover:drop-shadow-[0_0_20px_rgba(54,116,181,0.8)]"
                      : "group-hover:drop-shadow-[0_0_20px_rgba(255,8,0,0.8)]"
                  }`}
                  style={{ color: colors.primary }}
                />
              </div>
              <h2
                className={`text-xl md:text-2xl font-semibold transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = colors.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isDarkMode
                    ? "#ffffff"
                    : "#111827";
                }}
              >
                Diverse Selection
              </h2>
              <p
                className={`text-sm md:text-base transition-colors duration-300 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                From Hollywood blockbusters to independent films, we offer a
                wide range of cinematic experiences.
              </p>
            </div>

            <div
              className={`p-6 md:p-8 rounded-xl flex flex-col justify-center text-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-2xl group cursor-pointer ${
                isDarkMode
                  ? "bg-gray-800 border border-white/10 hover:shadow-blue-900/30"
                  : "bg-gray-50 border border-gray-200 hover:shadow-red-900/20"
              }`}
            >
              <div className="rounded-full">
                <GoPeople
                  className={`text-4xl transition-all duration-500 mx-auto ${
                    isDarkMode
                      ? "group-hover:drop-shadow-[0_0_20px_rgba(54,116,181,0.8)]"
                      : "group-hover:drop-shadow-[0_0_20px_rgba(255,8,0,0.8)]"
                  }`}
                  style={{ color: colors.primary }}
                />
              </div>
              <h2
                className={`text-xl md:text-2xl font-semibold transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = colors.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isDarkMode
                    ? "#ffffff"
                    : "#111827";
                }}
              >
                Community Focus
              </h2>
              <p
                className={`text-sm md:text-base transition-colors duration-300 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Building a community of film lovers through special screenings,
                events, and exclusive offers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 md:px-10 py-16">
        <div
          className={`rounded-3xl p-6 md:p-12 text-center transition-colors duration-300 ${
            isDarkMode
              ? "bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900"
              : "bg-gradient-to-r from-red-600 via-red-500 to-red-600"
          }`}
          style={
            !isDarkMode
              ? {
                  background: `linear-gradient(to right, ${colors.primary}, ${colors.primary})`,
                }
              : {}
          }
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-white">
            Ready to Experience Cinema?
          </h2>
          <p className="text-sm md:text-base text-white/90 mb-8 max-w-2xl mx-auto px-4">
            Book your tickets now and enjoy the magic of movies at Cinema Hub
            Cinema
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/movies"
              className={`px-6 md:px-8 py-2 md:py-3 rounded-xl font-semibold transition-all duration-300 text-sm md:text-base ${
                isDarkMode
                  ? "bg-white text-blue-900 hover:bg-gray-100"
                  : "bg-white text-red-600 hover:bg-gray-50"
              }`}
              style={
                !isDarkMode
                  ? {
                      color: colors.primary,
                    }
                  : {}
              }
            >
              Browse Movies
            </Link>
            <Link
              to="/offers"
              className="px-6 md:px-8 py-2 md:py-3 border-2 border-white text-white rounded-xl font-semibold transition-all duration-300 hover:bg-white text-sm md:text-base"
              style={{
                "--hover-color": isDarkMode ? "#1e40af" : colors.primary,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "white";
                e.currentTarget.style.color = isDarkMode
                  ? "#1e40af"
                  : colors.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "white";
              }}
            >
              View Offers
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
