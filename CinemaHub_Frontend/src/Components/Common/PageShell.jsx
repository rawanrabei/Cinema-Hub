import { useTheme } from "../../context/ThemeContext";

export default function PageShell({ title, children }) {
  const { isDarkMode, colors } = useTheme();

  return (
    <section
      className={`min-h-screen p-6 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {title && (
        <h1
          className="text-2xl font-bold mb-4"
          style={{ color: isDarkMode ? "#ffffff" : colors.primary }}
        >
          {title}
        </h1>
      )}
      <div
        className={`rounded-xl border p-4 transition-colors duration-300 ${
          isDarkMode ? "bg-gray-900 border-white/10" : "bg-white border-gray-200"
        }`}
      >
        {children}
      </div>
    </section>
  );
}
