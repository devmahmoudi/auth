import type { AuthAdapter, SharedUserManagementService } from "@devmahmoudi/contracts/interfaces";
import type { AuthenticatedUser, SignInResult } from "@devmahmoudi/contracts/types";

export class AuthUserManagementDecorator implements AuthAdapter {
  private adapter;
  private userManagementService;

  constructor(
    adapter: AuthAdapter,
    userManagementService: SharedUserManagementService,
  ) {
    this.adapter = adapter;
    this.userManagementService = userManagementService;
  }

  signIn(credentials: any): Promise<SignInResult> {
    return this.adapter.signIn(credentials);
  }

  async signUp(data: any): Promise<any> {
    let createdUser;

    try {
      createdUser = await this.userManagementService.createUser({
        name: data.email,
        ...data,
      });

      return await this.adapter.signUp(data);
    } catch (error) {
      if (createdUser) this.userManagementService.deleteUser(createdUser.id);

      console.error("Auth account creation failed", {
        error,
        email: createdUser?.email,
      });

      throw new Error("Unable to sign up user account. Please try again.");
    }
  }
  signOut(): Promise<void> {
    return this.adapter.signOut();
  }
  resetPassword(email: string): Promise<void> {
    return this.adapter.resetPassword(email);
  }
  getSession(): Promise<any | null> {
    return this.adapter.getSession();
  }
  onAuthStateChange(callback: (session: any | null) => void): () => void {
    return this.adapter.onAuthStateChange(callback);
  }
  getUser(): Promise<AuthenticatedUser | null> {
    return this.adapter.getUser();
  }
  deleteAccount(email: string): Promise<boolean> {
    return this.adapter.deleteAccount(email);
  }
}
