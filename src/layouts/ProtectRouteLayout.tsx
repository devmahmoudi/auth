import { Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedLayout() {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
}