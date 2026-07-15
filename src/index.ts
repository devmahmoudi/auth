export { default as SupabaseAuth } from "./adapters/SupabaseAuth";
export { default as Register } from "./pages/auth/register";
export { default as Login } from "./pages/auth/login";
export * from "./contexts/AuthContext";
export * from "./plugins/AuthPlugin"

export { default as ProtectedLayout } from "./guard/ProtectLayout";
