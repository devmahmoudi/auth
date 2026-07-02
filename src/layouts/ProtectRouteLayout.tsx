import { Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedLayout() {
    const {session} = useAuth()

  if (!session) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
}
