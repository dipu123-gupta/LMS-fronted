import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRole }) => {
  const { isLoggedIn, role, loading } = useSelector(
    (state) => state.auth
  );

  // 🔥 IMPORTANT FIX
  if (loading) {
    return null; // or loader
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRole.includes(role)) {
    return <Navigate to="/denied" replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
