import Card from "@/components/Card";
import HeroBlock from "@/components/HeroBlock";
import Button from "@/components/Button";

export default function Home() {
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

      {/* Best Deals Section */}
      <section className="container-centered section-spacing border-t border-border">
        <div className="mb-12">
          <h2 className="text-display-sm text-accent mb-2"> Mejores Ofertas</h2>
          <p className="text-text-soft">Juegos con descuentos especiales esta semana</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Mock Cards - Clearly labeled as placeholder */}
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <div className="aspect-video bg-bg-base rounded-card mb-4 flex items-center justify-center border border-text-soft">
                <p className="text-text-soft text-sm">Imagen del juego #{i}</p>
              </div>
              <h3 className="text-body font-bold mb-2">Juego de Ejemplo #{i}</h3>
              <p className="text-text-soft text-sm mb-4">
                Este es contenido mock. Se reemplazará con datos reales en Fase 6.
              </p>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-accent font-bold">$1,299</span>
                <span className="text-text-soft line-through text-sm">$1,999</span>
              </div>
              <Button href="/games/ejemplo" className="w-full">
                Ver Detalles
              </Button>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button href="/deals" variant="ghost">
            Ver todas las ofertas →
          </Button>
        </div>
      </section>

      {/* Near Historical Low Section */}
      <section className="container-centered section-spacing border-t border-border">
        <div className="mb-12">
          <h2 className="text-display-sm text-accent mb-2">📉 Cerca del Mínimo Histórico</h2>
          <p className="text-text-soft">
            Estos juegos están muy cerca de su precio más bajo registrado
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Mock Cards */}
          {[4, 5, 6].map((i) => (
            <Card key={i}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-body font-bold">Juego #{i}</h3>
                <span className="text-accent text-xs font-bold bg-accent bg-opacity-20 px-2 py-1 rounded">
                  -8% del mín.
                </span>
              </div>
              <p className="text-text-soft text-sm mb-4">
                Contenido mock. Datos reales en Fase 6+.
              </p>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-soft">Precio actual:</span>
                  <span className="font-bold">$499</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-soft">Histórico mín:</span>
                  <span className="font-bold text-accent">$459</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button href="/historical-low" variant="ghost">
            Ver históricos completos →
          </Button>
        </div>
      </section>

      {/* Best Prices for Argentina Section */}
      <section className="container-centered section-spacing border-t border-border">
        <div className="mb-12">
          <h2 className="text-display-sm text-accent mb-2">🇦🇷 Mejores Precios para Argentina</h2>
          <p className="text-text-soft">Precios finales en ARS incluyendo impuestos estimados</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[7, 8].map((i) => (
            <Card key={i} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-body font-bold mb-1">Juego de Ejemplo #{i}</h3>
                  <p className="text-text-soft text-sm">Steam / Epic</p>
                </div>
                <span className="text-accent font-bold">Mejor Precio</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-soft">Precio en USD:</span>
                  <span>$19.99</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-soft">Conversión:</span>
                  <span>$19,290</span>
                </div>
                <div className="flex justify-between border-t border-border pt-2 mt-2">
                  <span className="text-text-soft font-bold">Total ARS (est.):</span>
                  <span className="text-accent font-bold">$32,155</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Recommended for Your PC Section */}
      <section className="container-centered section-spacing pb-section-lg border-t border-border">
        <div className="mb-12">
          <h2 className="text-display-sm text-accent mb-2">
             Recomendado para tu PC
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
