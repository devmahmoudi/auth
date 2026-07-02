import { Button, Spinner } from "@devmahmoudi/ui";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import { useState } from "react";

export default function Home() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const [signingOut, setSigningOut] = useState<boolean>(false);

  const handleSignOut = () => {
    setSigningOut(true);
    signOut()
      .then(() => navigate("/auth/login"))
      .finally(() => setSigningOut(false));
  };

  return (
    <div className="flex justify-center flex-col text-center p-10 gap-3">
      <h1>Welcome</h1>
      <Button onClick={handleSignOut}>
        {signingOut ? <Spinner /> : "Logout"}
      </Button>
    </div>
  );
}
