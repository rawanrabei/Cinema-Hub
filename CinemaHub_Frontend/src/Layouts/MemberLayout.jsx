import { Outlet } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";

export default function MemberLayout() {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-gray-950" : "bg-gray-50"
      }`}
    >
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
