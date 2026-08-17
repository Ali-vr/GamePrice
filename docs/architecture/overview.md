# Arquitectura General — GamePrice

## Fecha

2026-08-17

## Objetivo

Definir la arquitectura inicial del proyecto antes de escribir código de negocio, para que cada fase futura tenga un marco de referencia claro.

## Visión general

GamePrice se divide en tres capas principales, comunicadas por HTTP/REST:

```
┌─────────────┐      REST/JSON      ┌─────────────┐      SQLAlchemy      ┌──────────────┐
│  Frontend    │ ─────────────────▶ │   Backend    │ ─────────────────▶  │  PostgreSQL   │
│  Next.js     │ ◀───────────────── │   FastAPI    │ ◀─────────────────  │              │
└─────────────┘                     └─────────────┘                     └──────────────┘
                                            │
                                            ▼
                                   ┌─────────────────┐
                                   │ Celery + Redis    │  (a partir de Fase 15)
                                   │ tareas en segundo │
                                   │ plano              │
                                   └─────────────────┘
```

## Capas del backend

El backend sigue una separación estricta de responsabilidades:

```
Request
   ↓
Router (api/routes)      → solo valida entrada/salida y delega
   ↓
Service (services)       → contiene la lógica de negocio
   ↓
Model / SQLAlchemy        → acceso a datos
   ↓
PostgreSQL
```

Los routers **no** deben contener lógica de negocio. Su única responsabilidad es recibir la request, validarla con Pydantic y delegar al servicio correspondiente.

## Módulos principales (dominio)

- **games**: catálogo de videojuegos, búsqueda, ficha de detalle.
- **prices**: precios actuales por tienda, historial, mínimos/máximos/promedios.
- **stores**: tiendas soportadas (Steam, Epic, GOG, Xbox, PlayStation, oficiales puntuales).
- **recommendation**: GamePrice Score (evaluación de si una oferta es buena o no).
- **hardware**: hardware del usuario y comparación contra requisitos del juego.
- **users / auth**: registro, login, perfil.
- **wishlist**: lista de deseos del usuario.
- **alerts**: alertas de precio objetivo.
- **integrations**: adaptadores hacia fuentes externas (Steam, GOG, etc.), aislados del resto del dominio.

## Principios de diseño

1. **Incremental**: no se implementa nada que no corresponda a la fase actual (ver [roadmap](../development/roadmap.md)).
2. **Datos mock explícitos**: mientras no haya integración real, los datos se marcan como `mock`/`development`, nunca se presentan como reales.
3. **Reglas de negocio aisladas**: cálculo de impuestos/conversión ARS y el GamePrice Score viven en servicios propios, separados de routers e integraciones, para poder ajustarlos sin tocar el resto del sistema.
4. **Integraciones externas aisladas**: cada tienda/fuente externa tiene su propio adaptador en `integrations/`, de forma que agregar o dar de baja una fuente no impacte en el resto del backend.
5. **Sin sobreingeniería**: Redis/Celery, autenticación completa y demás componentes se agregan cuando hay una necesidad concreta, no antes.

## Decisiones registradas

Las decisiones de arquitectura relevantes (por qué se eligió X en vez de Y) se documentan individualmente en [`docs/decisions/`](../decisions/).

## Próximos pasos

- Diseñar el modelo de entidades de base de datos (`docs/database/`).
- Definir el contrato inicial de la API (`docs/api/`).
- Levantar la base de FastAPI (Fase 3 del roadmap).
- Levantar la base de Next.js (Fase 4 del roadmap).
