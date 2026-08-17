# Roadmap — GamePrice

Estado: **Fase 0 en curso.**

El proyecto se desarrolla de forma incremental. No se avanza a una fase nueva sin completar y documentar la anterior.

| Fase | Nombre | Estado | Descripción breve |
|------|--------|--------|--------------------|
| 0 | Planificación | 🟡 En curso | README, `/docs`, arquitectura, roadmap, estructura inicial |
| 1 | Entorno | ⬜ Pendiente | Git, Node, Python, PostgreSQL, Docker, VS Code |
| 2 | Repositorio | 🟡 En curso | Estructura base de carpetas y archivos de config |
| 3 | Backend inicial | ⬜ Pendiente | FastAPI: main, config, database, routers, schemas, models, services |
| 4 | Frontend inicial | ⬜ Pendiente | Next.js + TypeScript + Tailwind, estructura de páginas |
| 5 | PostgreSQL | ⬜ Pendiente | Modelo inicial, SQLAlchemy, Alembic, primeras migraciones |
| 6 | Comunicación | ⬜ Pendiente | Conectar Next.js ↔ FastAPI ↔ PostgreSQL |
| 7 | Juegos | ⬜ Pendiente | Búsqueda y páginas de videojuegos |
| 8 | Precios | ⬜ Pendiente | Tiendas y precios |
| 9 | Historial | ⬜ Pendiente | Históricos de precio y gráficos |
| 10 | Análisis | ⬜ Pendiente | GamePrice Score |
| 11 | Argentina | ⬜ Pendiente | USD, ARS, conversión, impuestos estimados |
| 12 | Usuarios | ⬜ Pendiente | Registro, login, perfil, wishlist |
| 13 | Alertas | ⬜ Pendiente | Alertas de precio |
| 14 | PC | ⬜ Pendiente | Hardware del usuario y comparación con requisitos |
| 15 | Automatización | ⬜ Pendiente | Redis, Celery, workers, actualización automática |
| 16 | Testing | ⬜ Pendiente | Tests con Pytest |
| 17 | Docker | ⬜ Pendiente | Entorno reproducible completo |
| 18 | Portfolio | ⬜ Pendiente | Documentación final, screenshots, instrucciones |

## Regla de avance

Antes de comenzar una fase importante nueva:

1. Confirmar que la fase anterior está terminada y documentada.
2. Revisar README y `/docs`.
3. Explicar qué se va a hacer antes de implementar.
4. Documentar el cambio en `docs/changelog/`.

No se agregan funcionalidades fuera de la fase en curso salvo indicación explícita.
