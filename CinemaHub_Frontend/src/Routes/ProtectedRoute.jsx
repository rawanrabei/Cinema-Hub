import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getRoleRedirect } from "../Pages/Auth/components/auth.constants";

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { user, hasRole } = useAuth();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: { pathname: location.pathname } }}
      />
    );
  }

  if (!hasRole(allowedRoles)) {
    return <Navigate to={getRoleRedirect(user.role)} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;


