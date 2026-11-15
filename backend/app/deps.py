from functools import lru_cache
from typing import Iterator

from fastapi import Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.core.exceptions import InvalidToken
from app.core.security import PasswordHasher, TokenService
from app.db.session import database
from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.services.auth_service import AuthService

bearer_scheme = HTTPBearer(auto_error=False)


def get_db() -> Iterator[Session]:
    session = database.session()
    try:
        yield session
    finally:
        session.close()


@lru_cache
def get_hasher() -> PasswordHasher:
    return PasswordHasher()


@lru_cache
def get_token_service() -> TokenService:
    settings = get_settings()
    return TokenService(
        settings.jwt_secret, settings.jwt_algorithm, settings.access_token_expire_minutes
    )


def get_auth_service(
    db: Session = Depends(get_db),
    hasher: PasswordHasher = Depends(get_hasher),
    tokens: TokenService = Depends(get_token_service),
) -> AuthService:
    return AuthService(UserRepository(db), hasher, tokens)


def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
    service: AuthService = Depends(get_auth_service),
) -> User:
    """Use this on any endpoint that needs a logged-in user."""
    if credentials is None:
        raise InvalidToken("Not authenticated")
    return service.get_user_from_token(credentials.credentials)