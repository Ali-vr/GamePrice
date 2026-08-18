"""
Router para endpoints de precios
Expone endpoint para búsqueda de precios consolidados
"""

from fastapi import APIRouter, Query
from app.services.price_service import PriceService
from app.schemas.price import PriceResponse

router = APIRouter()


@router.get("/games/search-prices", response_model=PriceResponse)
async def search_game_prices(
    title: str = Query(..., min_length=1, description="Nombre del juego a buscar")
) -> PriceResponse:
    """
    Buscar y obtener precios de un videojuego desde múltiples tiendas.
    
    Consulta:
    - Steam Argentina (precios en ARS)
    - CheapShark (múltiples tiendas, precios en USD)
    
    Ejemplo:
        GET /api/games/search-prices?title=Elden%20Ring
    
    Args:
        title: Nombre del juego (requerido)
        
    Returns:
        PriceResponse con precios consolidados de Steam y CheapShark
    """
    return await PriceService.get_game_prices(title)
