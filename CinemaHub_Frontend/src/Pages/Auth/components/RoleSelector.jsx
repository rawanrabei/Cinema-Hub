import { ROLE_CONFIG } from "./auth.constants";

const RoleSelector = ({ selectedRole, onSelectRole, isDarkMode, colors }) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      {Object.entries(ROLE_CONFIG).map(([roleKey, roleValue]) => {
        const isActive = selectedRole === roleKey;
        return (
          <button
            key={roleKey}
            type="button"
            onClick={() => onSelectRole(roleKey)}
            className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-all ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
            style={{
              borderColor: isActive ? colors.primary : isDarkMode ? "#4b5563" : "#d1d5db",
              backgroundColor: isActive ? `${colors.primary}20` : "transparent",
            }}
          >
            {roleValue.label}
          </button>
        );
      })}
    </div>
  );
};

export default RoleSelector;
