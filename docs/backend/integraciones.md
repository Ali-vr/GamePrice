# Integraciones de Precios — GamePrice

**Estado:** Fase 3 — Steam Argentina y CheapShark activos.

## Steam Argentina API

### Descripción
Integración con la tienda de Steam para Argentina (cc=ar), que devuelve precios directamente en pesos argentinos (ARS).

### URL Base
```
https://store.steampowered.com/api
```

### Endpoints Utilizados

#### 1. AppList (búsqueda de juegos)
```
GET /applist.json
```

**Descripción:** Obtiene la lista completa de aplicaciones disponibles en Steam.

**Respuesta:**
```json
{
  "applist": {
    "apps": [
      { "appid": 292030, "name": "The Witcher 3: Wild Hunt" },
      { "appid": 570590, "name": "Elden Ring" }
    ]
  }
}
```

#### 2. AppDetails (detalles y precios)
```
GET /appdetails?appids={app_id}&cc=ar&json=1
```

**Parámetros:**
- `appids`: ID de la aplicación en Steam
- `cc=ar`: Country code para Argentina (devuelve precios en ARS)
- `json=1`: Formato de respuesta JSON

**Respuesta:**
```json
{
  "570590": {
    "success": true,
    "data": {
      "name": "ELDEN RING",
      "price_overview": {
        "currency": "ARS",
        "initial": 499900,      // Precio original en centavos ARS
        "final": 499900,        // Precio actual en centavos ARS
        "discount_percent": 0
      },
      "header_image": "https://...",
      "short_description": "..."
    }
  }
}
```

### Características implementadas

✅ Búsqueda de juegos por nombre
✅ Obtención de precios en ARS
✅ Descuentos en porcentaje
✅ Información básica (nombre, descripción, imagen)
✅ Manejo de errores con reintentos
✅ Conversión de centavos a pesos

### Limitaciones conocidas

- No hay API key requerida (endpoint público)
- Rate limit: ~100 requests/segundo por IP
- AppList requiere una búsqueda completa en memoria (no hay endpoint de search directo)
- Precios solo en ARS para cc=ar; conversión de otras monedas requiere API externa (Fase 11)

### Términos de Uso

- API pública de Steam
- No se pueden publicar precios sin atribución a Steam
- Respetar rate limits

---

## CheapShark API

### Descripción
Integración con CheapShark para obtener precios de videojuegos en 30+ tiendas (Steam, Epic Games, GOG, Humble Bundle, etc.), principalmente en USD.

### URL Base
```
https://www.cheapshark.com/api/1.0
```

### Endpoints Utilizados

#### 1. Stores (mapeo de tiendas)
```
GET /stores
```

**Descripción:** Obtiene la lista de tiendas disponibles con sus IDs.

**Respuesta:**
```json
[
  { "storeID": 1, "storeName": "Steam" },
  { "storeID": 2, "storeName": "GamersGate" },
  { "storeID": 3, "storeName": "Green Man Gaming" }
]
```

**Caché:** 24 horas (se actualiza automáticamente)

#### 2. Games (búsqueda)
```
GET /games?title={game_title}&limit={limit}
```

**Parámetros:**
- `title`: Nombre del juego a buscar
- `limit`: Número máximo de resultados (default 5)

**Respuesta:**
```json
[
  {
    "gameID": 612948,
    "steamAppID": 570590,
    "cheaply": "ELDEN RING",
    "thumb": "https://..."
  }
]
```

#### 3. Game Details (ofertas)
```
GET /games?id={game_id}
```

**Parámetros:**
- `id`: ID del juego en CheapShark

**Respuesta:**
```json
{
  "gameID": 612948,
  "gameTitle": "ELDEN RING",
  "deals": [
    {
      "storeID": "1",
      "storeID": 1,
      "storeName": "Steam",
      "price": "39.99",
      "normalPrice": "39.99",
      "discount": "-0",
      "savings": "0"
    },
    {
      "storeID": "2",
      "storeName": "Epic Games",
      "price": "39.99",
      "normalPrice": "39.99",
      "discount": "-0",
      "savings": "0"
    }
  ]
}
```

### Características implementadas

✅ Búsqueda de juegos
✅ Obtención de ofertas en múltiples tiendas
✅ Mapeo automático de store IDs a nombres
✅ Caché de tiendas (24 horas)
✅ Descuentos en porcentaje
✅ Rating de oferta (deal rating)
✅ Manejo de errores resiliente

### Limitaciones conocidas

- No hay API key requerida (endpoint público)
- Rate limit: 1 request/segundo recomendado
- Precios principalmente en USD
- Algunas tiendas pueden no estar disponibles para ciertos juegos
- Histórico de precios limitado en CheapShark API

### Términos de Uso

- API pública de CheapShark
- Respetar rate limits
- No garantía de datos en tiempo real
- Consultar términos completos en: https://www.cheapshark.com/

---

## Integración en la Aplicación

### Flujo de datos

```
Cliente HTTP
    ↓
GET /api/games/search-prices?title=...
    ↓
PriceService.get_game_prices()
    ├─→ SteamIntegration.get_game_price_by_name()
    │   ├─→ search_game_by_name() → obtiene App ID
    │   └─→ get_game_details() → precio en ARS
    │
    └─→ CheapSharkIntegration.get_deals_by_game_title()
        ├─→ search_games() → obtiene Game ID
        ├─→ get_store_mapping() → mapeo tiendas (caché)
        └─→ get_game_deals() → lista de ofertas en USD
    ↓
Respuesta unificada (Steam ARS + CheapShark USD)
```

### Manejo de errores

- Si Steam falla: se retorna NULL en steam_price, continúa CheapShark
- Si CheapShark falla: se retorna lista vacía en deals, continúa Steam
- Si ambas fallan: se retorna status="no_results" con error_message
- Nunca se devuelven datos fabricados o ficticios

### Próximas mejoras (fases futuras)

- Fase 5: Almacenar históricos de precios en BD
- Fase 9: Gráficos de histórico de precios
- Fase 10: GamePrice Score (análisis de oferta)
- Fase 11: Conversión USD → ARS con API de tipo de cambio
