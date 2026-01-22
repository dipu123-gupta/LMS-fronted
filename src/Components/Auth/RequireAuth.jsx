import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRole }) => {
  const { isLoggedIn, role } = useSelector((state) => state.auth);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRole.includes(role)) {
    return <Navigate to="/denied" replace />;
  }

  return <Outlet />;

  // return isLoggedIn && allowedRole.include((myRole) => myRole === role) ? (
  //   <Outlet />
  // ) : isLoggedIn ? (
  //   <Navigate to="/denied" />
  // ) : (
  //   <Navigate to="/login" />
  // );
};

export default RequireAuth;
