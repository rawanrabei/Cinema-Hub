import { useTheme } from "../context/ThemeContext";

/**
 * Hook to get theme-aware color utilities
 * Returns functions and values that automatically adjust based on theme
 */
export const useThemeColors = () => {
  const { isDarkMode, colors } = useTheme();

  // Helper function to get primary color (red in light, blue in dark)
  const getPrimaryColor = () => colors.primary;

  // Helper function to get background classes
  const getBgClasses = () => {
    return {
      main: isDarkMode ? "bg-black" : "bg-white",
      secondary: isDarkMode ? "bg-[#111111]" : "bg-gray-50",
      card: isDarkMode ? "bg-[#111111]" : "bg-white",
    };
  };

  // Helper function to get text classes
  const getTextClasses = () => {
    return {
      primary: isDarkMode ? "text-white" : "text-gray-900",
      secondary: isDarkMode ? "text-gray-400" : "text-gray-600",
      muted: isDarkMode ? "text-gray-500" : "text-gray-500",
    };
  };

  // Helper function to get border classes
  const getBorderClasses = () => {
    return {
      default: isDarkMode ? "border-white/10" : "border-gray-200",
      light: isDarkMode ? "border-white/5" : "border-gray-100",
    };
  };

  // Replace all red colors with theme-aware primary color 
  const replaceRed = (className) => {
    // This is a simple helper - in practice, we'll use inline styles for primary color
    return className.replace(/#FF0800/g, colors.primary);
  };

  return {
    isDarkMode,
    colors,
    getPrimaryColor,
    getBgClasses,
    getTextClasses,
    getBorderClasses,
    replaceRed,
  };
};
