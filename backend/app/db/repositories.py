from bson import ObjectId
from pymongo.errors import PyMongoError
from fastapi import Request
from app.core.logger import logger

class DocumentRepository:
    def __init__(self, collection):
        self.collection = collection

    async def insert_document(self, doc: dict) -> str:
        try:
            result = await self.collection.insert_one(doc)
            logger.info(f"Inserted document with id {result.inserted_id}")
            return str(result.inserted_id)
        except PyMongoError as e:
            logger.error(f"Insert document failed: {e}")
            raise

    async def find_by_id(self, document_id: str) -> dict | None:
        try:
            obj_id = ObjectId(document_id)
            doc = await self.collection.find_one({"_id": obj_id})
            return doc
        except Exception as e:
            logger.error(f"Find document failed: {e}")
            raise
