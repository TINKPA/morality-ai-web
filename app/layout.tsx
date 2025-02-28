// app/layout.tsx
import "./globals.css";
import React from "react";
import ClientProviders from "../components/ClientProviders";
import Navbar from "../components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Morality-AI-Web</title>
      </head>
      <body>
        <ClientProviders>
          <Navbar />
          <main>
            {children}
          </main>
        </ClientProviders>
      </body>
    </html>
  );
}