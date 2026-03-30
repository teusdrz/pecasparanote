import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pecasparanote | Assistência Técnica Especializada",
  description: "Conserto de notebooks, computadores, TVs e impressoras na Vila Nhocuné, São Paulo. 16 anos de experiência e garantia total.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
