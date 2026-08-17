# Frontend — GamePrice

**Estado:** Fase 4 completada — Estructura inicial implementada.

## Rutas

```
/                → Inicio (hero + secciones placeholder)
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
- **Card** — Surface burgundy, border negro, 12px radius, para grillas de juegos
- **FilterPill** — Estado inactive/active, toggle estilo filtro
- **HeroBlock** — Título display grande, subtítulo, CTA

### Layout
- **Sticky navigation** (top)
- **Centered content** (max-width: 1280px)
- **Full-bleed dark canvas** (bg-base)

## Design Tokens (CSS Custom Properties)

```css
--color-bg-base: #260212       /* Canvas background */
--color-bg-surface: #4f0423    /* Card/section surface */
--color-accent: #e10600        /* CTA, active states, prices */
--color-text-soft: #ffc7c6     /* Soft text, inactive states */
--color-border: #000000        /* Hairline borders, nav */
--color-text: #ffffff          /* Default text on dark */
```

## Typography

- **Display headings:** Archivo Expanded / Oswald (64–160px, weight 700, uppercase, line-height 0.75–0.85)
- **Body/UI:** Inter (14–18px, weight 400–500, line-height 1.4)
- **Reserved:** Accent red (#e10600) only for CTAs, active toggles, prices — never body text

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
- **"🔥 Mejores Ofertas"** → Grid de 3 cards (mock, placeholder)
- **"📉 Mínimo Histórico"** → Grid de 3 cards (mock, placeholder)
- **"🇦🇷 Mejores Precios Argentina"** → Grid de 2 cards (USD → ARS conversion)
- **"🎮 Recomendado para tu PC"** → CTA a `/my-pc`

Todo contenido está marcado como placeholder/mock, se reemplazará en Fase 6+.

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

- Fase 5: Modelos PostgreSQL y migraciones
- Fase 6: Comunicación frontend ↔ backend
- Fase 7+: Implementar lógica real de juegos, precios, usuarios, etc.

No hay backend calls en esta fase. Todas las páginas renderizan contenido estático/mock.
