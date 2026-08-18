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

> Estado actual: **Fase 3 completada — Backend con integraciones Steam + CheapShark.**
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

### Opción 1: Stack Completo con Docker Compose (Recomendado)

```bash
# Preparar entorno
cp .env.example .env

# Levantar todos los servicios
docker compose up

# URLs
# - Frontend: http://localhost:3000
# - Backend API: http://localhost:8000
# - Backend Swagger/Docs: http://localhost:8000/api/docs
# - PostgreSQL: localhost:5432
```

**Nota:** La primera ejecución descargará e instalará dependencias. Puede tomar 2-5 minutos.

### Opción 2: Backend solo (desarrollo local)

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000

# Swagger en: http://localhost:8000/api/docs
```

### Opción 3: Frontend solo (desarrollo local)

```bash
cd frontend
npm install
npm run dev

# Frontend en: http://localhost:3000
# (Mostrará datos mock, sin conexión a backend)
```

### Pruebas rápidas

Verificar que backend y DB están listos:
```bash
curl http://localhost:8000/api/health
```

Respuesta esperada:
```json
{
  "status": "ok",
  "database": "connected",
  "version": "0.1.0"
}
```

Buscar precios de un juego:
```bash
curl "http://localhost:8000/api/games/search-prices?title=Elden%20Ring"
```

Ver documentación interactiva en: http://localhost:8000/api/docs

## API

La documentación completa está en [`docs/api/endpoints.md`](docs/api/endpoints.md).

Endpoints activos (Fase 3):
- `GET /api/health` — Estado de API y base de datos
- `GET /api/games/search-prices?title=...` — Búsqueda de precios consolidados (Steam ARS + CheapShark USD)
- `GET /api/docs` — Documentación interactiva Swagger

**Integraciones implementadas:**
- **Steam Argentina:** precios en pesos argentinos (ARS)
- **CheapShark:** ofertas en 30+ tiendas (USD)

## Base de datos

El modelo de entidades se documentará en [`docs/database/`](docs/database/overview.md) en Fase 5, junto con migraciones Alembic.

Actualmente se cuenta con scaffolding SQLAlchemy listo (engine, session factory) sin modelos aún.

## Testing

Se implementará en Fase 16 con Pytest, priorizando: autenticación, cálculo de precios, GamePrice Score, compatibilidad de hardware, wishlist y alertas.

## Roadmap

Ver [`docs/development/roadmap.md`](docs/development/roadmap.md) para las 18 fases planificadas.

## Documentación

Toda la documentación técnica vive en [`/docs`](docs/), organizada por área:
- `architecture/` — Diagrama y flujo de la aplicación
- `api/` — Endpoints y ejemplos
- `backend/` — Integraciones, servicios, estructura
- `database/` — Modelos y esquemas (a partir de Fase 5)
- `frontend/` — Componentes, diseño, rutas
- `decisions/` — Decisiones arquitectónicas
- `development/` — Roadmap y desarrollo
- `changelog/` — Historial de cada fase

## Autor

Proyecto personal de portfolio — GamePrice 🇦🇷.
