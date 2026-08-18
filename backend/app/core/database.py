"""
Configuración de base de datos con SQLAlchemy
Scaffolding para conexión a PostgreSQL
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.ext.declarative import declarative_base
from app.core.config import settings

# Crear engine de SQLAlchemy
engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,  # Verificar conexión antes de usar
    echo=settings.DEBUG,  # Mostrar SQL en desarrollo
)

# Crear session factory
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

# Base para declarar modelos
Base = declarative_base()


def get_db() -> Session:
    """
    Dependencia para obtener sesión de base de datos en endpoints.
    Uso en FastAPI:
        @app.get("/")
        def read_root(db: Session = Depends(get_db)):
            ...
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
