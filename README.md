# GamePrice 🇦🇷

## Descripción

GamePrice es una plataforma web pensada para el mercado argentino de videojuegos. No es "otro comparador de precios": el objetivo es ayudar a un usuario a responder una pregunta concreta:

> **¿Me conviene comprar este videojuego ahora, dónde comprarlo y cuánto debería pagar?**

Para eso, GamePrice combina comparación de precios entre tiendas, historial de precios, una estimación del precio final en pesos argentinos (incluyendo impuestos), un sistema propio de evaluación de ofertas (**GamePrice Score**) y un chequeo de compatibilidad entre el hardware del usuario y los requisitos del juego.

## Objetivo

Construir una aplicación real, profesional y usable como portfolio de GitHub, priorizando:

- Arquitectura clara y mantenible.
- Separación de responsabilidades (router → service → modelo/DB).
- Documentación viva en `/docs`.
- Desarrollo incremental por fases (ver [Roadmap](docs/development/roadmap.md)).
- Datos mock claramente identificados mientras no exista una fuente real.

## Características

> Estado actual: **Fase 4 — Frontend inicial implementado.**
> Las features se construyen incrementalmente; las listadas abajo son el alcance completo del proyecto.

- Búsqueda y ficha de videojuegos.
- Comparación de precios entre tiendas (Steam, Epic, GOG, Xbox, PlayStation y tiendas oficiales puntuales).
- Precio en USD y estimación de precio final en ARS (con impuestos estimados, no exactos).
- Historial de precios: mínimo, máximo, promedio y evolución en el tiempo (gráfico).
- **GamePrice Score**: evalúa si una oferta es excelente, buena, normal o si conviene esperar, en base a datos históricos.
- Cuentas de usuario, wishlist y alertas de precio objetivo.
- Registro del hardware del usuario (CPU, GPU, RAM, almacenamiento) y comparación contra los requisitos del juego.

## Tecnologías

**Frontend:** Next.js, React, TypeScript, Tailwind CSS, Recharts.
**Backend:** Python, FastAPI, Pydantic, SQLAlchemy, Alembic.
**Base de datos:** PostgreSQL.
**Procesamiento asíncrono (a incorporar cuando exista necesidad real):** Redis, Celery.
**Infraestructura:** Docker, Docker Compose.
**Testing:** Pytest.

## Arquitectura

Ver el detalle completo en [`docs/architecture/`](docs/architecture/overview.md).

Flujo general de una request:

```
Next.js (frontend)
      ↓
FastAPI (routers)
      ↓
Services (lógica de negocio)
      ↓
SQLAlchemy (modelos)
      ↓
PostgreSQL
```

## Estructura

```
GamePrice/
│
├── frontend/            # Next.js + TypeScript + Tailwind
├── backend/              # FastAPI + SQLAlchemy
│   └── app/
│       ├── core/          # configuración, seguridad, conexión a DB
│       ├── models/        # modelos SQLAlchemy
│       ├── schemas/       # esquemas Pydantic
│       ├── api/routes/    # endpoints
│       ├── services/      # lógica de negocio
│       ├── integrations/  # integraciones externas (Steam, GOG, etc.)
│       └── utils/
│
├── docs/                 # documentación técnica y changelog
├── docker/
├── .env.example
├── .gitignore
└── docker-compose.yml
```

## Instalación

> Instrucciones preliminares. Se irán completando a medida que el backend y el frontend tengan dependencias reales.

Requisitos previos:

- Node.js 20+
- Python 3.11+
- Docker y Docker Compose
- PostgreSQL 15+ (o vía Docker)

```bash
git clone <repo-url>
cd GamePrice
cp .env.example .env
```

## Variables de entorno

Ver [`.env.example`](.env.example) para el listado completo. Nunca subir un `.env` real al repositorio.

## Ejecución

### Opción 1: Con Docker Compose (Recomendado)

```bash
# Preparar entorno
cp .env.example .env

# Levantar servicios
docker compose up

# Frontend: http://localhost:3000
# PostgreSQL: localhost:5432 (cuando backend esté activo)
```

### Opción 2: Frontend solo (desarrollo local)

```bash
cd frontend

# Instalar dependencias
npm install

# Dev server
npm run dev

# En el navegador: http://localhost:3000
```

### Opción 3: Build y run manual del frontend

```bash
cd frontend
npm install
npm run build
npm start
```

**Nota:** Por ahora (Fase 4), el frontend es totalmente estático. No hay backend ni base de datos conectados — se agregarán en Fase 6.

## API

La documentación interactiva de la API (Swagger/OpenAPI) se habilitará junto con la base de FastAPI. El detalle de endpoints propuestos vive en [`docs/api/`](docs/api/endpoints.md).

## Base de datos

El modelo de entidades y relaciones se documentará en [`docs/database/`](docs/database/overview.md) antes de crear las migraciones con Alembic.

## Testing

Se usará Pytest, priorizando: autenticación, cálculo de precios, GamePrice Score, compatibilidad de hardware, wishlist y alertas.

## Roadmap

Ver [`docs/development/roadmap.md`](docs/development/roadmap.md) para las 18 fases planificadas.

## Documentación

Toda la documentación técnica vive en [`/docs`](docs/), organizada por área (arquitectura, base de datos, API, frontend, backend, decisiones de diseño, desarrollo y changelog).

## Autor

Proyecto personal de portfolio — GamePrice 🇦🇷.
