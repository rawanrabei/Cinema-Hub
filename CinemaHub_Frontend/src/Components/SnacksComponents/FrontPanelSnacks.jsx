import { CiForkAndKnife } from "react-icons/ci";
import { useTheme } from "../../context/ThemeContext";

const FrontPanel = () => {
  const { isDarkMode, colors } = useTheme();

  return (
    <div>
      <div
        className={`py-6 md:py-10 transition-colors duration-300 ${
          isDarkMode
            ? "bg-gradient-to-r from-gray-900 via-gray-900 to-gray-800"
            : "bg-gradient-to-t from-white to-gray-100"
        }`}
      >
        <div className="mx-4 md:m-5 flex flex-col gap-4 md:gap-5">
          <h1
            className={`text-3xl md:text-4xl lg:text-5xl transition-colors duration-300 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            <CiForkAndKnife
              className="inline-block mr-3 md:mr-5 mb-1 md:mb-2 transition-colors duration-300 text-3xl md:text-5xl"
              style={{ color: colors.primary }}
            />
            Food & <span style={{ color: colors.primary }}>Drinks</span>
          </h1>
          <p
            className={`text-sm md:text-base transition-colors duration-300 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Enhance Your Movie Experience With Delicious Snacks And Refreshing
            Beverages
          </p>
        </div>
      </div>
    </div>
  );
};

export default FrontPanel;
