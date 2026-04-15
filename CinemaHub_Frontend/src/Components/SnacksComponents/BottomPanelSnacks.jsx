import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { FaCartShopping } from "react-icons/fa6";
import { useTheme } from "../../context/ThemeContext";

const BottomPanel = ({
  subtotal,
  totalItems,
  ticketsTotal = 0,
  grandTotal = 0,
}) => {
  const { isDarkMode, colors } = useTheme();

  const displayTotal = grandTotal > 0 ? grandTotal : subtotal;

  return (
    <div
      className={`rounded-lg p-3 md:p-4 mt-8 md:mt-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 transition-colors duration-300 ${
        isDarkMode ? "bg-black" : "bg-gray-300 border border-gray-200"
      }`}
    >
      <div className="w-full md:w-auto">
        {ticketsTotal > 0 && (
          <div className="mb-2">
            <p
              className={`text-xs md:text-sm transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Snacks:{" "}
              <span style={{ color: colors.primary }}>
                ${subtotal.toFixed(2)}
              </span>
            </p>
            <p
              className={`text-xs md:text-sm transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Tickets:{" "}
              <span style={{ color: colors.primary }}>
                ${ticketsTotal.toFixed(2)}
              </span>
            </p>
          </div>
        )}
        <p
          className={`text-xs md:text-sm transition-colors duration-300 ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {ticketsTotal > 0 ? "Grand Total" : "Total"}
        </p>
        <p
          className="text-lg md:text-xl transition-colors duration-300"
          style={{ color: colors.primary }}
        >
          ${displayTotal.toFixed(2)}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 md:gap-5 p-3 w-full md:w-auto">
        <Button
          variant="filled"
          className={`transition-colors duration-300 text-sm md:text-base ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-900"
          }`}
        >
          Skip
        </Button>
        <Link to="/booking" className="w-full sm:w-auto">
          <Button
            className="text-white transition-colors duration-300 w-full sm:w-auto text-sm md:text-base"
            style={{ backgroundColor: colors.primary }}
          >
            <FaCartShopping className="inline-block mr-2 md:mr-3 text-xs md:text-sm" />
            Continue ({totalItems})
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BottomPanel;
