import asyncio
from app.db.collections import get_documents_collection
from app.core.logger import logger


async def create_indexes():
    collection = get_documents_collection()
    logger.info("Creating MongoDB indexes if not exist...")
    await collection.create_index([("text", "text")])
    logger.info("Indexes created.")
