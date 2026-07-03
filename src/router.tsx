import { Navigate, Route, Routes } from "react-router";
import Home from "./pages/home.tsx";
import Login from "./pages/auth/login.tsx";
import ProtectedLayout from "./guard/ProtectLayout.tsx";
import Register from "./pages/auth/register.tsx";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/auth">
        <Route index element={<Navigate to={"/auth/login"}/>} />
        <Route path="login" element={<Login registerLink="/auth/register"/>} />
        <Route path="register" element={<Register loginLink="/auth/login"/>} />
      </Route>
      <Route path="/" element={<ProtectedLayout/>}>
        <Route index element={<Home/>}/>
      </Route>
    </Routes>
  );
}
