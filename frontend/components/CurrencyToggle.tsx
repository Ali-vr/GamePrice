/**
 * Componente CurrencyToggle - Toggle compacto USD/ARS
 * Permite cambiar entre visualización de precios en USD o ARS estimado
 * NOTA: Conversión USD→ARS es mock por ahora, será Phase 11
 */

"use client";

import React from "react";

interface CurrencyToggleProps {
  value: "USD" | "ARS";
  onChange: (currency: "USD" | "ARS") => void;
}

export default function CurrencyToggle({
  value,
  onChange,
}: CurrencyToggleProps) {
  return (
    <div className="flex items-center gap-1 bg-bg-surface rounded-pill border border-text-soft px-1 py-0.5">
      <button
        onClick={() => onChange("USD")}
        className={`
          px-2 py-1 rounded text-xs font-bold transition-all
          ${
            value === "USD"
              ? "bg-accent text-white"
              : "bg-transparent text-text-soft hover:text-accent"
          }
        `}
        type="button"
      >
        USD
      </button>
      <button
        onClick={() => onChange("ARS")}
        className={`
          px-2 py-1 rounded text-xs font-bold transition-all
          ${
            value === "ARS"
              ? "bg-accent text-white"
              : "bg-transparent text-text-soft hover:text-accent"
          }
        `}
        type="button"
      >
        ARS
      </button>
    </div>
  );
}
