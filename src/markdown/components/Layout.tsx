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
      <main className="flex-1 pb-20 md:pb-0">
        <div className="container-content">{children}</div>
      </main>
      {footer && (
        <footer className="footer">
          <div className="container-content footer-content">{footer}</div>
        </footer>
      )}
    </div>
  );
}
