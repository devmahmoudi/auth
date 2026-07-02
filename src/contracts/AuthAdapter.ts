import type { SignInResult } from "../types/SignInResult";

export interface AuthAdapter {
  signIn(credentials: any): Promise<SignInResult>;
  signUp(data: any): Promise<any>;
  signOut(): Promise<void>;
  resetPassword(email: string): Promise<void>;
  getSession(): Promise<any | null>;
  onAuthStateChange(callback: (session: any | null) => void): () => void;
}