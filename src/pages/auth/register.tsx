import { useNavigate } from "react-router";
import RegisterForm, {
  type RegisterFormProps,
} from "../../components/register-form";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { AuthShell } from "../../components/auth-shell";

interface RegisterProps {
  loginLink?: RegisterFormProps["loginLink"];
}

export default function Register({ loginLink }: RegisterProps) {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState<string>();
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleOnSubmit = async (data: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    setError(undefined);

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setSubmitting(true);

    try {
      await signUp({
        email: data.email,
        password: data.password,
      });
      navigate("/auth", {
        state: { message: "Registration successful! Please check your email." },
      });
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthShell>
      <RegisterForm
        onSubmit={handleOnSubmit}
        error={error}
        pending={submitting}
        loginLink={loginLink}
      />
    </AuthShell>
  );
}
