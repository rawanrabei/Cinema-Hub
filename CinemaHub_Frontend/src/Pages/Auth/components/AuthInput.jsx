const AuthInput = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete,
  isDarkMode,
  colors,
  required = true,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className={`block text-sm font-medium mb-2 ${
          isDarkMode ? "text-gray-300" : "text-gray-700"
        }`}
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={`w-full px-4 py-2.5 rounded-lg border placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
          isDarkMode
            ? "bg-gray-700 border-gray-600 text-white focus:border-gray-500"
            : "bg-gray-50 border-gray-300 text-gray-900 focus:border-gray-400"
        }`}
        onFocus={(e) => {
          e.target.style.borderColor = colors.primary;
          e.target.style.boxShadow = `0 0 0 3px ${colors.primary}30`;
        }}
        onBlur={(e) => {
          e.target.style.borderColor = isDarkMode ? "#4B5563" : "#D1D5DB";
          e.target.style.boxShadow = "none";
        }}
      />
    </div>
  );
};

export default AuthInput;
