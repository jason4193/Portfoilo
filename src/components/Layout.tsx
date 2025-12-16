import React from "react";
import { Header } from "./Header";

interface LayoutProps {
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function Layout({ children, footer }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
      {footer && (
        <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-primary)] mt-auto">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-sm text-[var(--color-text-secondary)]">
            {footer}
          </div>
        </footer>
      )}
    </div>
  );
}
