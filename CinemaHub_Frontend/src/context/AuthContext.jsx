import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AuthContext = createContext(null);
const ROLES = ["admin", "manager", "member"];
const DEFAULT_ROLE = "member";
const USERS_KEY = "cinemaHub.auth.users";
const SESSION_KEY = "cinemaHub.auth.session";

const DEMO_USERS = [
  {
    id: "demo-admin",
    name: "Cinema Admin",
    email: "admin@cinemahub.com",
    password: "Admin@123",
    role: "admin",
  },
  {
    id: "demo-manager",
    name: "Cinema Manager",
    email: "manager@cinemahub.com",
    password: "Manager@123",
    role: "manager",
  },
  {
    id: "demo-user",
    name: "Sara Ibrahim",
    email: "user@cinemahub.com",
    password: "User@123",
    role: "member",
  },
];

const normalizeEmail = (email) => email.trim().toLowerCase();
const safeUser = ({ password, ...user }) => user;

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
  const [users, setUsers] = useState(() => {
    // Clear old localStorage and use fresh DEMO_USERS
    localStorage.removeItem(USERS_KEY);
    localStorage.removeItem(SESSION_KEY);
    return DEMO_USERS;
  });
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    saveStorage(USERS_KEY, users);
  }, [users]);

  useEffect(() => {
    if (user) {
      saveStorage(SESSION_KEY, user);
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
  }, [user]);

  const withAuthLoading = useCallback(async (action) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 350));
      return await action();
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(
    async ({ email, password, role }) => {
      return withAuthLoading(async () => {
        const normalizedEmail = normalizeEmail(email || "");
        const normalizedRole = role || null;
        const foundUser = users.find((item) => item.email === normalizedEmail);

        if (!foundUser || foundUser.password !== password) {
          throw new Error("Invalid email or password.");
        }

        if (normalizedRole && foundUser.role !== normalizedRole) {
          throw new Error("This account does not belong to the selected role.");
        }

        const nextUser = safeUser(foundUser);
        setUser(nextUser);
        return nextUser;
      });
    },
    [users, withAuthLoading],
  );

  const signup = useCallback(
    async ({ name, email, password }) => {
      return withAuthLoading(async () => {
        const normalizedEmail = normalizeEmail(email || "");
        const role = DEFAULT_ROLE;

        if (!normalizedEmail.includes("@")) {
          throw new Error("Please enter a valid email.");
        }

        if (password.length < 8) {
          throw new Error("Password must be at least 8 characters.");
        }

        if (!ROLES.includes(role)) {
          throw new Error("Invalid account role.");
        }

        const alreadyExists = users.some((item) => item.email === normalizedEmail);
        if (alreadyExists) {
          throw new Error("Email is already registered.");
        }

        const createdUser = {
          id: `user-${Date.now()}`,
          name: name.trim(),
          email: normalizedEmail,
          password,
          role,
        };

        setUsers((prev) => [...prev, createdUser]);
        const nextUser = safeUser(createdUser);
        setUser(nextUser);
        return nextUser;
      });
    },
    [users, withAuthLoading],
  );

  const logout = useCallback(() => {
    setUser(null);
  }, []);

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
      users,
      isAuthenticated: Boolean(user),
      isLoading,
      roles: ROLES,
      defaultRole: DEFAULT_ROLE,
      login,
      signup,
      logout,
      hasRole,
    }),
    [user, users, isLoading, login, signup, logout, hasRole],
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
