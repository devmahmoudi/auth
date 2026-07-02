import { Outlet } from "react-router";
import { AuthShell } from "../components/auth-shell";

function AuthLayout() {
  return (
    <AuthShell>
      <Outlet />
    </AuthShell>
  );
}

export default AuthLayout;
