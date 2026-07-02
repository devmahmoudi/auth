import { Route, Routes } from "react-router";
import AuthLayout from "./layouts/AuthLayout.tsx";
import Home from "./pages/home.tsx";
import Login from "./pages/auth/login.tsx";
import ProtectedLayout from "./layouts/ProtectRouteLayout.tsx";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<Login />} />
      </Route>
      <Route path="/" element={<ProtectedLayout/>}>
        <Route index element={<Home/>}/>
      </Route>
    </Routes>
  );
}
