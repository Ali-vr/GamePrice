# API — GamePrice

**Estado:** Fase 3 en desarrollo. Endpoints base activos con integraciones de precios.

## Documentación interactiva

La documentación Swagger completa está disponible en:
- `http://localhost:8000/api/docs` (Swagger UI)
- `http://localhost:8000/api/openapi.json` (Especificación OpenAPI)

## Endpoints Implementados (Fase 3)

### Health & Status

```
GET /api/health
```

**Descripción:** Verifica el estado de la API y su conexión a la base de datos.

**Respuesta exitosa (200):**
```json
{
  "status": "ok",
  "database": "connected",
  "version": "0.1.0"
}
```

### Búsqueda de Precios

```
GET /api/games/search-prices?title={game_title}
```

**Descripción:** Obtiene precios consolidados de un juego desde Steam Argentina (ARS) y CheapShark (múltiples tiendas en USD).

**Parámetros:**
- `title` (query, requerido): Nombre del juego a buscar

**Ejemplo de uso:**
```
GET /api/games/search-prices?title=Elden Ring
```

**Respuesta exitosa (200):**
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

**Respuesta sin resultados (200):**
```json
{
  "game_title": "Juego Inexistente 123",
  "steam_price": null,
  "cheapshark_deals": [],
  "status": "no_results",
  "error_message": null
}
```

## Endpoints Planificados (Fases futuras)

```
GET    /api/games
GET    /api/games/{id}
GET    /api/games/{id}/history
GET    /api/games/{id}/requirements
GET    /api/stores

POST   /api/auth/register
POST   /api/auth/login
GET    /api/users/me

GET    /api/users/me/wishlist
POST   /api/users/me/wishlist
DELETE /api/users/me/wishlist/{game_id}

GET    /api/users/me/hardware
PUT    /api/users/me/hardware

GET    /api/users/me/alerts
POST   /api/users/me/alerts
DELETE /api/users/me/alerts/{id}
```

## Notas sobre integraciones

### Steam Argentina (Fase 3)
- Precios en **ARS** (pesos argentinos)
- Descuentos en porcentaje
- API pública, sin API key requerido
- Endpoint: `https://store.steampowered.com/api/appdetails?appids={app_id}&cc=ar`

### CheapShark (Fase 3)
- Cubre 30+ tiendas (Steam, Epic, GOG, Humble, etc.)
- Precios en **USD**
- API pública, sin API key requerido
- Mapeo de tiendas cacheado (24 horas)
- Endpoint: `https://www.cheapshark.com/api/1.0/games`
