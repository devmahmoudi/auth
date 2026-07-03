import { Input, Spinner } from "@devmahmoudi/ui";
import { Label } from "@devmahmoudi/ui";
import { Button } from "@devmahmoudi/ui";
import { useState } from "react";
import { Link } from "react-router";

export type LoginFormProps = {
  title?: string;
  subtitle?: string;
  onSubmit?: (credentials: { email: string; password: string }) => void;
  error?: string;
  pending?: boolean;
  registerLink?: string;
};

interface Credentials {
  email: string;
  password: string;
}

export default function LoginForm({
  title,
  subtitle,
  onSubmit,
  error,
  pending,
  registerLink,
}: LoginFormProps) {
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  });
  const handleChange = (key: keyof Credentials, value: string) => {
    setCredentials((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="space-y-5 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold">{title ?? "Login"}</h2>
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

        <Button
          type="submit"
          className="w-full"
          onClick={() =>
            onSubmit?.({
              email: credentials.email,
              password: credentials.password,
            })
          }
        >
          {pending ? <Spinner /> : "Login"}
        </Button>
      </form>

      {registerLink && (
        <div className="text-center text-sm">
          <Link
            to={registerLink}
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            Don't have an account? Register.
          </Link>
        </div>
      )}
    </div>
  );
}
