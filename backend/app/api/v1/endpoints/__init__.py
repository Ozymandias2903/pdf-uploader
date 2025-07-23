from fastapi import APIRouter
from .pdf import router as pdf_router
from .chat import router as chat_router

router = APIRouter()
router.include_router(pdf_router, prefix="/pdf", tags=["pdf"])
router.include_router(chat_router, prefix="/chat", tags=["chat"])
