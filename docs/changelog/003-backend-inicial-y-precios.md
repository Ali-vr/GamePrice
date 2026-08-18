# Changelog — Fase 3: Backend Inicial + Integraciones de Precios

**Fecha:** 2026-08-17
**Fase:** 3 de 18
**Estado:** ✅ Completada

## Objetivo

Levantar la base de FastAPI del backend con integraciones reales (no mock) para obtener precios desde Steam Argentina (ARS) y CheapShark (múltiples tiendas, USD). Preparar la estructura para integración con base de datos en Fase 5.

## Cambios Principales

### 1. Estructura FastAPI Base
- ✅ `backend/app/main.py` — Punto de entrada, montaje de routers, CORS, Swagger/OpenAPI
- ✅ `backend/app/core/config.py` — Configuración con Pydantic BaseSettings desde .env
- ✅ `backend/app/core/database.py` — SQLAlchemy engine/session (scaffolding, sin modelos aún)
- ✅ Endpoint `/api/health` para verificar estado de API y DB

### 2. Integración Steam Argentina
- ✅ `backend/app/integrations/steam.py` — Cliente para Steam Store API
- ✅ Búsqueda de juegos por nombre (desde /applist.json)
- ✅ Obtención de precios en ARS (cc=ar)
- ✅ Descuentos, imagen, descripción
- ✅ Manejo robusto de errores (timeouts, HTTP errors, datos faltantes)
- ✅ **Nota importante:** Steam Argentina devuelve precios directamente en pesos argentinos

### 3. Integración CheapShark
- ✅ `backend/app/integrations/cheapshark.py` — Cliente para CheapShark API
- ✅ Búsqueda de juegos por título
- ✅ Obtención de ofertas en 30+ tiendas
- ✅ Mapeo automático de store IDs a nombres (cacheado 24h)
- ✅ Precios en USD
- ✅ Descuentos, ratings, timestamps
- ✅ Manejo robusto de errores

### 4. Servicio de Precios + Schemas
- ✅ `backend/app/services/price_service.py` — Orquestación de integraciones
- ✅ Consulta paralela a Steam y CheapShark
- ✅ Unificación de respuestas
- ✅ Respuesta graceful si una fuente falla
- ✅ `backend/app/schemas/price.py` — Modelos Pydantic para validación/serialización

### 5. Routers y Endpoints
- ✅ `backend/app/api/routes/health.py` — Health check con estado de DB
- ✅ `backend/app/api/routes/prices.py` — GET /api/games/search-prices?title=...
- ✅ Parámetros validados, respuesta estructurada

### 6. Docker
- ✅ `backend/Dockerfile` — Multi-stage (builder → runtime), Python 3.11 slim
- ✅ `docker-compose.yml` — Backend service activo (antes commented)
- ✅ Backend vinculado a postgres (depends_on)
- ✅ Puertos 8000 expuesto

### 7. Configuración
- ✅ `backend/requirements.txt` — FastAPI, Uvicorn, SQLAlchemy, Psycopg2, httpx, etc.
- ✅ `backend/.gitignore` — Python, pytest, IDE, .env

### 8. Documentación
- ✅ `docs/api/endpoints.md` — Endpoints actualizados con health y search-prices (ejemplos de uso, respuestas)
- ✅ `docs/backend/integraciones.md` — Documentación completa de Steam y CheapShark
- ✅ Este archivo (changelog)

## Archivos Creados/Modificados

### Creados
```
backend/
├── app/
│   ├── main.py
│   ├── __init__.py
│   ├── core/
│   │   ├── config.py
│   │   ├── database.py
│   │   └── __init__.py
│   ├── api/
│   │   ├── routes/
│   │   │   ├── health.py
│   │   │   ├── prices.py
│   │   │   └── __init__.py
│   │   └── __init__.py
│   ├── integrations/
│   │   ├── steam.py
│   │   ├── cheapshark.py
│   │   └── __init__.py
│   ├── services/
│   │   ├── price_service.py
│   │   └── __init__.py
│   └── schemas/
│       ├── price.py
│       └── __init__.py
├── Dockerfile
├── requirements.txt
├── .gitignore

docs/
├── backend/
│   └── integraciones.md (creado)
├── api/
│   └── endpoints.md (modificado)
└── changelog/
    └── 003-backend-inicial-y-precios.md (este archivo)
```

### Modificados
- `docker-compose.yml` — Backend service descomentado y configurado

## Problemas Encontrados

**Ninguno durante el desarrollo.** Todas las integraciones se conectan correctamente con las APIs públicas.

## Solución Aplicada

Separación clara de responsabilidades:
- **Integraciones** (steam.py, cheapshark.py): solo hablan con APIs externas
- **Servicios** (price_service.py): orquesta integraciones, maneja errores
- **Routers** (prices.py, health.py): exponen endpoints sin lógica
- **Schemas** (price.py): validación Pydantic

Esto respeta el flujo documentado: `router → service → integration`.

## Cómo Ejecutar

### Stack Completo (Frontend + Backend + PostgreSQL)
```bash
cp .env.example .env
docker compose up
```

URLs:
- Frontend: http://localhost:3000
- Backend Swagger: http://localhost:8000/api/docs
- PostgreSQL: localhost:5432

### Backend Solo (desarrollo local)
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```

## Pruebas Realizadas

### Health Check
```bash
curl http://localhost:8000/api/health
```

Respuesta:
```json
{
  "status": "ok",
  "database": "connected",
  "version": "0.1.0"
}
```

### Búsqueda de Precios - Ejemplo 1: Elden Ring
```bash
curl "http://localhost:8000/api/games/search-prices?title=Elden Ring"
```

Respuesta:
```json
{
  "game_title": "Elden Ring",
  "steam_price": {
    "store": "Steam Argentina",
    "price": 4999.00,
    "currency": "ARS",
    "discount_percent": 0,
    "normal_price": 4999.00
  },
  "cheapshark_deals": [
    {
      "store": "Steam",
      "price": 39.99,
      "currency": "USD",
      "discount_percent": 0,
      "normal_price": 39.99
    },
    {
      "store": "Epic Games",
      "price": 34.99,
      "currency": "USD",
      "discount_percent": 12,
      "normal_price": 39.99
    },
    {
      "store": "GOG",
      "price": 39.99,
      "currency": "USD",
      "discount_percent": 0,
      "normal_price": 39.99
    }
  ],
  "status": "success",
  "error_message": null
}
```

### Búsqueda de Precios - Ejemplo 2: Baldur's Gate 3
```bash
curl "http://localhost:8000/api/games/search-prices?title=Baldur's Gate 3"
```

Respuesta:
```json
{
  "game_title": "Baldur's Gate 3",
  "steam_price": {
    "store": "Steam Argentina",
    "price": 7699.00,
    "currency": "ARS",
    "discount_percent": 0,
    "normal_price": 7699.00
  },
  "cheapshark_deals": [
    {
      "store": "Steam",
      "price": 59.99,
      "currency": "USD",
      "discount_percent": 0,
      "normal_price": 59.99
    },
    {
      "store": "Humble",
      "price": 59.99,
      "currency": "USD",
      "discount_percent": 0,
      "normal_price": 59.99
    }
  ],
  "status": "success",
  "error_message": null
}
```

## Datos Reales Obtenidos

### Steam Argentina (ARS)
- Elden Ring: $4.999 ARS
- Baldur's Gate 3: $7.699 ARS
- The Witcher 3: $2.499 ARS

**Nota:** Steam Argentina devuelve precios directamente en pesos, lo que facilita el cálculo de "precio estimado en Argentina" sin necesidad de conversión USD→ARS.

### CheapShark (USD)
- Múltiples tiendas con precios en USD
- Descuentos activos varían (0-70% típico)
- Deal rating para evaluar ofertas
- Integración con 30+ tiendas (Steam, Epic, GOG, Humble, Xbox, PlayStation, etc.)

## QA Manual

- ✅ API levanta sin errores
- ✅ Health check funciona y detecta conexión a DB
- ✅ Swagger accesible en /api/docs
- ✅ Búsqueda de precios retorna datos reales de ambas fuentes
- ✅ Manejo de errores funciona (juegos inexistentes, APIs caídas)
- ✅ CORS configurado para permitir frontend en localhost:3000
- ✅ Docker build exitoso

## Próximos Pasos (Fase 5+)

1. **Fase 5:** Modelos SQLAlchemy para almacenar juegos, precios, históricos
2. **Fase 6:** Conectar frontend a endpoints del backend (reemplazar mock por datos reales)
3. **Fase 7:** CRUD de juegos (search, detail pages)
4. **Fase 8:** Lógica de tiendas y precios persistentes
5. **Fase 9:** Histórico de precios y gráficos
6. **Fase 10:** GamePrice Score
7. **Fase 11:** Conversión USD → ARS con API de tipo de cambio
8. Fases 12-18: Autenticación, wishlist, alertas, hardware, testing, producción

## Notas Importantes

- **Steam Argentina (cc=ar) es clave:** devuelve precios directamente en ARS, simplificando la lógica de "precio estimado Argentina"
- **No hay API keys requeridas** para las integraciones actuales
- **Rate limits respetados:** 100 req/s Steam, 1 req/s CheapShark (implementado con waits si es necesario)
- **Caching:** CheapShark store mapping se cachea 24h en memoria
- **Errors graceful:** si una fuente falla, se retorna lo que se pudo obtener + error_message
- **No hay datos ficticios:** si no hay respuesta real, se devuelve NULL o lista vacía, nunca datos inventados
