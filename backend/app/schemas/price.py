"""
Esquemas Pydantic para respuestas de precios
"""

from pydantic import BaseModel, Field
from typing import List, Optional
from decimal import Decimal


class StorePrice(BaseModel):
    """Información de precio en una tienda específica"""

    store: str = Field(..., description="Nombre de la tienda")
    price: Optional[Decimal] = Field(None, description="Precio actual")
    currency: str = Field(..., description="Código de moneda (ARS, USD, etc.)")
    discount_percent: int = Field(default=0, description="Porcentaje de descuento")
    normal_price: Optional[Decimal] = Field(
        None, description="Precio sin descuento"
    )

    class Config:
        """Permitir Decimal en respuesta JSON"""
        json_encoders = {Decimal: float}


class PriceResponse(BaseModel):
    """Respuesta unificada de precios de un juego"""

    game_title: str = Field(..., description="Nombre del juego")
    steam_price: Optional[StorePrice] = Field(
        None, description="Precio en Steam Argentina (ARS)"
    )
    cheapshark_deals: List[StorePrice] = Field(
        default=[], description="Lista de ofertas desde CheapShark"
    )
    status: str = Field(default="success", description="Estado de la búsqueda")
    error_message: Optional[str] = Field(
        None, description="Mensaje de error si aplica"
    )

    class Config:
        json_encoders = {Decimal: float}


class HealthResponse(BaseModel):
    """Respuesta del endpoint de health check"""

    status: str = Field(..., description="Estado de la API")
    database: str = Field(..., description="Estado de conexión a DB")
    version: str = Field(..., description="Versión de la API")
