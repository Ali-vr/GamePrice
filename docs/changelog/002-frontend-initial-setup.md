# Changelog — Fase 4: Frontend Inicial

**Fecha:** 2026-08-17  
**Fase:** 4 de 18  
**Estado:** ✅ Completada

## Objetivo

Levantar la base de la aplicación frontend: estructura de carpetas, componentes base, sistema de diseño y rutes placeholder. Integrar la estructura con Docker Compose.

## Cambios Principales

### 1. Inicialización de Next.js
- ✅ Scaffold de Next.js 14 con App Router
- ✅ TypeScript configurado
- ✅ Tailwind CSS 3.4 integrado
- ✅ Path alias (@/*) para imports limpios

### 2. Design System & Theming
- ✅ 6 CSS custom properties (design tokens) implementadas:
  - `--color-bg-base` (#260212)
  - `--color-bg-surface` (#4f0423)
  - `--color-accent` (#e10600)
  - `--color-text-soft` (#ffc7c6)
  - `--color-border` (#000000)
  - `--color-text` (#ffffff)
- ✅ Tailwind config extendido con tokens, tipografía (Archivo Expanded/Oswald + Inter) y border-radius customizados
- ✅ Estilos base en `app/globals.css`

### 3. Componentes Base
- ✅ **Navigation** — Barra sticky top con logo, nav links, auth buttons
- ✅ **Button** — Variantes primary (red fill) y ghost (white outline), 15px radius
- ✅ **Card** — Surface burgundy, border negro, 12px radius
- ✅ **FilterPill** — Toggle inactive/active para filtros
- ✅ **HeroBlock** — Título display grande + subtitle + CTA

### 4. Rutas & Páginas
- ✅ `/` — Homepage con hero section y 4 placeholder sections
  - 🔥 Mejores Ofertas (3 mock cards)
  - 📉 Mínimo Histórico (3 mock cards)
  - 🇦🇷 Mejores Precios Argentina (2 mock cards)
  - 🎮 Recomendado para tu PC (CTA a `/my-pc`)
- ✅ `/games` — Listado de juegos (shell)
- ✅ `/games/[slug]` — Detalle de juego (shell)
- ✅ `/deals` — Ofertas (shell)
- ✅ `/historical-low` — Mínimo histórico (shell)
- ✅ `/login` — Iniciar sesión (shell)
- ✅ `/register` — Registrarse (shell)
- ✅ `/profile` — Perfil de usuario (shell)
- ✅ `/wishlist` — Wishlist (shell)
- ✅ `/my-pc` — Configuración de hardware (shell)
- ✅ `/alerts` — Alertas de precio (shell)

### 5. Docker
- ✅ Dockerfile multi-stage (deps → build → run)
- ✅ Optimizado para Next.js
- ✅ Servicio `frontend` agregado a `docker-compose.yml`
- ✅ Puerto 3000 expuesto
- ✅ NEXT_PUBLIC_API_URL desde .env

### 6. Documentación
- ✅ `docs/frontend/overview.md` — Actualizado con estructura, componentes, tokens, instrucciones
- ✅ `README.md` — Sección "Ejecución" con instrucciones Docker y npm
- ✅ `README.md` — Estado actualizado a Fase 4
- ✅ `docs/changelog/002-frontend-initial-setup.md` — Este archivo

## Archivos Creados/Modificados

### Creados
```
frontend/
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── Dockerfile
├── .gitignore
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── games/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── deals/
│   │   └── page.tsx
│   ├── historical-low/
│   │   └── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── register/
│   │   └── page.tsx
│   ├── profile/
│   │   └── page.tsx
│   ├── wishlist/
│   │   └── page.tsx
│   ├── my-pc/
│   │   └── page.tsx
│   └── alerts/
│       └── page.tsx
└── components/
    ├── Navigation.tsx
    ├── Button.tsx
    ├── Card.tsx
    ├── FilterPill.tsx
    └── HeroBlock.tsx
```

### Modificados
- `docker-compose.yml` — Servicio frontend agregado (descommentado y configurado)
- `README.md` — Instrucciones de ejecución, estado actualizado
- `docs/frontend/overview.md` — Documentación completada

## Problemas Encontrados

Ninguno. La inicialización fue directa con métodos estándar de Next.js.

## Solución Aplicada

Creación manual de archivos de configuración para máximo control sobre estructura y settings, garantizando que todo esté alineado con el design system especificado.

## Cómo Ejecutar

### Opción 1: Docker (recomendado)
```bash
cp .env.example .env
docker compose up
# Navegar a http://localhost:3000
```

### Opción 2: Local npm
```bash
cd frontend
npm install
npm run dev
# Navegar a http://localhost:3000
```

## QA Manual

- ✅ Frontend levanta sin errores en http://localhost:3000
- ✅ Todas las rutas son accesibles y renderizan contenido estático
- ✅ Estilos aplicados correctamente (paleta de colores, tipografía, espaciados)
- ✅ Componentes funcionan como esperado
- ✅ Contenido mock claramente marcado como placeholder

## Próximos Pasos (Fase 5+)

1. **Fase 5:** Modelos de base de datos con SQLAlchemy y Alembic
2. **Fase 6:** Comunicación frontend ↔ backend (fetch calls desde Next.js a FastAPI)
3. **Fase 7:** Implementar lógica de juegos
4. **Fase 8:** Implementar lógica de precios
5. Fases 9-14: Históricos, GamePrice Score, Argentina, usuarios, PC, alertas
6. Fase 15+: Redis/Celery, testing, Docker production, portfolio

## Notas

- No hay lógica de backend ni llamadas a base de datos en esta fase — todo es estático/mock
- Los datos de ejemplo están claramente marcados como "[Contenido placeholder]" o "[mock]"
- La estructura está lista para recibir backend calls en Fase 6
- El design system está 100% implementado y listo para componentes avanzados
