import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const IntroCTA = ({ darkMode }) => {
  const navigate = useNavigate();
  const { colors } = useTheme();
  return (
    <section
      style={{
        backgroundColor: darkMode ? "#111" : "#fdf6ed",
        padding: "40px 40px 70px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: darkMode
            ? `linear-gradient(135deg, ${colors.primary}20 0%, #1f2937 100%)`
            : "linear-gradient(135deg, #fde8d8 0%, #f9c5c5 50%, #f5a8a8 100%)",
          borderRadius: "20px",
          border: darkMode ? `1px solid ${colors.primary}55` : "1px solid #f0c0a0",
          padding: "60px 40px",
          textAlign: "center",
        }}
      >
        {/* Icon */}
        <div style={{ marginBottom: "24px" }}>
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke={colors.primary}
            strokeWidth="1.8"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>

        {/* Title */}
        <h2
          style={{
            fontSize: "36px",
            fontWeight: "700",
            color: darkMode ? "#fff" : "#1a1a1a",
            margin: "0 0 12px",
            lineHeight: "1.3",
          }}
        >
          Ready for a <span style={{ color: colors.primary }}>cinematic</span>{" "}
          experience?
        </h2>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "15px",
            color: darkMode ? "#cbd5e1" : "#666",
            margin: "0 0 36px",
          }}
        >
          Join thousands of happy users and book your ticket now
        </p>

        {/* Button */}
        <button
        onClick={() => navigate("/home")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: colors.primary,
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            padding: "14px 32px",
            fontSize: "15px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          ✦ Get Started for Free →
        </button>
      </div>
    </section>
  );
};

export default IntroCTA;
