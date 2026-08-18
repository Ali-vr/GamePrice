"""
Router para health check
Verifica el estado de la API y conexión a base de datos
"""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.price import HealthResponse

router = APIRouter()


@router.get("/health", response_model=HealthResponse, tags=["health"])
async def health_check(db: Session = Depends(get_db)):
    """
    Verificar el estado de la API y su conexión a la base de datos.
    
    Returns:
        HealthResponse con estado de API y DB
    """
    db_status = "connected"

    try:
        # Intentar una consulta simple a la base de datos
        db.execute("SELECT 1")
    except Exception as e:
        db_status = f"error: {str(e)}"

    return HealthResponse(
        status="ok" if db_status == "connected" else "degraded",
        database=db_status,
        version="0.1.0",
    )
