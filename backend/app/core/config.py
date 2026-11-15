from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    """Every setting comes from the .env files."""

    model_config= SettingsConfigDict(env_file=".env", extra="ignore")

    app_name: str = "SpendPulse API"
    database_url: str
    jwt_secret_key: str
    jwt_algorithm: str = "HS256"
    frontend_origin: str ="http://localhost:5173"

@lru_cache
def get_settings() -> Settings:
    """Get settings from the .env file."""
    return Settings()