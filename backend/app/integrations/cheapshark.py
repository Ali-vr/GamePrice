"""
Integración con CheapShark API
Cliente para obtener precios de videojuegos desde múltiples tiendas
"""

import httpx
import logging
from typing import List, Dict, Any, Optional
from datetime import datetime, timedelta
from app.core.config import settings

logger = logging.getLogger(__name__)


class CheapSharkAPIError(Exception):
    """Excepción para errores de CheapShark API"""
    pass


class CheapSharkIntegration:
    """
    Cliente para interactuar con CheapShark API.
    
    Características:
    - Cubre 30+ tiendas (Steam, Epic, GOG, Humble, etc.)
    - No requiere API key
    - Precios principalmente en USD
    - Rate limit: 1 request por segundo recomendado
    """

    BASE_URL = "https://www.cheapshark.com/api/1.0"
    TIMEOUT = 10  # segundos
    
    # Caché en memoria para mapeo de tiendas (store_id -> nombre)
    _store_mapping_cache: Optional[Dict[str, str]] = None
    _store_mapping_time: Optional[datetime] = None
    _cache_ttl_hours = 24

    @staticmethod
    async def get_store_mapping() -> Dict[str, str]:
        """
        Obtener mapeo de store IDs a nombres de tiendas.
        Cachea el resultado durante 24 horas.
        
        Returns:
            Dict con {store_id: store_name}
        """
        now = datetime.now()

        # Usar caché si existe y no ha expirado
        if (
            CheapSharkIntegration._store_mapping_cache is not None
            and CheapSharkIntegration._store_mapping_time is not None
            and (now - CheapSharkIntegration._store_mapping_time)
            < timedelta(hours=CheapSharkIntegration._cache_ttl_hours)
        ):
            return CheapSharkIntegration._store_mapping_cache

        try:
            async with httpx.AsyncClient(timeout=CheapSharkIntegration.TIMEOUT) as client:
                response = await client.get(f"{CheapSharkIntegration.BASE_URL}/stores")
                response.raise_for_status()

                stores = response.json()
                # Mapeo: {storeID: storeName}
                mapping = {str(store["storeID"]): store["storeName"] for store in stores}

                # Guardar en caché
                CheapSharkIntegration._store_mapping_cache = mapping
                CheapSharkIntegration._store_mapping_time = now

                logger.info(f"Caché de tiendas actualizado: {len(mapping)} tiendas")
                return mapping

        except httpx.TimeoutException:
            logger.error("Timeout en CheapShark API al obtener tiendas")
            raise CheapSharkAPIError("CheapShark API timeout al obtener tiendas")
        except httpx.HTTPError as e:
            logger.error(f"Error HTTP en CheapShark API: {str(e)}")
            raise CheapSharkAPIError(f"CheapShark API HTTP error: {str(e)}")
        except Exception as e:
            logger.error(f"Error inesperado en get_store_mapping: {str(e)}")
            raise CheapSharkAPIError(f"Error inesperado: {str(e)}")

    @staticmethod
    async def search_games(game_title: str, limit: int = 5) -> List[Dict[str, Any]]:
        """
        Buscar juegos por nombre.
        
        Args:
            game_title: Nombre del juego a buscar
            limit: Número máximo de resultados (default 5)
            
        Returns:
            Lista de juegos encontrados con id, título, thumb
        """
        try:
            async with httpx.AsyncClient(timeout=CheapSharkIntegration.TIMEOUT) as client:
                response = await client.get(
                    f"{CheapSharkIntegration.BASE_URL}/games",
                    params={
                        "title": game_title,
                        "limit": limit,
                    }
                )
                response.raise_for_status()

                games = response.json()
                return games if isinstance(games, list) else []

        except httpx.TimeoutException:
            logger.error(f"Timeout en CheapShark al buscar: {game_title}")
            raise CheapSharkAPIError(f"CheapShark timeout al buscar '{game_title}'")
        except httpx.HTTPError as e:
            logger.error(f"Error HTTP en CheapShark: {str(e)}")
            raise CheapSharkAPIError(f"CheapShark HTTP error: {str(e)}")
        except Exception as e:
            logger.error(f"Error inesperado en search_games: {str(e)}")
            raise CheapSharkAPIError(f"Error buscando juego: {str(e)}")

    @staticmethod
    async def get_game_deals(game_id: str) -> List[Dict[str, Any]]:
        """
        Obtener todas las ofertas (deals) de un juego específico.
        
        Args:
            game_id: ID del juego en CheapShark
            
        Returns:
            Lista de deals con store, precio actual, precio normal, descuento
        """
        try:
            # Obtener mapeo de tiendas
            store_mapping = await CheapSharkIntegration.get_store_mapping()

            async with httpx.AsyncClient(timeout=CheapSharkIntegration.TIMEOUT) as client:
                response = await client.get(
                    f"{CheapSharkIntegration.BASE_URL}/games",
                    params={"id": game_id},
                )
                response.raise_for_status()

                game_data = response.json()

                if not game_data:
                    logger.warning(f"Juego no encontrado: {game_id}")
                    return []

                deals = game_data.get("deals", [])

                # Procesar deals y mapear store IDs a nombres
                processed_deals = []
                for deal in deals:
                    store_id = str(deal.get("storeID"))
                    store_name = store_mapping.get(store_id, f"Store {store_id}")

                    processed_deals.append(
                        {
                            "store": store_name,
                            "store_id": store_id,
                            "price": float(deal.get("price", 0)),
                            "normal_price": float(deal.get("normalPrice", 0)),
                            "currency": "USD",  # CheapShark usa USD
                            "discount_percent": int(deal.get("savings", 0) or 0),
                            "deal_rating": float(deal.get("dealRating", 0)),
                            "last_change": deal.get("lastChange", 0),
                        }
                    )

                return processed_deals

        except CheapSharkAPIError:
            raise
        except httpx.TimeoutException:
            logger.error(f"Timeout en CheapShark al obtener deals para {game_id}")
            raise CheapSharkAPIError(f"CheapShark timeout para juego {game_id}")
        except httpx.HTTPError as e:
            logger.error(f"Error HTTP en CheapShark: {str(e)}")
            raise CheapSharkAPIError(f"CheapShark HTTP error: {str(e)}")
        except Exception as e:
            logger.error(f"Error inesperado en get_game_deals: {str(e)}")
            raise CheapSharkAPIError(f"Error obteniendo deals: {str(e)}")

    @staticmethod
    async def get_deals_by_game_title(game_title: str) -> List[Dict[str, Any]]:
        """
        Obtener todas las ofertas de un juego por su nombre.
        Combina search + get_deals en una llamada.
        
        Args:
            game_title: Nombre del juego
            
        Returns:
            Lista de deals (ofertas) de todas las tiendas
        """
        try:
            # Buscar juego
            games = await CheapSharkIntegration.search_games(game_title, limit=1)
            if not games:
                logger.info(f"No se encontraron juegos en CheapShark: {game_title}")
                return []

            game_id = games[0].get("gameID")
            if not game_id:
                return []

            # Obtener deals
            deals = await CheapSharkIntegration.get_game_deals(game_id)
            return deals

        except CheapSharkAPIError:
            raise
        except Exception as e:
            logger.error(f"Error en get_deals_by_game_title: {str(e)}")
            raise CheapSharkAPIError(f"Error obteniendo deals para {game_title}: {str(e)}")
