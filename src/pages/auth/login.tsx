import { useNavigate } from "react-router";
import LoginForm, { type LoginFormProps } from "../../components/login-form";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import type { SignInResult } from "../../types/SignInResult";
import { AuthShell } from "../../components/auth-shell";

interface LoginProps {
  registerLink?: LoginFormProps["registerLink"];
}

export default function Login({ registerLink }: LoginProps) {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState<string>();
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleOnSubmit = async (credentials: {
    email: string;
    password: string;
  }) => {
    setSubmitting(true);
    signIn(credentials)
      .then((result: SignInResult) => {
        if (result.succeed) navigate("/");
        else setError(result.error);
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <AuthShell>
      <LoginForm
        onSubmit={handleOnSubmit}
        error={error}
        pending={submitting}
        registerLink={registerLink}
      />
    </AuthShell>
  );
}
