import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { AuthAdapter } from "../contracts/AuthAdapter";
import type { SignInResult } from "../types/SignInResult";

type AuthContextType = {
  session: any | null;
  isLoading: boolean;
  signIn: (credentials: any) => Promise<SignInResult>;
  signUp: (data: any) => Promise<any>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
  adapter: AuthAdapter;
};

export function AuthProvider({ children, adapter }: AuthProviderProps) {
  const [session, setSession] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    adapter.getSession().then((initialSession) => {
      setSession(initialSession);
      setIsLoading(false);
    });

    const unsubscribe = adapter.onAuthStateChange((newSession) => {
      setSession(newSession);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [adapter]);

  const signIn = async (credentials: any) => {
    const data = await adapter.signIn(credentials);
    return data;
  };

  const signUp = async (data: any) => {
    const result = await adapter.signUp(data);
    return result;
  };

  const signOut = async () => {
    await adapter.signOut();
  };

  const resetPassword = async (email: string) => {
    await adapter.resetPassword(email);
  };

  const value = {
    session,
    isLoading,
    signIn,
    signUp,
    signOut,
    resetPassword,
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