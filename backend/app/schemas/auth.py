from datetime import datetime
from typing import Annotated

from pydantic import BaseModel, ConfigDict, EmailStr, Field, StringConstraints, field_validator

ALLOWED_CURRENCIES = {"USD", "EUR", "GBP", "INR", "NPR"}

FullName = Annotated[str, StringConstraints(strip_whitespace=True, min_length=2, max_length=100)]


def _check_password_bytes(value: str) -> str:
    # bcrypt can only use the first 72 bytes of a password
    if len(value.encode("utf-8")) > 72:
        raise ValueError("Password must be at most 72 bytes long")
    return value


class SignupRequest(BaseModel):
    full_name: FullName
    email: EmailStr
    password: str = Field(min_length=8, max_length=72)
    currency: str = "USD"

    @field_validator("password")
    @classmethod
    def password_fits(cls, value: str) -> str:
        return _check_password_bytes(value)

    @field_validator("currency")
    @classmethod
    def currency_allowed(cls, value: str) -> str:
        value = value.upper()
        if value not in ALLOWED_CURRENCIES:
            raise ValueError("Unsupported currency")
        return value


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=72)


class UserOut(BaseModel):
    """What the API may reveal about a user. The password hash is never included."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    full_name: str
    email: str
    phone: str | None
    default_currency: str
    created_at: datetime


class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut