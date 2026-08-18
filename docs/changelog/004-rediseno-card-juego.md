# Changelog — Fase 4 Extendida: Rediseño de GameCard con Precios por Tienda

**Fecha:** 2026-08-17
**Fase:** 4 (extendida - Game Card Redesign)
**Estado:** ✅ Completada

## Objetivo

Rediseñar el componente Card genérico para mostrar precios consolidados por tienda (Steam, Epic Games, GOG, Microsoft Store) en lugar de un botón genérico "Ver Detalles". La estructura de datos está lista para recibir datos reales de Phase 3 (backend con integraciones).

## Cambios Principales

### 1. Nuevo Componente GameCard
- ✅ `components/GameCard.tsx` — Card rediseñada para juegos
- ✅ Imagen de portada con hover zoom
- ✅ Badge flotante de GamePrice Score (esquina superior derecha)
- ✅ Título clickeable a página de detalle (/games/[slug])
- ✅ Descripción corta (máximo 2 líneas)
- ✅ Sección de precios con:
  - Toggle USD/ARS compacto (header de sección)
  - Grid 2x2 de tiles de precios (hasta 4 tiendas)
  - Tienda más barata destacada en rojo (accent color)
  - Descuentos mostrados en cada tile
  - Link "Ver detalles completos" al final

### 2. Componentes Auxiliares

**StorePriceTile.tsx**
- ✅ Tile compacto para mostrar precio de tienda
- ✅ Nombre de tienda (abbreviado en mobile)
- ✅ Precio y porcentaje de descuento
- ✅ Indicador de tendencia al hover (mock: ↑ ↓ →)
- ✅ Estado "lowest" con border/fill accent
- ✅ Click directo a URL de tienda (window.open)
- ✅ Responsivo

**GameScoreBadge.tsx**
- ✅ Badge flotante (posición absolute top-right)
- ✅ Emoji + label
- ✅ Colores según rating:
  - Excelente: verde oscuro
  - Buena: verde
  - Normal: amarillo/oro
  - Esperar: rojo
- ✅ Label oculto en mobile (solo emoji)

**CurrencyToggle.tsx**
- ✅ Toggle compacto USD/ARS
- ✅ Dos botones pequeños
- ✅ Active state con background accent
- ✅ Estilos hover

### 3. Datos Mock Estructurados

**lib/mockGameData.ts**
- ✅ Interfaz `GamePriceData` — estructura lista para Phase 3
- ✅ Interfaz `StorePriceData` — formato unificado (Phase 3 backend)
- ✅ 4 juegos mock con datos realistas:
  - Elden Ring (Steam ARS + 3 tiendas USD, 🟢 Buena oferta)
  - Baldur's Gate 3 (Steam ARS + 3 tiendas USD, 🟢 Excelente oferta)
  - The Witcher 3 (Steam ARS + 3 tiendas USD, 🔴 Conviene esperar)
  - Cyberpunk 2077 (Steam ARS + 3 tiendas USD, 🟡 Normal)
- ✅ Cada juego con precios variados, descuentos, tendencias (mock)
- ✅ URLs de tiendas incluidas (clickeable)
- ✅ Estructura lista para reemplazar con datos Phase 3

### 4. Homepage Actualizada

**app/page.tsx**
- ✅ Importa MOCK_GAMES desde lib/mockGameData
- ✅ Dos secciones principales usan GameCard:
  - Mejores Ofertas (primeros 3 juegos)
  - Mínimo Histórico (juegos 2-4 rotados)
- ✅ Labels claros de [Datos mock]
- ✅ Sección Argentina info placeholder (Phase 11)
- ✅ "Ver todas las ofertas" link a /deals

### 5. Documentación

**docs/frontend/overview.md**
- ✅ Actualizado con GameCard y componentes auxiliares
- ✅ Explicación de estructura de datos (GamePriceData, StorePriceData)
- ✅ Tabla de roadmap (qué es mock ahora vs. real en futuro)
- ✅ Notas sobre responsividad
- ✅ Próximos pasos hasta Phase 11

## Archivos Creados/Modificados

### Creados
```
frontend/
├── lib/
│   └── mockGameData.ts (nuevo)
├── components/
│   ├── GameCard.tsx (nuevo)
│   ├── StorePriceTile.tsx (nuevo)
│   ├── GameScoreBadge.tsx (nuevo)
│   └── CurrencyToggle.tsx (nuevo)
└── app/
    └── page.tsx (modificado)

docs/
└── frontend/
    └── overview.md (modificado)
```

### Modificados
- `frontend/app/page.tsx` — Reemplazado con GameCard mock data
- `docs/frontend/overview.md` — Documentación completa

## Problemas Encontrados

**Ninguno.** La migración de Card genérica a GameCard específica fue suave. Estructura de datos se alinea perfectamente con lo que Phase 3 backend espera.

## Solución Aplicada

Separación clara:
- **GameCard** — Componente específico para juegos con precios
- **Card** — Card genérica sigue disponible para otros contenidos
- **StorePriceTile, GameScoreBadge, CurrencyToggle** — Componentes reutilizables
- **mockGameData** — Datos centralizados, fácil de reemplazar con API en Phase 6

## Aspectos Clave del Rediseño

### Layout (Responsive)
- Desktop: Grilla 3 columnas (GameCard toma 1 columna completa)
- Tablet: Grilla 2 columnas
- Mobile: Grilla 1 columna
- Precio tiles: 2x2 grid (4 tiendas: Steam, Epic, GOG, Microsoft)

### Interactividad
- **Click en imagen/título** → Navega a /games/[slug]
- **Click en StorePriceTile** → Abre URL de tienda en nueva pestaña
- **Hover en StorePriceTile** → Muestra indicador de tendencia (↑ ↓ →)
- **Toggle USD/ARS** → Cambia visualización de precios en card

### Visual Hierarchy
- Tienda más barata: **border + fill rojo accent** (#e10600)
- Tiendas normales: **border + texto blush** (#ffc7c6)
- Badge score: **esquina flotante**, colores según rating
- Descuentos: **texto accent**, porcentaje visible

### Datos Mock (Claramente marcados)

| Dato | Tipo | Replaceable en |
|------|------|---|
| Precios | Mock | Phase 3 (backend real) |
| Tendencias (↑↓→) | Mock | Phase 9 (histórico real) |
| GamePrice Score | Mock | Phase 10 (cálculo real) |
| Conversión USD→ARS | Mock (1015 tipo) | Phase 11 (conversión real + impuestos) |

Función de conversión mock aislada en `StorePriceTile.tsx` → fácil swap en Phase 11.

## Datos Mock Utilizados

### Elden Ring
```
Steam Argentina: $4.999 ARS (0% descuento)
Epic Games: $34.99 USD (12% descuento)
GOG: $39.99 USD (0% descuento)
Microsoft: $39.99 USD (0% descuento)
Lowest: Epic Games ($34.99 USD) → highlighted red
```

### Baldur's Gate 3
```
Steam Argentina: $7.699 ARS (0% descuento)
Epic Games: $59.99 USD (0% descuento)
GOG: $59.99 USD (10% descuento)
Microsoft: $59.99 USD (0% descuento)
Lowest: GOG ($59.99 USD, -10%) → highlighted red
```

### The Witcher 3
```
Steam Argentina: $2.499 ARS (60% descuento)
Epic Games: $14.99 USD (60% descuento)
GOG: $9.99 USD (75% descuento) → LOWEST
Microsoft: $19.99 USD (50% descuento)
Lowest: GOG ($9.99 USD, -75%) → highlighted red
```

### Cyberpunk 2077
```
Steam Argentina: $3.999 ARS (0% descuento)
Epic Games: $29.99 USD (25% descuento) → LOWEST
GOG: $29.99 USD (25% descuento)
Microsoft: $39.99 USD (0% descuento)
Lowest: Epic / GOG tie ($29.99 USD, -25%) → first one highlighted red
```

## QA Manual

- ✅ GameCard renderiza sin errores
- ✅ Imágenes cargan correctamente
- ✅ Badge de score posicionado correctamente (esquina flotante)
- ✅ Toggle USD/ARS funciona (cambia visualización)
- ✅ StorePriceTile más bajo destaca en rojo
- ✅ Hover en tile muestra indicador de tendencia
- ✅ Click en título/imagen navega a /games/[slug]
- ✅ Click en StorePriceTile abre URL en nueva pestaña
- ✅ Responsive en mobile/tablet/desktop
- ✅ Datos mock claramente etiquetados en página
- ✅ Conversión USD→ARS funciona (mock 1015)

## Notas sobre Diseño

### Paleta de colores (sin introducciones nuevas)
- ✅ Rojo accent (#e10600) para lowest price + active states
- ✅ Blush (#ffc7c6) para texto inactivo en tiles
- ✅ Negro (#000000) para borders
- ✅ Verdes/amarillos/rojos para badge score rating (dentro de paleta existente)
- No se introdujeron colores nuevos

### Logos de tiendas
- ❌ No se usan logos oficiales (licensing concerns)
- ✅ Se usa nombre abbreviado: "Steam", "Epic", "GOG", "Microsoft"
- ✅ Fácil agregar iconos/logos en futuro sin cambiar lógica

### Responsividad
- ✅ Grid 2x2 de precios funciona bien en todos los tamaños
- ✅ Label del badge oculto en mobile (solo emoji visible)
- ✅ Texts truncados/ellipsis donde sea necesario

## Próximos Pasos (Phases futuras)

1. **Phase 5:** Modelos SQLAlchemy, incluir games table
2. **Phase 6:** Conectar frontend a `/api/games/search-prices` — **SWAP mock data por API calls**
3. **Phase 7:** Página de detalle (/games/[slug])
4. **Phase 9:** Histórico de precios → tendencias reales (reemplazar mock ↑↓→)
5. **Phase 10:** GamePrice Score real
6. **Phase 11:** Conversión USD→ARS real con impuestos (reemplazar hardcoded 1015)

## Uso en Phase 6 (Conexión Backend)

Para reemplazar mock data con API real, cambiar en `app/page.tsx`:

```typescript
// Ahora (Phase 4):
import { MOCK_GAMES } from "@/lib/mockGameData";

// Phase 6:
async function getGames() {
  const res = await fetch(`${API_URL}/api/games/search-prices?...`);
  return res.json();
}

export default async function Home() {
  const games = await getGames();
  // Rest es idéntico
}
```

**La estructura de GamePriceData matches Phase 3 backend response 100%**, así que es un swap directo.

## Resumen

✅ Card rediseñada completamente  
✅ Precios por tienda en grid 2x2  
✅ GamePrice Score badge flotante  
✅ Toggle USD/ARS  
✅ Tendencias mock al hover  
✅ Lowest price destacado en rojo  
✅ Todos datos mock claramente marcados  
✅ Estructura lista para Phase 3 backend real  
✅ Sin nuevos colores/cambios a design system  
✅ Responsivo en todos los tamaños  
✅ Documentación completa  
