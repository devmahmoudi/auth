import { Input, Spinner } from "@devmahmoudi/ui";
import { Label } from "@devmahmoudi/ui";
import { Button } from "@devmahmoudi/ui";
import { useState } from "react";
import { Link } from "react-router";

export type RegisterFormProps = {
  title?: string;
  subtitle?: string;
  onSubmit?: (data: { email: string; password: string; confirmPassword: string }) => void;
  error?: string;
  pending?: boolean;
  loginLink?: string;
};

interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterForm({
  title,
  subtitle,
  onSubmit,
  error,
  pending,
  loginLink,
}: RegisterFormProps) {
  const [data, setData] = useState<RegisterData>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (key: keyof RegisterData, value: string) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="space-y-5 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold">{title ?? "Sign Up"}</h2>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        {error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div>
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="example@email.com"
            className="mt-2"
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>

        <div>
          <Label>Password</Label>
          <Input
            type="password"
            placeholder="••••••••"
            className="mt-2"
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </div>

        <div>
          <Label>Confirm Password</Label>
          <Input
            type="password"
            placeholder="••••••••"
            className="mt-2"
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          onClick={() =>
            onSubmit?.({
              email: data.email,
              password: data.password,
              confirmPassword: data.confirmPassword,
            })
          }
        >
          {pending ? <Spinner /> : "Sign Up"}
        </Button>
      </form>

      {loginLink && (
        <div className="text-center text-sm">
          <Link
            to={loginLink}
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            Already have an account? Sign In
          </Link>
        </div>
      )}
    </div>
  );
}