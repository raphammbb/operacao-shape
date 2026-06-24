import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Barriguinha?",
  description: "Os combinados do casal — desafio de 30 dias",
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/operacao-shape/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Barriguinha?" />
        <meta name="theme-color" content="#09090b" />
      </head>
      <body
        style={{
          margin: 0,
          backgroundColor: "#09090b",
          color: "#fafafa",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
