from datetime import datetime, timedelta, timezone

import bcrypt
import jwt

from app.core.exceptions import InvalidToken

BCRYPT_MAX_BYTES = 72


class PasswordHasher:
    """Hashes passwords with bcrypt. A hash is one-way: it can't be turned back."""

    def __init__(self) -> None:
        # Used to keep login timing the same when the email doesn't exist
        self.dummy_hash = self.hash("not-a-real-password")

    def hash(self, password: str) -> str:
        return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

    def verify(self, password: str, hashed: str) -> bool:
        raw = password.encode("utf-8")
        if len(raw) > BCRYPT_MAX_BYTES:
            return False
        return bcrypt.checkpw(raw, hashed.encode("utf-8"))


class TokenService:
    """Creates and reads JWT access tokens."""

    def __init__(self, secret: str, algorithm: str, expire_minutes: int) -> None:
        self.secret = secret
        self.algorithm = algorithm
        self.expire_minutes = expire_minutes

    def create_access_token(self, user_id: int) -> str:
        now = datetime.now(timezone.utc)
        payload = {
            "sub": str(user_id),
            "iat": now,
            "exp": now + timedelta(minutes=self.expire_minutes),
        }
        return jwt.encode(payload, self.secret, algorithm=self.algorithm)

    def read_user_id(self, token: str) -> int:
        try:
            payload = jwt.decode(token, self.secret, algorithms=[self.algorithm])
            return int(payload["sub"])
        except (jwt.PyJWTError, KeyError, ValueError):
            raise InvalidToken()