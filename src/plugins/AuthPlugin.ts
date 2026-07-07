import type { AppBuilder, Plugin } from "@devmahmoudi/core";
import { SharedAuthServiceToken } from "../contracts/SharedAuthService";
import { AuthAdapterToken, type AuthAdapter } from "../contracts/AuthAdapter";

export class AuthPlugin implements Plugin {
  id: string = "auth-plugin";

  private adapter: AuthAdapter;

  constructor(adapter: AuthAdapter) {
    this.adapter = adapter;
  }

  setup(builder: AppBuilder): void | Promise<void> {
    builder.setShared(SharedAuthServiceToken, this.adapter);

    builder.registerInstance(AuthAdapterToken, this.adapter);
  }

  beforeRegister?(builder: AppBuilder): void {
    return;
  }
  afterRegister?(builder: AppBuilder): void {
    return;
  }
}
