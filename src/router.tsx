import { Navigate, Route, Router, Routes } from "react-router";
import AuthLayout from "./layouts/AuthLayout.tsx";
import Home from "./pages/home.tsx";
import Login from "./pages/auth/login.tsx";
import ProtectedLayout from "./layouts/ProtectRouteLayout.tsx";
import Register from "./pages/auth/register.tsx";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<Navigate to={"/auth/login"}/>} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="/" element={<ProtectedLayout/>}>
        <Route index element={<Home/>}/>
      </Route>
    </Routes>
  );
}
