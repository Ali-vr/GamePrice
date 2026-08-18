"""
Configuración de la aplicación FastAPI
Carga variables de entorno desde .env usando Pydantic Settings
"""

from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    """Configuración de la aplicación"""

    # General
    ENVIRONMENT: str = "development"
    DEBUG: bool = True

    # FastAPI
    BACKEND_HOST: str = "0.0.0.0"
    BACKEND_PORT: int = 8000

    # Base de datos
    DATABASE_URL: str = "postgresql://gameprice:gameprice@localhost:5432/gameprice"
    POSTGRES_USER: str = "gameprice"
    POSTGRES_PASSWORD: str = "gameprice"
    POSTGRES_DB: str = "gameprice"
    POSTGRES_HOST: str = "postgres"
    POSTGRES_PORT: int = 5432

    # CORS - Orígenes permitidos para el frontend
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:8000"]

    # Seguridad
    SECRET_KEY: str = "change-me-in-production"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    # Integraciones externas
    # Steam API - No requiere API key para store.steampowered.com/api/appdetails
    STEAM_API_BASE_URL: str = "https://store.steampowered.com/api"

    # CheapShark API - No requiere API key
    CHEAPSHARK_API_BASE_URL: str = "https://www.cheapshark.com/api/1.0"

    class Config:
        """Cargar variables desde archivo .env"""
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True


# Instancia global de settings
settings = Settings()
