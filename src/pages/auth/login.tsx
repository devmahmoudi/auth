import { useNavigate } from "react-router";
import LoginForm from "../../components/login-form";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import type { SignInResult } from "../../types/SignInResult";

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState<string>();
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleOnSubmit = async (credentials: {
    email: string;
    password: string;
  }) => {
    setSubmitting(true);
    signIn(credentials).then((result: SignInResult) => {
      if (result.succeed) navigate("/");
      else setError(result.error);
    }).finally(() => setSubmitting(false));
  };

  return (
    <LoginForm onSubmit={handleOnSubmit} error={error} pending={submitting} />
  );
}
