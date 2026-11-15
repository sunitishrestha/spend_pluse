from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.core.exceptions import EmailAlreadyRegistered
from app.models.user import User


class UserRepository:
    """All database access for users lives here and nowhere else."""

    def __init__(self, db: Session) -> None:
        self.db = db

    def get_by_email(self, email: str) -> User | None:
        return self.db.scalar(select(User).where(User.email == email))

    def get_by_id(self, user_id: int) -> User | None:
        return self.db.get(User, user_id)

    def create(self, user: User) -> User:
        try:
            self.db.add(user)
            self.db.commit()
        except IntegrityError:
            # Two people signing up with the same email at the same moment
            self.db.rollback()
            raise EmailAlreadyRegistered()
        self.db.refresh(user)
        return user