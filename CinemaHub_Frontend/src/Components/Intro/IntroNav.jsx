import React from "react";
import { Sun, Moon, LogIn, Clapperboard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const IntroNav = ({ darkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  const { colors } = useTheme();
  return (
    <nav
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 32px",
    borderBottom: "1px solid #e5e7eb",
    backgroundColor: "black",
    backdropFilter: "blur(10px)",
   
  }}
>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Clapperboard size={30} color={colors.primary} />
        </div>
        <span
          style={{
            fontWeight: "700",
            fontSize: "22px",
            color: darkMode ? "#fff" : colors.primary,
          }}
        >
          Cinema Hub
        </span>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <button
          onClick={toggleDarkMode}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: darkMode ? "#fff" : colors.primary,
            padding: "6px",
          }}
        >
          {darkMode ? <Sun size={25} /> : <Moon size={25} />}
        </button>

        <button
          onClick={() => navigate("/login")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            backgroundColor: colors.primary,
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "8px 18px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "18px",
          }}
        >
          <LogIn size={16} />
          Login
        </button>
      </div>
    </nav>
  );
};

export default IntroNav;
