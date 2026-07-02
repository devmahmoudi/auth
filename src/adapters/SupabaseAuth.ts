import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { AuthAdapter } from "../contracts/AuthAdapter";
import type { SignInResult } from "../types/SignInResult";
import type { AuthenticatedUser } from "../types/AuthenticatedUser";

export default class SupabaseAuth implements AuthAdapter {
  private client: SupabaseClient;

  constructor(url: string, anonKey: string) {
    this.client = createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storage:
          typeof window !== "undefined" ? window.localStorage : undefined,
      },
      global: {
        headers: {
          apikey: anonKey,
        },
      },
    });
  }

  async getUser(): Promise<AuthenticatedUser | null> {
    const {
      data: { user },
      error,
    } = await this.client.auth.getUser();

    if (error) 
      return null;

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email ?? "",
    };
  }

  async signIn(credentials: {
    email: string;
    password: string;
  }): Promise<SignInResult> {
    const { data, error } = await this.client.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) {
      return {
        succeed: false,
        error: error.message,
      };
    }

    return {
      succeed: true,
      data,
    };
  }

  async signUp(data: {
    email: string;
    password: string;
    options?: any;
  }): Promise<any> {
    const { data: result, error } = await this.client.auth.signUp({
      email: data.email,
      password: data.password,
      options: data.options,
    });

    if (error) throw error;
    return result;
  }

  async signOut(): Promise<void> {
    const { error } = await this.client.auth.signOut();
    if (error) throw error;
  }

  async resetPassword(email: string): Promise<void> {
    const { error } = await this.client.auth.resetPasswordForEmail(email);
    if (error) throw error;
  }

  async getSession(): Promise<any | null> {
    const {
      data: { session },
      error,
    } = await this.client.auth.getSession();
    if (error) throw error;
    return session;
  }

  onAuthStateChange(callback: (session: any | null) => void): () => void {
    const {
      data: { subscription },
    } = this.client.auth.onAuthStateChange((_event, session) => {
      callback(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }
}
