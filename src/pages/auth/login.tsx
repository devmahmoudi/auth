import { useNavigate } from "react-router";
import LoginForm from "../../components/login-form";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState<string>()

  const handleOnSubmit = async (credentials: {
    email: string;
    password: string;
  }) => {
    const result = await signIn(credentials);

    if(result.succeed)
        navigate("/");
    else
        setError(result.error)
  };

  return <LoginForm onSubmit={handleOnSubmit} error={error}/>;
}
