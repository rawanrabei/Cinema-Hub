import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTicketAlt, FaPercent, FaGift } from "react-icons/fa";
import { useTheme } from "../../../context/ThemeContext";

const SpecialOffers = () => {
  const { isDarkMode, colors } = useTheme();
  const navigate = useNavigate();
  const offers = [
    {
      id: 1,
      title: "Weekend Special",
      description: "Get 25% off on all weekend shows",
      discount: "25% OFF",
      icon: <FaTicketAlt className="text-4xl" />,
      bgColor: "bg-gradient-to-br",
      bgColorStyle: {
        background: "linear-gradient(to bottom right, #FF0800, #CC0600)",
      },
      link: "/offers",
    },
    {
      id: 2,
      title: "Student Discount",
      description: "Students get 30% off with valid ID",
      discount: "30% OFF",
      icon: <FaPercent className="text-4xl" />,
      bgColor: "bg-gradient-to-br",
      bgColorStyle: {
        background: "linear-gradient(to bottom right, #FF0800, #CC0600)",
      },
      link: "/offers",
    },
    {
      id: 3,
      title: "Combo Pack",
      description: "Movie + Snacks combo at special price",
      discount: "COMBO",
      icon: <FaGift className="text-4xl" />,
      bgColor: "bg-gradient-to-br",
      bgColorStyle: {
        background: "linear-gradient(to bottom right, #FF0800, #CC0600)",
      },
      link: "/offers",
    },
  ];

  return (
    <section
      className={`py-16 transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-r from-gray-900 via-gray-900 to-gray-800"
          : "bg-gradient-to-b from-gray-50 to-white"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-2 transition-colors duration-300 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Special Offers
          </h2>
          <p
            className={`transition-colors duration-300 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Don't miss out on these amazing deals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="rounded-lg p-8 text-white hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer"
              style={{
                background: `linear-gradient(to bottom right, ${colors.primary}, ${colors.primary}CC)`,
              }}
              onClick={() => {
                navigate(offer.link);
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }, 100);
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="bg-white/20 p-3 rounded-lg">{offer.icon}</div>
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-bold">
                  {offer.discount}
                </span>
              </div>

              <h3 className="text-2xl font-bold mb-2">{offer.title}</h3>
              <p className="text-white/90 mb-4">{offer.description}</p>

              <span
                className="font-semibold flex items-center gap-2 bg-white px-3 py-2 rounded-full w-max transition-colors duration-300"
                style={{ color: colors.primary }}
              >
                Learn More →
              </span>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => {
              navigate("/offers");
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }, 100);
            }}
            className="inline-block px-8 py-3 font-semibold rounded-lg transition-all duration-300 border-2"
            style={{
              backgroundColor: isDarkMode ? colors.primary : "white",
              borderColor: colors.primary,
              color: isDarkMode ? "white" : colors.primary,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.primary;
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = isDarkMode
                ? colors.primary
                : "white";
              e.currentTarget.style.color = isDarkMode
                ? "white"
                : colors.primary;
            }}
          >
            View All Offers
          </button>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
