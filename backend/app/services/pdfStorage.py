import pdfplumber
import tempfile
import os
from fastapi import Request, UploadFile, HTTPException
from app.db.repositories import DocumentRepository
from app.core.logger import logger
from app.db.collections import get_documents_collection

class PDFProcessingError(Exception):
    pass

async def extract_text_from_pdf(file_path: str) -> str:
    try:
        full_text = ""
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                text = page.extract_text()
                if text:
                    full_text += text + "\n"
        return full_text
    except Exception as e:
        logger.error(f"PDF text extraction failed: {e}")
        raise PDFProcessingError("Failed to extract text from PDF")

async def handle_pdf_upload(request: Request, file: UploadFile) -> str:
    try:
        # Save file temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
            contents = await file.read()
            tmp.write(contents)
            tmp_path = tmp.name

        # Extract text
        text = await extract_text_from_pdf(tmp_path)
        os.unlink(tmp_path)

        if not text.strip():
            raise PDFProcessingError("PDF contains no usable text")

        # Get collection using request
        collection = get_documents_collection(request)
        repo = DocumentRepository(collection)

        # Insert to DB
        document_id = await repo.insert_document({"text": text})
        return document_id
    except PDFProcessingError:
        raise
    except Exception as e:
        logger.error(f"handle_pdf_upload error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")
