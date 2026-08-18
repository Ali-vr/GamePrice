"""
Integración con Steam Store API
Cliente para obtener información de juegos y precios desde Steam Argentina
"""

import httpx
import logging
from typing import Optional, Dict, Any
from app.core.config import settings

logger = logging.getLogger(__name__)


class SteamAPIError(Exception):
    """Excepción para errores de Steam API"""
    pass


class SteamIntegration:
    """
    Cliente para interactuar con Steam Store API (tienda argentina)
    
    Notas importantes:
    - Steam Argentina (cc=ar) devuelve precios directamente en ARS
    - No requiere API key para endpoints públicos
    - steam.appslist.json contiene lista de juegos disponibles
    - Respectar rate limits: ~100 requests por segundo por IP
    """

    BASE_URL = "https://store.steampowered.com/api"
    TIMEOUT = 10  # segundos

    @staticmethod
    async def search_game_by_name(game_title: str) -> Optional[Dict[str, Any]]:
        """
        Buscar un juego en Steam por nombre y obtener su App ID.
        
        Args:
            game_title: Nombre del juego a buscar
            
        Returns:
            Dict con app_id, name, si la búsqueda fue exitosa; None si no se encontró
        """
        try:
            async with httpx.AsyncClient(timeout=SteamIntegration.TIMEOUT) as client:
                # Endpoint de búsqueda de Steam (página de tienda)
                # Nota: Este es un scrape indirecto; la API oficial no tiene search
                # Usamos applist.json + filtrado manual como fallback
                response = await client.get(
                    f"{SteamIntegration.BASE_URL}/applist.json"
                )
                response.raise_for_status()

                data = response.json()
                apps = data.get("applist", {}).get("apps", [])

                # Buscar coincidencia por nombre (búsqueda simple)
                search_lower = game_title.lower()
                for app in apps:
                    if search_lower in app.get("name", "").lower():
                        return {
                            "app_id": app.get("appid"),
                            "name": app.get("name"),
                        }

                logger.warning(f"Juego no encontrado en Steam: {game_title}")
                return None

        except httpx.TimeoutException:
            logger.error(f"Timeout en Steam API al buscar: {game_title}")
            raise SteamAPIError(f"Steam API timeout al buscar '{game_title}'")
        except httpx.HTTPError as e:
            logger.error(f"Error HTTP en Steam API: {str(e)}")
            raise SteamAPIError(f"Steam API HTTP error: {str(e)}")
        except Exception as e:
            logger.error(f"Error inesperado en Steam search: {str(e)}")
            raise SteamAPIError(f"Error inesperado en Steam: {str(e)}")

    @staticmethod
    async def get_game_details(app_id: int) -> Optional[Dict[str, Any]]:
        """
        Obtener detalles y precio de un juego específico desde Steam Argentina.
        
        Args:
            app_id: App ID del juego en Steam
            
        Returns:
            Dict con precio, descuento, moneda (ARS), nombre, descripción, imagen
        """
        try:
            async with httpx.AsyncClient(timeout=SteamIntegration.TIMEOUT) as client:
                # appdetails devuelve datos para Argentina (cc=ar) en ARS
                response = await client.get(
                    f"{SteamIntegration.BASE_URL}/appdetails",
                    params={
                        "appids": str(app_id),
                        "cc": "ar",  # Argentina - precios en ARS
                        "json": 1,
                    }
                )
                response.raise_for_status()

                data = response.json()

                if str(app_id) not in data:
                    logger.warning(f"App ID no encontrado: {app_id}")
                    return None

                app_data = data[str(app_id)]

                if not app_data.get("success"):
                    logger.warning(f"Steam API no devolvió success para app {app_id}")
                    return None

                app_info = app_data.get("data", {})

                # Procesar información de precio
                price_overview = app_info.get("price_overview", {})
                price_ars = price_overview.get("final", None)  # Precio en centavos ARS
                discount_percent = price_overview.get("discount_percent", 0)

                # Convertir precio de centavos a pesos (dividir por 100)
                price_in_pesos = price_ars / 100 if price_ars else None

                return {
                    "app_id": app_id,
                    "name": app_info.get("name", ""),
                    "price": price_in_pesos,
                    "currency": "ARS",
                    "discount_percent": discount_percent,
                    "original_price": (price_ars / 100 / (1 - discount_percent / 100))
                    if price_ars and discount_percent > 0
                    else price_in_pesos,
                    "header_image": app_info.get("header_image", ""),
                    "description": app_info.get("short_description", "")[:200],  # Primeros 200 chars
                }

        except httpx.TimeoutException:
            logger.error(f"Timeout en Steam API para app {app_id}")
            raise SteamAPIError(f"Steam API timeout para app {app_id}")
        except httpx.HTTPError as e:
            logger.error(f"Error HTTP en Steam API: {str(e)}")
            raise SteamAPIError(f"Steam API HTTP error: {str(e)}")
        except Exception as e:
            logger.error(f"Error inesperado en Steam details: {str(e)}")
            raise SteamAPIError(f"Error inesperado en Steam: {str(e)}")

    @staticmethod
    async def get_game_price_by_name(game_title: str) -> Optional[Dict[str, Any]]:
        """
        Obtener información de precio de un juego por su nombre.
        Combina search + get_details en una llamada.
        
        Args:
            game_title: Nombre del juego
            
        Returns:
            Dict con información completa del juego y precio
        """
        try:
            # Buscar el app_id
            app_info = await SteamIntegration.search_game_by_name(game_title)
            if not app_info:
                return None

            # Obtener detalles
            details = await SteamIntegration.get_game_details(app_info["app_id"])
            return details

        except SteamAPIError:
            raise
        except Exception as e:
            logger.error(f"Error en get_game_price_by_name: {str(e)}")
            raise SteamAPIError(f"Error obteniendo precio de {game_title}: {str(e)}")
