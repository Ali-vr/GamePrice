# 001 - Arquitectura inicial y base del proyecto

## Fecha

2026-08-17

## Objetivo

Ejecutar la Fase 0 del roadmap: planificar y preparar la base del proyecto GamePrice, sin implementar todavía funcionalidades reales (precios, scraping, autenticación completa, Redis/Celery, alertas ni compatibilidad de hardware).

## Cambios

- Se creó la estructura de carpetas raíz: `frontend/`, `backend/`, `docs/`, `docker/`.
- Se creó el esqueleto de `backend/app/` con las subcarpetas `core`, `models`, `schemas`, `api/routes`, `services`, `integrations`, `utils` y `tests` (todas vacías por ahora, sin código de negocio).
- Se creó `README.md` con descripción, objetivo, stack, arquitectura, estructura, roadmap y demás secciones mínimas requeridas.
- Se creó `/docs` con las subcarpetas `architecture`, `database`, `api`, `frontend`, `backend`, `decisions`, `development`, `changelog`.
- Se documentó la arquitectura general en `docs/architecture/overview.md`.
- Se documentó el roadmap completo (18 fases) en `docs/development/roadmap.md`.
- Se registró la primera decisión de arquitectura (elección de stack) en `docs/decisions/001-stack-tecnologico.md`.
- Se crearon placeholders de documentación para base de datos, API y frontend/backend, a completar en sus fases correspondientes.
- Se creó `.gitignore` cubriendo Python, Node, Docker, editores y archivos de entorno.
- Se creó `.env.example` con las variables previstas para backend, base de datos, Redis/Celery y frontend (sin valores reales).

## Archivos afectados

```
GamePrice/
├── README.md
├── .gitignore
├── .env.example
├── docs/
│   ├── architecture/overview.md
│   ├── database/overview.md
│   ├── api/endpoints.md
│   ├── frontend/overview.md
│   ├── backend/overview.md
│   ├── decisions/001-stack-tecnologico.md
│   ├── development/roadmap.md
│   └── changelog/001-initial-architecture.md
├── frontend/            (vacío, listo para Fase 4)
└── backend/app/         (estructura de carpetas, sin código, listo para Fase 3)
```

## Problemas encontrados

Ninguno relevante. Se optó por dejar `frontend/` y las carpetas de `backend/app/` vacías (sin archivos placeholder tipo `.gitkeep` superfluos) para no generar archivos innecesarios antes de que tengan contenido real.

## Solución

No aplica (no hubo problemas bloqueantes).

## Próximos pasos

- Fase 1: confirmar entorno local (Git, Node, Python, PostgreSQL, Docker, VS Code).
- Fase 2: completar el repositorio (README y `.gitignore` ya están; falta inicializar Git si no existe).
- Fase 3: levantar la base de FastAPI (`main.py`, `core/config.py`, `core/database.py`, router de ejemplo, Swagger).
- Fase 4: levantar la base de Next.js con TypeScript y Tailwind.

No se avanza a la Fase 3 sin confirmación explícita, según la regla de trabajo del proyecto.
