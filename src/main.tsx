import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { AppRoutes } from "./router.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import SupabaseAuth from "./adapters/SupabaseAuth.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider
      adapter={
        new SupabaseAuth(
          "http://localhost:8000",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzcwMTE3Njk5LCJleHAiOjE5Mjc3OTc2OTl9.gO08ZgndhU6UkiUUXy2FYde1_0O0-LCom6uUxq2tSls",
        )
      }
    >
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
