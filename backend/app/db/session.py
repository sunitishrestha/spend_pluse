from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from app.core.config import get_settings
from app.db.base import Base


class Database:
    """Owns the connection to PostgreSQL and hands out sessions."""

    def __init__(self, url: str) -> None:
        self.engine = create_engine(url, pool_pre_ping=True)
        self._session_factory = sessionmaker(
            bind=self.engine, autoflush=False, expire_on_commit=False
        )

    def session(self) -> Session:
        return self._session_factory()

    def create_tables(self) -> None:
        import app.models  # noqa: F401  (loads the models so Base knows them)

        Base.metadata.create_all(self.engine)


# One shared object. The rest of the app imports this lowercase name.
database = Database(get_settings().database_url)