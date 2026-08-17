"use client";

import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 bg-border">
      <div className="container-centered flex items-center justify-between h-16">
        <Link href="/" className="text-display-sm text-accent font-bold">
          GAMEPRICE
        </Link>

        <div className="flex items-center gap-8">
          <Link
            href="/games"
            className="text-body font-medium hover:text-accent transition-colors"
          >
            Juegos
          </Link>
          <Link
            href="/deals"
            className="text-body font-medium hover:text-accent transition-colors"
          >
            Ofertas
          </Link>
          <Link
            href="/historical-low"
            className="text-body font-medium hover:text-accent transition-colors"
          >
            Mínimo histórico
          </Link>
          <Link
            href="/my-pc"
            className="text-body font-medium hover:text-accent transition-colors"
          >
            Mi PC
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login" className="btn-ghost text-sm">
            Login
          </Link>
          <Link href="/register" className="btn-primary text-sm">
            Registrarse
          </Link>
        </div>
      </div>
    </nav>
  );
}
