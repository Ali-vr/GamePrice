/**
 * Componente GameScoreBadge - Badge flotante en esquina de card
 * Muestra el GamePrice Score (excelente, buena, normal, esperar)
 * NOTA: Mock por ahora, será reemplazado por cálculo real en Phase 10
 */

import React from "react";

interface GameScoreBadgeProps {
  emoji: string;
  label: string;
  rating: "excelente" | "buena" | "normal" | "esperar";
}

export default function GameScoreBadge({
  emoji,
  label,
  rating,
}: GameScoreBadgeProps) {
  const getColor = () => {
    switch (rating) {
      case "excelente":
        return "bg-green-600 text-white";
      case "buena":
        return "bg-green-500 text-white";
      case "normal":
        return "bg-yellow-600 text-white";
      case "esperar":
        return "bg-red-600 text-white";
      default:
        return "bg-text-soft text-bg-base";
    }
  };

  return (
    <div
      className={`
        absolute top-3 right-3 z-10
        flex items-center gap-1 px-2 py-1 rounded-pill
        ${getColor()}
        text-xs font-bold
        shadow-lg
        backdrop-blur-sm
      `}
    >
      <span>{emoji}</span>
      <span className="hidden sm:inline">{label}</span>
    </div>
  );
}
