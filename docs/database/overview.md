# Base de datos — GamePrice

Estado: **pendiente de diseño (Fase 5 del roadmap).**

Este documento contendrá, antes de crear cualquier tabla:

1. Diagrama entidad-relación.
2. Definición de cada entidad: `users`, `games`, `stores`, `prices`, `price_history`, `platforms`, `game_platforms`, `reviews`, `system_requirements`, `user_hardware`, `wishlists`, `price_alerts`.
3. Relaciones entre entidades.
4. Consideraciones de normalización.
5. Estrategia de migraciones con Alembic.

No se crea ninguna tabla en PostgreSQL sin que este documento esté completo y revisado primero.
