from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.endpoints import router as api_router
from app.core.config import settings
from app.core.logger import logger
from app.db.client import get_mongo_client

app = FastAPI(title="AI PDF Q&A API")

@app.on_event("startup")
async def startup_event():
    app.mongodb_client = get_mongo_client()
    app.mongodb = app.mongodb_client[ "pdfUploads" ]
    logger.info("MongoDB client initialized at startup")

@app.on_event("shutdown")
async def shutdown_event():
    app.mongodb_client.close()
    logger.info("MongoDB client closed on shutdown")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api/v1")


@app.get("/", summary="Healthcheck endpoint")
async def root():
    return {"message": "AI PDF Q&A backend is running"}
