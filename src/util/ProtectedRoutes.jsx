import { useEffect, useState, useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { validateToken } from "../api";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoutes = ({ allowedRoles }) => {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    validateToken()
      .then((res) => {
        setUser(res.data.user);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/auth/login" />;

  if (allowedRoles && !allowedRoles.includes(user.role))
    return <Navigate to="/unauthorized" />;

  return <Outlet />;
};

export default ProtectedRoutes;
