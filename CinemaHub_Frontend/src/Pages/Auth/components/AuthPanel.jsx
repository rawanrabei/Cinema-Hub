import { Clapperboard } from "lucide-react";

const AuthPanel = ({ isDarkMode, colors, roleLabel, title, description }) => {
  return (
    <div
      className="relative md:w-1/2 p-8 md:p-12 flex flex-col justify-between text-white bg-cover bg-center"
      style={{
        backgroundImage: isDarkMode
          ? "url(https://images.unsplash.com/photo-1517604931442-7e0f8cecd2e5?w=800&q=80)"
          : "url(https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80)",
      }}
    >
      <div
        className="absolute inset-0 transition-colors duration-300"
        style={{
          background: isDarkMode
            ? `linear-gradient(to bottom, ${colors.primary}80, black 85%)`
            : `linear-gradient(to bottom, ${colors.primary}20, ${colors.primary}50)`,
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-6">
          <Clapperboard size={30} />
          <span className="text-2xl font-bold">Cinema Hub</span>
        </div>
        <span
          style={{
            display: "inline-block",
            backgroundColor: "rgba(255,255,255,0.2)",
            color: "#fff",
            fontSize: "12px",
            fontWeight: "600",
            padding: "4px 14px",
            borderRadius: "99px",
            marginBottom: "16px",
            textTransform: "capitalize",
          }}
        >
          {roleLabel}
        </span>
        <h2 className="text-3xl font-bold mb-4 leading-tight">{title}</h2>
        <p className="text-white/80 text-sm">{description}</p>
      </div>

      <div className="relative z-10 mt-8 md:mt-0">
        <p className="text-xs text-white/60">© {new Date().getFullYear()} Cinema Hub</p>
      </div>
    </div>
  );
};

export default AuthPanel;
