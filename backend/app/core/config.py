from pydantic_settings import BaseSettings
from pydantic import AnyHttpUrl
from typing import List


class Settings(BaseSettings):
    MONGODB_URI: str
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl]
    APP_HOST: str
    APP_PORT: int

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
