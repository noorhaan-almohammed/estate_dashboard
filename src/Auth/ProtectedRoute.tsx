import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;