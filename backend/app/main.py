"""
GamePrice Backend - Punto de entrada principal
Aplicación FastAPI para el comparador de precios de videojuegos
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.routes import health, prices

# Crear aplicación FastAPI
app = FastAPI(
    title="GamePrice API",
    description="API para comparación de precios de videojuegos en Argentina",
    version="0.1.0",
    docs_url="/api/docs",
    openapi_url="/api/openapi.json",
)

# Configurar CORS para permitir el frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir routers
app.include_router(health.router, prefix="/api", tags=["health"])
app.include_router(prices.router, prefix="/api", tags=["precios"])

# Información de la aplicación
@app.get("/")
async def root():
    """Ruta raíz - información de la API"""
    return {
        "nombre": "GamePrice API",
        "versión": "0.1.0",
        "estado": "en desarrollo (Fase 3)",
        "docs": "/api/docs",
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
