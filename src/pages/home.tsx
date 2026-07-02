import { Button, Spinner } from "@devmahmoudi/ui";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { type AuthenticatedUser } from "../types/AuthenticatedUser";

export default function Home() {
  const { signOut, getUser } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState<AuthenticatedUser | null>(null)
  const [signingOut, setSigningOut] = useState<boolean>(false);

  useEffect(() => {
    getUser().then(setUser)
  }, [getUser])

  const handleSignOut = () => {
    setSigningOut(true);
    signOut()
      .then(() => navigate("/auth/login"))
      .finally(() => setSigningOut(false));
  };

  return (
    <div className="flex justify-center flex-col text-center p-10 gap-3">
      <h1>Welcome</h1>
      {user && <h2>{user.email}</h2>}
      <Button onClick={handleSignOut}>
        {signingOut ? <Spinner /> : "Logout"}
      </Button>
    </div>
  );
}
