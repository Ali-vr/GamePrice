# Frontend — GamePrice

**Estado:** Fase 4 extendida — GameCard rediseñada con precios por tienda.

## Rutas

```
/                → Inicio (hero + secciones con GameCard)
/games           → Listado de juegos
/games/[slug]    → Página de videojuego
/deals           → Ofertas
/historical-low  → Juegos cerca del mínimo histórico
/login           → Iniciar sesión
/register        → Registrarse
/profile         → Perfil de usuario
/wishlist        → Wishlist
/my-pc           → Configuración de hardware
/alerts          → Alertas de precio
```

## Estructura de Componentes

### Base UI Components
- **Navigation** — Barra sticky top (negra), logo, links, auth buttons
- **Button** — Primary (filled, red) y Ghost (outlined, white), 15px border-radius
- **Card** — Surface burgundy, border negro, 12px radius (componente genérico)
- **FilterPill** — Estado inactive/active, toggle estilo filtro
- **HeroBlock** — Título display grande, subtítulo, CTA

### Game Card Components (Fase 4 extendida)
- **GameCard** — Card rediseñada para mostrar juego con precios
  - Imagen de portada (aspect-video, con hover zoom)
  - Badge de GamePrice Score (esquina flotante, emoji + label)
  - Título del juego (clickeable a /games/[slug])
  - Descripción corta (2 líneas máximo)
  - Toggle de moneda USD/ARS (compacto, top-right de sección precios)
  - Grid 2x2 de StorePriceTile (máximo 4 tiendas: Steam, Epic, GOG, Microsoft)
  - Link "Ver detalles completos" al final

- **StorePriceTile** — Tile compacto de precio de tienda
  - Nombre de tienda (abbreviado en mobile)
  - Precio y descuento %
  - Indicador de tendencia (mock: ↑ ↓ →) al hover
  - Estado "lowest" destaca con border/fill rojo (accent)
  - Clickeable directo a URL de tienda (window.open)

- **GameScoreBadge** — Badge flotante de GamePrice Score
  - Emoji + label
  - Colores según rating: excelente (verde), buena (verde), normal (amarillo), esperar (rojo)
  - Posicionado top-right sobre imagen
  - Responsive: label hidden en mobile

- **CurrencyToggle** — Toggle USD/ARS compacto
  - Dos botones pequeños (USD / ARS)
  - Active state con background accent
  - Conversión USD→ARS es mock (Phase 11 tendrá real con impuestos)

### Layout
- **Sticky navigation** (top)
- **Centered content** (max-width: 1280px)
- **Full-bleed dark canvas** (bg-base)

## Design Tokens (CSS Custom Properties)

```css
--color-bg-base: #260212       /* Canvas background */
--color-bg-surface: #4f0423    /* Card/section surface */
--color-accent: #e10600        /* CTA, active states, lowest price highlight */
--color-text-soft: #ffc7c6     /* Soft text, inactive states */
--color-border: #000000        /* Hairline borders, nav */
--color-text: #ffffff          /* Default text on dark */
```

## Typography

- **Display headings:** Archivo Expanded / Oswald (64–160px, weight 700, uppercase, line-height 0.75–0.85)
- **Body/UI:** Inter (14–18px, weight 400–500, line-height 1.4)
- **Reserved:** Accent red (#e10600) only for CTAs, active toggles, lowest prices — never body text

## Tailwind Configuration

Extendido con:
- Colores customizados (design tokens)
- Tamaños de fuente display (display-lg, display-md, display-sm)
- Border radius customizados (nav: 15px, card: 12px, hero: 38px)
- Max-width content (1280px)
- Spacing sections (56px/64px)

Ver `frontend/tailwind.config.ts`.

## Homepage (`/`)

- **Hero section:** Título principal + subtitle + CTA
- **"🔥 Mejores Ofertas"** → Grid 3 columnas (GameCard con datos mock)
- **"📉 Mínimo Histórico"** → Grid 3 columnas (GameCard con tendencias mock)
- **"🇦🇷 Precios Finales Argentina"** → Info placeholder (Phase 11)
- **"🎮 Recomendado para tu PC"** → CTA a `/my-pc`

## Datos Mock (Fase 4 extendida)

### Estructura de GamePriceData
Definida en `frontend/lib/mockGameData.ts`, estructura lista para Phase 3 (backend real):

```typescript
interface GamePriceData {
  id: string;
  title: string;
  slug: string;
  coverImage: string;
  description: string;
  gamePriceScore: {
    label: string;        // "Buena oferta", "Excelente oferta", etc.
    rating: "excelente" | "buena" | "normal" | "esperar";
    emoji: string;        // "🟢", "🔴", "🟡"
  };
  prices: StorePriceData[];
}

interface StorePriceData {
  store: string;        // "Steam", "Epic Games", "GOG", "Microsoft Store"
  storeId: string;      // "steam", "epic", "gog", "microsoft"
  price: number;        // Precio en moneda original
  currency: "ARS" | "USD";
  discountPercent: number;
  normalPrice?: number;
  storeUrl?: string;    // URL de tienda (clickeable en StorePriceTile)
  trend?: "up" | "down" | "flat";  // MOCK, Phase 9 tendrá histórico real
}
```

### Datos Mock Actuales (4 juegos)
1. **Elden Ring** — Buena oferta (🟢)
2. **Baldur's Gate 3** — Excelente oferta (🟢)
3. **The Witcher 3** — Conviene esperar (🔴)
4. **Cyberpunk 2077** — Normal (🟡)

Cada juego incluye precios en 4 tiendas (Steam ARS, Epic USD, GOG USD, Microsoft USD) con descuentos variados.

## Mock vs. Real Data (Roadmap)

| Aspecto | Ahora (Fase 4) | Fase 3/6 | Fase 9 | Fase 11 |
|--------|---|---|---|---|
| **Precios por tienda** | Mock | Real (API Phase 3) | Real | Real |
| **Tendencias (↑↓→)** | Mock | Mock | Real histórico | Real histórico |
| **GamePrice Score** | Mock values | Mock | Mock | Real (Phase 10) |
| **Conversión USD→ARS** | Mock (1015 tipo) | Mock | Mock | Real con impuestos |

## Componentes Genéricos aún disponibles

- **Card** — Card genérica (no juego), aún usable para otros tipos de contenido
- **Button** — Link o button con variantes
- **FilterPill** — Para filtros (usado en futuras páginas)

## Instalación & Build

```bash
# Dev
npm install
npm run dev        # http://localhost:3000

# Build
npm run build
npm start          # Production mode

# Docker
docker compose up frontend
```

## Próximos Pasos (Fase 5+)

- **Fase 5:** Modelos PostgreSQL para games, prices, stores
- **Fase 6:** Conectar frontend a `/api/games/search-prices` (reemplazar mock por datos reales)
- **Fase 7:** Página de detalle de juego
- **Fase 8:** Lógica de tiendas
- **Fase 9:** Histórico de precios y tendencias reales
- **Fase 10:** GamePrice Score real
- **Fase 11:** Conversión USD→ARS con impuestos estimados

## Notas de Desarrollo

- Todos los componentes usan `"use client"` para interactividad (toggle, hover trend)
- StorePriceTile puede abrirse en nueva pestaña (target="_blank") si tiene storeUrl
- GameCard es responsivo: grid 2x2 de precios en mobile, puede ajustarse si es necesario
- No hay iconos oficiales de tiendas (licensing), usando texto abbreviado en su lugar
- Conversión USD→ARS es placer hardcoded (1015) en `StorePriceTile.tsx`, fácil de reemplazar

