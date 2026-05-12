import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import { useAuth } from "../../../context/AuthContext";
import { useNotifications } from "../../../context/NotificationsContext";
import AuthPanel from "../components/AuthPanel";
import AuthInput from "../components/AuthInput";
import { getRoleRedirect } from "../components/auth.constants";

const Login = () => {
  const { isDarkMode, colors } = useTheme();
  const { login, isLoading } = useAuth();
  const { append } = useNotifications();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const loggedInUser = await login({ email, password });

      append({
        topic: "user-logged-in",
        title: `Welcome back, ${loggedInUser.name}!`,
        timestamp: new Date().toISOString(),
        payload: null,
        ephemeral: true,
      });

      const fromPath = location.state?.from?.pathname;
      const targetPath =
        loggedInUser.role === "member" && fromPath
          ? fromPath
          : getRoleRedirect(loggedInUser.role);
      navigate(targetPath, { replace: true });
    } catch (err) {
      setError(err.message || "Login failed.");
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div
        className={`min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12 transition-colors duration-300 ${
          isDarkMode
            ? "bg-gradient-to-br from-gray-900 via-black to-gray-900"
            : "bg-gradient-to-br from-gray-50 via-white to-gray-50"
        }`}
      >
        <div
          className={`w-full max-w-4xl rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden transition-colors duration-300 ${
            isDarkMode
              ? "bg-gray-800 border border-white/10"
              : "bg-white border border-gray-200"
          }`}
        >
          <AuthPanel
            isDarkMode={isDarkMode}
            colors={colors}
            roleLabel="Secure Login"
            title="Welcome back to Cinema Hub"
            description="Login using your account credentials to continue your cinema experience."
          />

          <div
            className={`md:w-1/2 p-8 md:p-12 flex flex-col justify-center transition-colors duration-300 ${
              isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
            }`}
          >
            <h2
              className={`text-3xl font-bold mb-8 text-center ${
                isDarkMode ? "text-white" : "text-[#dc2626]"
              }`}
            >
              Login to Your Account
            </h2>

            <form className="space-y-6" onSubmit={handleLogin}>
              <AuthInput
                label="Email Address"
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@example.com"
                isDarkMode={isDarkMode}
                colors={colors}
              />
              <AuthInput
                label="Password"
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                isDarkMode={isDarkMode}
                colors={colors}
              />

              {error && <p className="text-sm text-red-500">{error}</p>}

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className={`h-4 w-4 rounded border focus:ring-2 transition-colors duration-300 ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600"
                        : "bg-white border-gray-300"
                    }`}
                    style={{ accentColor: colors.primary }}
                  />
                  <label
                    htmlFor="remember-me"
                    className={`ml-2 transition-colors duration-300 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  to="/forgot-password"
                  className="font-medium transition-colors duration-300 hover:underline"
                  style={{ color: colors.primary }}
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg text-white font-bold text-lg shadow-lg transition-all duration-300"
                style={{ backgroundColor: colors.primary }}
                disabled={isLoading}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.9";
                  e.currentTarget.style.transform = "scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p
              className={`mt-8 text-center text-sm transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Don't have an account?{" "}
              <Link
                to="/sign-up"
                className="font-medium transition-colors duration-300 hover:underline"
                style={{ color: colors.primary }}
              >
                Sign Up
              </Link>
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-3 text-center text-xs text-gray-400 hover:text-gray-600 transition-colors"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              ← Back to home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
