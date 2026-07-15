import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useAdapter } from "../hooks/useAdapter";
import type { AuthenticatedUser, SignInResult } from "@devmahmoudi/contracts/types";
import type { AuthAdapter } from "@devmahmoudi/contracts/interfaces";

type AuthContextType = {
  session: any | null;
  isLoading: boolean;
  user: AuthenticatedUser | undefined;
  signIn: (credentials: any) => Promise<SignInResult>;
  signUp: (data: any) => Promise<any>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  getUser: () => Promise<AuthenticatedUser | null>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
  adapter?: AuthAdapter;
};

export function AuthProvider({ children, adapter }: AuthProviderProps) {
  const [session, setSession] = useState<any | null>(null);
  const [user, setUser] = useState<AuthenticatedUser | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const authAdapter: AuthAdapter|undefined = useAdapter() ?? adapter;

  if(!authAdapter)
    throw new Error("AuthAdapter should be passed through either the AuthProvider argument or AppProvider with AuthPlugin")

  useEffect(() => {
    authAdapter.getSession().then((initialSession) => {
      setSession(initialSession);
      setIsLoading(false);
    });

    const unsubscribe = authAdapter.onAuthStateChange((newSession) => {
      setSession(newSession);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [authAdapter]);

  useEffect(() => {
    if(session)
      getUser().then((user) => setUser(user ?? undefined))
  }, [session])

  const signIn = async (credentials: any) => {
    const data = await authAdapter.signIn(credentials);
    return data;
  };

  const signUp = async (data: any) => {
    const result = await authAdapter.signUp(data);
    return result;
  };

  const signOut = async () => {
    await authAdapter.signOut();
  };

  const resetPassword = async (email: string) => {
    await authAdapter.resetPassword(email);
  };

  const getUser = async () => {
    return await authAdapter.getUser()
  }

  const value = {
    session,
    isLoading,
    user,
    signIn,
    signUp,
    signOut,
    resetPassword,
    getUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
}