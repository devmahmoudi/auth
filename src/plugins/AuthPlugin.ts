import { AuthAdapterToken, SharedAuthServiceToken, type AuthAdapter, type Plugin, type IAppBuilder } from "@devmahmoudi/contracts/interfaces";

export class AuthPlugin implements Plugin {
  id: string = "auth-plugin";

  private adapter: AuthAdapter;

  constructor(adapter: AuthAdapter) {
    this.adapter = adapter;
  }

  setup(builder: IAppBuilder): void | Promise<void> {
    builder.setShared(SharedAuthServiceToken, this.adapter);

    builder.registerInstance(AuthAdapterToken, this.adapter);
  }

  beforeRegister?(builder: IAppBuilder): void {
    return;
  }
  afterRegister?(builder: IAppBuilder): void {
    return;
  }
}
