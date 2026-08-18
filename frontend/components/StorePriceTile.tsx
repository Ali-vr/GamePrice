/**
 * Componente StorePriceTile - Tile individual de precio de tienda
 * Muestra tienda, precio, descuento y tendencia (mock)
 */

"use client";

import React, { useState } from "react";
import { StorePriceData } from "@/lib/mockGameData";

interface StorePriceTileProps {
  store: StorePriceData;
  isLowest: boolean;
  currency: "USD" | "ARS";
  onTrendHover?: (storeId: string, show: boolean) => void;
  onClick?: () => void;
}

/**
 * Función mock para convertir USD a ARS
 * NOTA: Será reemplazada en Phase 11 por servicio real de conversión con impuestos
 */
function convertUSDtoARS(usd: number): number {
  // Mock: tipo de cambio aproximado (Phase 11 tendrá tasa real)
  const MOCK_EXCHANGE_RATE = 1015;
  return Math.round(usd * MOCK_EXCHANGE_RATE);
}

export default function StorePriceTile({
  store,
  isLowest,
  currency,
  onTrendHover,
  onClick,
}: StorePriceTileProps) {
  const [showTrend, setShowTrend] = useState(false);

  const displayPrice =
    currency === "ARS" && store.currency === "USD"
      ? convertUSDtoARS(store.price)
      : store.price;

  const currencySymbol = currency === "ARS" ? "$" : "$";
  const currencyLabel = currency === "ARS" ? "ARS" : "USD";

  // Iconos de tendencia (mock)
  const trendIcons: Record<string, string> = {
    up: "↑",
    down: "↓",
    flat: "→",
  };

  const trendColors: Record<string, string> = {
    up: "text-red-400",
    down: "text-green-400",
    flat: "text-text-soft",
  };

  const handleHover = (isHovering: boolean) => {
    setShowTrend(isHovering);
    if (onTrendHover) {
      onTrendHover(store.storeId || store.store, isHovering);
    }
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      className={`
        flex items-center gap-2 px-3 py-2 rounded-pill transition-all
        ${
          isLowest
            ? "bg-accent border border-accent text-white"
            : "bg-transparent border border-text-soft text-text-soft hover:border-accent hover:text-accent"
        }
      `}
      type="button"
    >
      {/* Nombre de tienda + icono de tendencia */}
      <div className="flex items-center gap-1 min-w-0">
        <span className="text-xs font-bold truncate">
          {store.store.split(" ")[0]}
        </span>
        {showTrend && store.trend && (
          <span className={`text-xs ${trendColors[store.trend]}`}>
            {trendIcons[store.trend]}
          </span>
        )}
      </div>

      {/* Separador */}
      <span className="text-opacity-50">•</span>

      {/* Precio */}
      <div className="flex items-baseline gap-1 min-w-0">
        <span className="text-sm font-bold">
          {currencySymbol}
          {Math.round(displayPrice).toLocaleString()}
        </span>
        {store.discountPercent > 0 && (
          <span className="text-xs font-bold text-accent">
            -{store.discountPercent}%
          </span>
        )}
      </div>
    </button>
  );
}
