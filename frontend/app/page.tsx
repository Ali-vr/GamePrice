/**
 * Página de inicio de GamePrice
 * Muestra juegos con precios rediseñados en cards
 * MOCK DATA: Estructura lista para Phase 3 (backend real)
 */

import GameCard from "@/components/GameCard";
import HeroBlock from "@/components/HeroBlock";
import Button from "@/components/Button";
import { MOCK_GAMES } from "@/lib/mockGameData";

export default function Home() {
  // Separar juegos para diferentes secciones (mock)
  const bestDeals = MOCK_GAMES.slice(0, 3);
  const nearHistoricalLow = MOCK_GAMES.slice(1, 4);

  return (
    <div className="bg-bg-base">
      {/* Hero Section */}
      <section className="container-centered">
        <HeroBlock
          title="¿Me conviene comprar este juego ahora?"
          subtitle="GamePrice te ayuda a encontrar las mejores ofertas de videojuegos en Argentina, comparando precios entre tiendas y analizando el histórico de precios."
          cta={{ label: "Explorar Juegos", href: "/games" }}
        />
      </section>

      {/* Best Deals Section - Con GameCard rediseñado */}
      <section className="container-centered section-spacing border-t border-border">
        <div className="mb-12">
          <h2 className="text-display-sm text-accent mb-2">🔥 Mejores Ofertas</h2>
          <p className="text-text-soft">Juegos con descuentos especiales esta semana</p>
          <p className="text-text-soft text-xs mt-2">[Datos mock - Fase 3 traerá datos reales]</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bestDeals.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Button href="/deals" variant="ghost">
            Ver todas las ofertas →
          </Button>
        </div>
      </section>

      {/* Near Historical Low Section - Con GameCard rediseñado */}
      <section className="container-centered section-spacing border-t border-border">
        <div className="mb-12">
          <h2 className="text-display-sm text-accent mb-2">📉 Cerca del Mínimo Histórico</h2>
          <p className="text-text-soft">
            Estos juegos están muy cerca de su precio más bajo registrado
          </p>
          <p className="text-text-soft text-xs mt-2">[Tendencias mock - Fase 9 tendrá histórico real]</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nearHistoricalLow.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Button href="/historical-low" variant="ghost">
            Ver históricos completos →
          </Button>
        </div>
      </section>

      {/* Argentina Pricing Section - Info placeholder (Phase 11) */}
      <section className="container-centered section-spacing border-t border-border">
        <div className="mb-12">
          <h2 className="text-display-sm text-accent mb-2">🇦🇷 Precios Finales Argentina</h2>
          <p className="text-text-soft">Conversión a ARS con impuestos estimados (Fase 11)</p>
        </div>

        <div className="bg-bg-surface rounded-hero border border-border p-8 text-center">
          <p className="text-body mb-4">
            En Phase 11, los precios mostrarán automáticamente la conversión USD → ARS con
            impuestos estimados para Argentina.
          </p>
          <p className="text-text-soft text-sm">
            Por ahora, usa el toggle USD/ARS en las cards para ver conversión aproximada.
          </p>
        </div>
      </section>

      {/* Recommended for Your PC Section */}
      <section className="container-centered section-spacing pb-section-lg border-t border-border">
        <div className="mb-12">
          <h2 className="text-display-sm text-accent mb-2">
            🎮 Recomendado para tu PC
          </h2>
          <p className="text-text-soft">
            Juegos compatibles con tu hardware (configuración pendiente en Fase 14)
          </p>
        </div>

        <div className="bg-bg-surface rounded-hero border border-border p-8 text-center">
          <p className="text-body mb-4">
            Para ver juegos recomendados, primero necesitas registrar tu hardware.
          </p>
          <Button href="/my-pc" variant="primary">
            Configurar Mi PC
          </Button>
        </div>
      </section>
    </div>
  );
}
