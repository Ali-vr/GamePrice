/**
 * Componente GameCard - Card rediseñada para mostrar juego con precios por tienda
 * Incluye:
 * - Imagen de portada
 * - GamePrice Score badge (mock)
 * - Nombre del juego
 * - Tiles de precios para Steam, Epic, GOG, Microsoft (hasta 4 tiendas)
 * - Toggle USD/ARS
 * - Navegación a detail page o tienda
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { GamePriceData } from "@/lib/mockGameData";
import GameScoreBadge from "./GameScoreBadge";
import StorePriceTile from "./StorePriceTile";
import CurrencyToggle from "./CurrencyToggle";

interface GameCardProps {
  game: GamePriceData;
  className?: string;
}

export default function GameCard({ game, className = "" }: GameCardProps) {
  const [currency, setCurrency] = useState<"USD" | "ARS">("USD");

  // Encontrar el precio más bajo para destacar
  const lowestPrice = Math.min(...game.prices.map((p) => p.price));
  const lowestStoreId = game.prices.find((p) => p.price === lowestPrice)?.storeId;

  const handleStoreTileClick = (url?: string) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      className={`
        card relative overflow-hidden transition-transform hover:shadow-lg
        ${className}
      `}
    >
      {/* Contenedor de imagen con badge flotante */}
      <div className="relative">
        {/* Imagen de portada */}
        <Link href={`/games/${game.slug}`} className="block">
          <div className="relative aspect-video overflow-hidden rounded-card bg-bg-base">
            <Image
              src={game.coverImage}
              alt={game.title}
              fill
              className="object-cover transition-transform hover:scale-105 cursor-pointer"
            />
          </div>
        </Link>

        {/* Badge de GamePrice Score (esquina flotante) */}
        {game.gamePriceScore && (
          <GameScoreBadge
            emoji={game.gamePriceScore.emoji}
            label={game.gamePriceScore.label}
            rating={game.gamePriceScore.rating}
          />
        )}
      </div>

      {/* Contenido de la card */}
      <div className="space-y-3 p-4">
        {/* Título del juego */}
        <Link href={`/games/${game.slug}`}>
          <h3 className="text-body font-bold text-text hover:text-accent transition-colors cursor-pointer line-clamp-2">
            {game.title}
          </h3>
        </Link>

        {/* Descripción corta */}
        <p className="text-text-soft text-sm line-clamp-2">{game.description}</p>

        {/* Separador */}
        <hr className="border-border opacity-30" />

        {/* Sección de precios */}
        <div className="space-y-2">
          {/* Header: toggle de moneda */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-soft font-bold">Precios</span>
            <CurrencyToggle value={currency} onChange={setCurrency} />
          </div>

          {/* Grid de tiles de precios - máximo 4 tiendas */}
          <div className="grid grid-cols-2 gap-2">
            {game.prices.map((store) => (
              <StorePriceTile
                key={store.storeId || store.store}
                store={store}
                isLowest={store.storeId === lowestStoreId && store.price === lowestPrice}
                currency={currency}
                onClick={() => handleStoreTileClick(store.storeUrl)}
              />
            ))}
          </div>
        </div>

        {/* Footer: link a página de detalle */}
        <Link
          href={`/games/${game.slug}`}
          className="text-xs text-text-soft hover:text-accent transition-colors inline-block mt-2"
        >
          Ver detalles completos →
        </Link>
      </div>
    </div>
  );
}
