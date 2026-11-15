class AppError(Exception):
    status_code = 400
    message = "Something went wrong"

    def __init__(self, message: str | None = None):
        if message:
            self.message = message
        super().__init__(self.message)


class EmailAlreadyRegistered(AppError):
    status_code = 409
    message = "An account with this email already exists"


class InvalidCredentials(AppError):
    status_code = 401
    message = "Incorrect email or password"


class InvalidToken(AppError):
    status_code = 401
    message = "Your session is invalid or has expired. Please log in again"


class InactiveUser(AppError):
    status_code = 403
    message = "This account is disabled"