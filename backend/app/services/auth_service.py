from app.core.exceptions import (
    EmailAlreadyRegistered,
    InactiveUser,
    InvalidCredentials,
    InvalidToken,
)
from app.core.security import PasswordHasher, TokenService
from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.schemas.auth import AuthResponse, LoginRequest, SignupRequest, UserOut


class AuthService:
    """The business rules of signing up and logging in."""

    def __init__(
        self, users: UserRepository, hasher: PasswordHasher, tokens: TokenService
    ) -> None:
        self.users = users
        self.hasher = hasher
        self.tokens = tokens

    def signup(self, data: SignupRequest) -> AuthResponse:
        email = data.email.lower()

        if self.users.get_by_email(email):
            raise EmailAlreadyRegistered()

        user = self.users.create(
            User(
                full_name=data.full_name,
                email=email,
                password_hash=self.hasher.hash(data.password),
                default_currency=data.currency,
            )
        )
        return self._build_response(user)

    def login(self, data: LoginRequest) -> AuthResponse:
        user = self.users.get_by_email(data.email.lower())

        if user is None:
            # Do the same amount of work as a real check, so timing doesn't reveal
            # whether the email exists
            self.hasher.verify(data.password, self.hasher.dummy_hash)
            raise InvalidCredentials()

        if not self.hasher.verify(data.password, user.password_hash):
            raise InvalidCredentials()

        if not user.is_active:
            raise InactiveUser()

        return self._build_response(user)

    def get_user_from_token(self, token: str) -> User:
        user = self.users.get_by_id(self.tokens.read_user_id(token))
        if user is None:
            raise InvalidToken()
        if not user.is_active:
            raise InactiveUser()
        return user

    def _build_response(self, user: User) -> AuthResponse:
        return AuthResponse(
            access_token=self.tokens.create_access_token(user.id),
            user=UserOut.model_validate(user),
        )