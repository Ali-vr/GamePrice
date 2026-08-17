import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "GamePrice 🇦🇷",
  description: "Comparador de precios y asesor de compra de videojuegos para Argentina",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
