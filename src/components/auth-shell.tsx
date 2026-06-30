import type { ReactNode } from "react";

type AuthShellProps = {
  title?: string;
  children: ReactNode;
};

export function AuthShell({ title, children }: AuthShellProps) {
  return (
    <main className="grid min-h-screen">
      <section className="order-1 flex min-h-screen items-center justify-center px-4 py-8 sm:px-8 lg:order-2">
        <div className="surface-card w-full max-w-xl rounded-[2rem] border border-border/70 bg-card/94 p-6 shadow-card sm:p-8">
          {title && (
            <div className="mb-8 flex items-start justify-between gap-4">
              <div className="space-y-3">
                <div>
                  <h2 className="text-3xl font-black leading-[1.6]">{title}</h2>
                </div>
              </div>
            </div>
          )}
          {children}
        </div>
      </section>
    </main>
  );
}
