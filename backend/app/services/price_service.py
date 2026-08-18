"""
Servicio de precios - Orquestación de integraciones
Combina datos de Steam y CheapShark en una respuesta unificada
"""

import logging
from typing import Optional
from decimal import Decimal
from app.integrations.steam import SteamIntegration, SteamAPIError
from app.integrations.cheapshark import CheapSharkIntegration, CheapSharkAPIError
from app.schemas.price import PriceResponse, StorePrice

logger = logging.getLogger(__name__)


class PriceService:
    """
    Servicio de orquestación para obtener precios de múltiples fuentes.
    
    Responsabilidades:
    - Consultar Steam API para precio en Argentina (ARS)
    - Consultar CheapShark para ofertas en múltiples tiendas (USD)
    - Unificar respuestas
    - Manejar errores sin fallar completamente si una fuente falla
    """

    @staticmethod
    async def get_game_prices(game_title: str) -> PriceResponse:
        """
        Obtener precios de un juego desde múltiples fuentes.
        
        Args:
            game_title: Nombre del juego a buscar
            
        Returns:
            PriceResponse con precios consolidados de Steam y CheapShark
        """
        steam_price = None
        cheapshark_deals = []
        errors = []

        # Intentar obtener precio de Steam
        try:
            logger.info(f"Consultando Steam para: {game_title}")
            steam_data = await SteamIntegration.get_game_price_by_name(game_title)

            if steam_data:
                steam_price = StorePrice(
                    store="Steam Argentina",
                    price=Decimal(str(steam_data.get("price", 0)))
                    if steam_data.get("price")
                    else None,
                    currency=steam_data.get("currency", "ARS"),
                    discount_percent=steam_data.get("discount_percent", 0),
                    normal_price=Decimal(str(steam_data.get("original_price", 0)))
                    if steam_data.get("original_price")
                    else None,
                )
                logger.info(f"Steam encontró: {steam_data.get('name')} - {steam_price.price} {steam_price.currency}")
            else:
                logger.info(f"Juego no encontrado en Steam: {game_title}")

        except SteamAPIError as e:
            error_msg = f"Error en Steam: {str(e)}"
            logger.warning(error_msg)
            errors.append(error_msg)
        except Exception as e:
            error_msg = f"Error inesperado en Steam: {str(e)}"
            logger.error(error_msg)
            errors.append(error_msg)

        # Intentar obtener precios de CheapShark
        try:
            logger.info(f"Consultando CheapShark para: {game_title}")
            deals = await CheapSharkIntegration.get_deals_by_game_title(game_title)

            if deals:
                cheapshark_deals = [
                    StorePrice(
                        store=deal.get("store", "Unknown"),
                        price=Decimal(str(deal.get("price", 0)))
                        if deal.get("price")
                        else None,
                        currency=deal.get("currency", "USD"),
                        discount_percent=deal.get("discount_percent", 0),
                        normal_price=Decimal(str(deal.get("normal_price", 0)))
                        if deal.get("normal_price")
                        else None,
                    )
                    for deal in deals
                ]
                logger.info(
                    f"CheapShark encontró {len(cheapshark_deals)} tiendas"
                )
            else:
                logger.info(f"No se encontraron ofertas en CheapShark: {game_title}")

        except CheapSharkAPIError as e:
            error_msg = f"Error en CheapShark: {str(e)}"
            logger.warning(error_msg)
            errors.append(error_msg)
        except Exception as e:
            error_msg = f"Error inesperado en CheapShark: {str(e)}"
            logger.error(error_msg)
            errors.append(error_msg)

        # Determinar estado final
        status = "success" if (steam_price or cheapshark_deals) else "no_results"
        error_message = " | ".join(errors) if errors else None

        return PriceResponse(
            game_title=game_title,
            steam_price=steam_price,
            cheapshark_deals=cheapshark_deals,
            status=status,
            error_message=error_message,
        )
