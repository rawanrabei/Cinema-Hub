import React from "react";
import { IoGiftOutline } from "react-icons/io5";
import { useTheme } from "../../context/ThemeContext";

const FrontPanelOffers = () => {
  const { isDarkMode, colors } = useTheme();

  return (
    <div className="overflow-x-hidden">
      <div
        className={`py-10 phone:w-auto tablet:w-auto laptop:w-auto transition-colors duration-300 ${
          isDarkMode
            ? "bg-gradient-to-r from-gray-900 via-gray-900 to-gray-800"
            : "bg-gradient-to-t from-white to-gray-100"
        }`}
      >
        <div className="m-5 flex flex-col gap-5">
          <h1
            className={`text-5xl transition-colors duration-300 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            <IoGiftOutline
              className="inline-block mr-5 mb-2 phone:text-4xl transition-colors duration-300"
              style={{ color: colors.primary }}
            />
            Special <span style={{ color: colors.primary }}>Offers</span>
          </h1>
          <p
            className={`phone:w-96 laptop:w-screen transition-colors duration-300 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Save more on your movie experience with our exclusive deals and
            promotions. Limited time offers!
          </p>
        </div>
      </div>
    </div>
  );
};

export default FrontPanelOffers;
