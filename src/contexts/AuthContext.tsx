import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { AuthAdapter } from "../contracts/AuthAdapter";
import type { SignInResult } from "../types/SignInResult";
import type { AuthenticatedUser } from "../types/AuthenticatedUser";

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
  adapter: AuthAdapter;
};

export function AuthProvider({ children, adapter }: AuthProviderProps) {
  const [session, setSession] = useState<any | null>(null);
  const [user, setUser] = useState<AuthenticatedUser | undefined>();
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

  useEffect(() => {
    if(session)
      getUser().then((user) => setUser(user ?? undefined))
  }, [session])

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

  const getUser = async () => {
    return await adapter.getUser()
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