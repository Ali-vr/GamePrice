# API — GamePrice

Estado: **propuesta inicial, sujeta a cambios cuando se implemente el backend (Fase 3+).**

## Endpoints propuestos

```
GET  /api/games
GET  /api/games/{id}

GET  /api/games/{id}/prices
GET  /api/games/{id}/history
GET  /api/games/{id}/requirements

GET  /api/stores

POST /api/auth/register
POST /api/auth/login

GET  /api/users/me

GET    /api/users/me/wishlist
POST   /api/users/me/wishlist
DELETE /api/users/me/wishlist/{game_id}

GET /api/users/me/hardware
PUT /api/users/me/hardware

GET    /api/users/me/alerts
POST   /api/users/me/alerts
DELETE /api/users/me/alerts/{id}
```

La documentación interactiva (Swagger/OpenAPI) se habilitará automáticamente cuando se levante FastAPI y se referenciará desde acá con su URL local (`/docs` de FastAPI).

Cada endpoint nuevo debe agregarse a esta tabla cuando se implemente, junto con su changelog correspondiente en `docs/changelog/`.
