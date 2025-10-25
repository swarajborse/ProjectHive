from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

"""
Database configuration and session factory.

- Uses a local SQLite database file `items.db` for this example.
- SessionLocal is a SQLAlchemy session factory to be used via dependency injection.
"""

SQLALCHEMY_DATABASE_URL = "sqlite:///./items.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
# SessionLocal is a factory for sessions. Use `SessionLocal()` to get a Session instance.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
