import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Operação Shape",
  description: "Dashboard de acompanhamento de emagrecimento do casal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          margin: 0,
          backgroundColor: "#09090b",
          color: "#fafafa",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <Header />
        <main style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1.5rem" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
