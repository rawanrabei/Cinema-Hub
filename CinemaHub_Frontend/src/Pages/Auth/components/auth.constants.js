export const ROLE_CONFIG = {
  admin: {
    label: "Admin",
    loginPath: "/admin",
  },
  manager: {
    label: "Manager",
    loginPath: "/manager",
  },
  member: {
    label: "Member",
    loginPath: "/home",
  },
};

export const FALLBACK_AUTH_PATH = "/home";

export const getRoleFromQuery = (searchParams, fallbackRole = "member") => {
  const roleParam = searchParams.get("role");
  return ROLE_CONFIG[roleParam] ? roleParam : fallbackRole;
};

export const getRoleRedirect = (role) =>
  ROLE_CONFIG[role]?.loginPath || FALLBACK_AUTH_PATH;
