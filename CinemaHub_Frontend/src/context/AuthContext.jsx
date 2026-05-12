import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
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

  const logout = useCallback(async () => {
    // Call backend logout endpoint
    if (token) {
      try {
        await fetch(`${API_BASE_URL}/api/auth/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("Logout error:", error);
      }
    }
    setToken(null);
    setUser(null);
  }, [token]);

  const fetchProfile = useCallback(async () => {
    if (!token) return null;
    
    return withAuthLoading(async () => {
      const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch profile:", response.status);
        return null;
      }

      const profileData = await response.json();
      
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
      roles: ROLES.map(r => r.toLowerCase()),
      defaultRole: DEFAULT_ROLE.toLowerCase(),
      login,
      signup,
      logout,
      hasRole,
      token,
      fetchProfile,
    }),
    [user, isLoading, login, signup, logout, hasRole, token, fetchProfile],
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
