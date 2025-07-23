# backend/app/routes.py
from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
import shutil
import os
import tempfile

# Import functions from the new path
from .services.pdfStorage import extract_text_from_pdf, save_pdf_text_to_db, get_document_text_by_id

router = APIRouter()

@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDFs accepted")

    # Save temporarily
    temp_dir = tempfile.gettempdir()
    temp_file_path = os.path.join(temp_dir, file.filename)
    with open(temp_file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Extract text
    text = extract_text_from_pdf(temp_file_path)

    # Delete temp file
    os.remove(temp_file_path)

    # Store in DB
    doc_id = save_pdf_text_to_db(text)

    return {"document_id": doc_id, "message": "PDF uploaded and processed successfully"}

@router.post("/get_text/{doc_id}")
def get_text(doc_id: str):
    text = get_document_text_by_id(doc_id)
    if text is None:
        return JSONResponse(status_code=404, content={"message": "Document not found"})
    return {"text": text}
