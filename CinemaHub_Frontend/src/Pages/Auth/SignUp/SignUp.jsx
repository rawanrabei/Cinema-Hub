import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useTheme } from "../../../context/ThemeContext";
import { useAuth } from "../../../context/AuthContext";
import AuthPanel from "../components/AuthPanel";
import AuthInput from "../components/AuthInput";
import { getRoleRedirect } from "../components/auth.constants";

const Register = () => {
  const { isDarkMode, colors } = useTheme();
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!agreedToTerms) {
      setError("You must agree to the Terms & Privacy to create an account.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      const registeredUser = await signup({
        name: fullName,
        email: formData.email,
        password: formData.password,
        role: "user",
      });
      navigate(getRoleRedirect(registeredUser.role), { replace: true });
    } catch (err) {
      setError(err.message || "Signup failed");
    }
  };

  return (
    <div
      className={`min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12 transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-b from-[#0b0b0b] via-[#151515] to-black"
          : "bg-gradient-to-b from-gray-50 via-white to-gray-50"
      }`}
    >
      <div
        className={`w-full max-w-5xl rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden transition-colors duration-300 ${
          isDarkMode
            ? "bg-[#111111]/80 border border-white/10"
            : "bg-white border border-gray-200"
        }`}
      >
        <AuthPanel
          isDarkMode={isDarkMode}
          colors={colors}
          roleLabel="New Member"
          title="Create your Cinema Hub account"
          description="Sign up as a member and your account will be saved for future logins."
        />

        <div
          className={`w-full lg:w-1/2 p-10 sm:p-14 transition-colors duration-300 ${
            isDarkMode ? "bg-[#111111] text-white" : "bg-white text-gray-900"
          }`}
        >
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <p
                className="text-sm uppercase tracking-[0.3em] transition-colors duration-300"
                style={{ color: colors.primary }}
              >
                Create account
              </p>
              <h1
                className={`text-3xl font-semibold transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Welcome to StarView Cinema
              </h1>
              <p
                className={`text-sm transition-colors duration-300 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold transition-colors duration-300 hover:underline"
                  style={{ color: colors.primary }}
                >
                  Sign in
                </Link>
              </p>
            </div>

            <form
              className="space-y-4"
              onSubmit={handleSignup}
            >
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <AuthInput
                      label="First name"
                      id="firstName"
                      autoComplete="given-name"
                      placeholder="Sara"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      isDarkMode={isDarkMode}
                      colors={colors}
                    />
                  </div>
                  <div className="flex-1">
                    <AuthInput
                      label="Last name"
                      id="lastName"
                      autoComplete="family-name"
                      placeholder="Ibrahim"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      isDarkMode={isDarkMode}
                      colors={colors}
                    />
                  </div>
                </div>
                <AuthInput
                  label="Email address"
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  isDarkMode={isDarkMode}
                  colors={colors}
                />
                <AuthInput
                  label="Password"
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  isDarkMode={isDarkMode}
                  colors={colors}
                />
                <AuthInput
                  label="Confirm Password"
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Repeat your password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                  isDarkMode={isDarkMode}
                  colors={colors}
                />
                <label
                  className={`flex items-center gap-3 text-sm transition-colors duration-300 ${
                    isDarkMode ? "text-gray-400" : "text-gray-700"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="rounded transition-colors duration-300"
                    style={{
                      accentColor: colors.primary,
                      backgroundColor: isDarkMode ? "#1c1c1c" : "white",
                    }}
                  />
                  I agree to the{" "}
                  <span
                    className="font-semibold transition-colors duration-300"
                    style={{ color: colors.primary }}
                  >
                    Terms & Privacy
                  </span>
                </label>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-white font-semibold transition-all duration-300"
                  style={{ backgroundColor: colors.primary }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = colors.primary;
                    e.currentTarget.style.border = `2px solid ${colors.primary}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = colors.primary;
                    e.currentTarget.style.color = "white";
                    e.currentTarget.style.border = "none";
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create account"}
                </button>
              </div>
            </form>
            {error && (
              <p className="text-center text-sm text-red-500 mt-2">{error}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;