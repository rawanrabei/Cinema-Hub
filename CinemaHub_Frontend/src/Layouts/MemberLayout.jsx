import { Outlet } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function MemberLayout() {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-gray-950" : "bg-gray-50"
      }`}
    >
      <Outlet />
    </div>
  );
}
