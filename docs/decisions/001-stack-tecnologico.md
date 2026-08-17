# 001 — Elección del stack tecnológico

## Fecha

2026-08-17

## Contexto

GamePrice necesita un stack que permita construir una API robusta con lógica de negocio no trivial (cálculo de precios, GamePrice Score, compatibilidad de hardware), un frontend moderno y responsive, y que sea razonable de mantener y mostrar como portfolio.

## Decisión

- **Backend: FastAPI (Python)**. Tipado con Pydantic, buen rendimiento, documentación automática (Swagger/OpenAPI), y ecosistema maduro para tareas en segundo plano (Celery).
- **ORM: SQLAlchemy + Alembic**. Control explícito de migraciones, evita cambios manuales sobre el esquema de producción.
- **Base de datos: PostgreSQL**. Relacional, robusta, adecuada para el modelo de entidades (juegos, tiendas, precios, historial, usuarios).
- **Frontend: Next.js + TypeScript + Tailwind CSS**. SSR/SSG para SEO en páginas de juegos, tipado estático, desarrollo de UI ágil.
- **Gráficos: Recharts**. Se integra bien con React/Next.js para mostrar evolución de precios.
- **Tareas en segundo plano: Redis + Celery**. Se incorporan recién en la Fase 15, cuando exista necesidad real (actualización periódica de precios, alertas, emails).
- **Infraestructura: Docker Compose**. Entorno reproducible para desarrollo y como parte del portfolio.

## Alternativas consideradas

- **Django** en vez de FastAPI: descartado por preferir una API más liviana y con tipado explícito vía Pydantic, sin las convenciones "batteries included" de Django que no se necesitan acá.
- **MongoDB** en vez de PostgreSQL: descartado porque el dominio (precios, historial, relaciones juego-tienda-plataforma) es fuertemente relacional.

## Consecuencias

- Requiere mantener dos entornos (Python + Node) coordinados vía Docker Compose.
- El uso de Alembic obliga a disciplina de migraciones desde el principio.

## Próximos pasos

Ninguno específico; esta decisión encuadra el resto de las fases del roadmap.
