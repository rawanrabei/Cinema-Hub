import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { API_BASE_URL } from "../config/api";

const AuthContext = createContext(null);
const ROLES = ["ADMIN", "MANAGER", "USER"];
const DEFAULT_ROLE = "USER";
const TOKEN_KEY = "cinemaHub.auth.token";
const USER_KEY = "cinemaHub.auth.user";

const parseStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const saveStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => parseStorage(USER_KEY, null));
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [isLoading, setIsLoading] = useState(false);
  /** True while session is being cleared — ProtectedRoute sends user to /home, not /login */
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  /** Same as `token` but updated synchronously on login/logout so in-flight fetchProfile cannot restore session */
  const tokenRef = useRef(token);

  useEffect(() => {
    tokenRef.current = token;
  }, [token]);

  useEffect(() => {
    if (user) {
      saveStorage(USER_KEY, user);
    } else {
      localStorage.removeItem(USER_KEY);
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  }, [token]);

  const withAuthLoading = useCallback(async (action) => {
    setIsLoading(true);
    try {
      return await action();
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(
    async ({ email, password }) => {
      return withAuthLoading(async () => {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          const error = await response.text();
          throw new Error(error || "Login failed.");
        }

        const jwtToken = await response.text();
        
        // Decode JWT to get user info (simple implementation)
        const base64Url = jwtToken.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        const decoded = JSON.parse(jsonPayload);
        
        const userData = {
          id: decoded.userId || decoded.sub,
          email: decoded.sub,
          role: decoded.role ? decoded.role.toLowerCase() : DEFAULT_ROLE.toLowerCase(),
          name: decoded.sub.split('@')[0],
        };

        setIsLoggingOut(false);
        tokenRef.current = jwtToken;
        setToken(jwtToken);
        setUser(userData);
        return userData;
      });
    },
    [withAuthLoading],
  );

  const signup = useCallback(
    async ({ name, email, password, role }) => {
      return withAuthLoading(async () => {
        const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            username: name,
            email, 
            password,
            role: role ? role.toUpperCase() : DEFAULT_ROLE 
          }),
        });

        if (!response.ok) {
          const error = await response.text();
          throw new Error(error || "Registration failed.");
        }

        const result = await response.text();
        
        // Auto-login after registration
        return login({ email, password });
      });
    },
    [withAuthLoading, login],
  );

  const logout = useCallback(() => {
    setIsLoggingOut(true);
    tokenRef.current = null;
    const authToken = token;
    if (authToken) {
      void fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }).catch((error) => {
        console.error("Logout error:", error);
      });
    }
    setToken(null);
    setUser(null);
    window.setTimeout(() => setIsLoggingOut(false), 400);
  }, [token]);

  const fetchProfile = useCallback(async () => {
    if (!token) return null;
    const requestToken = token;

    return withAuthLoading(async () => {
      const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${requestToken}`,
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch profile:", response.status);
        return null;
      }

      if (tokenRef.current !== requestToken) {
        return null;
      }

      const profileData = await response.json();

      if (tokenRef.current !== requestToken) {
        return null;
      }

      const userData = {
        id: profileData.id,
        email: profileData.email,
        role: profileData.role ? profileData.role.toLowerCase() : DEFAULT_ROLE.toLowerCase(),
        name: profileData.username,
      };

      setUser(userData);
      return userData;
    });
  }, [token, withAuthLoading]);

  const hasRole = useCallback(
    (allowedRoles = []) => {
      if (!user) return false;
      if (!allowedRoles.length) return true;
      return allowedRoles.includes(user.role);
    },
    [user],
  );

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      isLoggingOut,
      roles: ROLES.map(r => r.toLowerCase()),
      defaultRole: DEFAULT_ROLE.toLowerCase(),
      login,
      signup,
      logout,
      hasRole,
      token,
      fetchProfile,
    }),
    [user, isLoading, isLoggingOut, login, signup, logout, hasRole, token, fetchProfile],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
