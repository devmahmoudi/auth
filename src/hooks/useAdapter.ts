import { AppBuilder, useAppBuilder } from "@devmahmoudi/core";
import { AuthUserManagementDecorator } from "../decorators/AuthUserManagementDecorator";
import { useMemo } from "react";
import { AuthAdapterToken, SharedUserManagementServiceToken, type AuthAdapter } from "@devmahmoudi/contracts/interfaces";

export function useAdapter(): AuthAdapter | undefined {
  const appBuilder = getAppBuilder();

  if (!appBuilder) return;

  const authAdapter = appBuilder.resolveInstance<AuthAdapter>(AuthAdapterToken);
  const userManagementService = appBuilder.getShared(
    SharedUserManagementServiceToken,
  );

  if (!authAdapter) return;

  const decoratedAdapter = useMemo(() => {
    if (!authAdapter) return undefined;

    return userManagementService
      ? new AuthUserManagementDecorator(authAdapter, userManagementService)
      : authAdapter;
  }, [authAdapter, userManagementService]);

  return decoratedAdapter;
}

function getAppBuilder(): AppBuilder | undefined {
  try {
    return useAppBuilder();
  } catch (error) {
    console.warn(
      "Auth module wasn't wrapped in AppProvider. So, auth adapter should pass directly through AuthProvider.",
      error,
    );
    return;
  }
}
