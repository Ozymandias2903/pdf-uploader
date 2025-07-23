from fastapi import APIRouter, UploadFile, File, HTTPException, status
from fastapi.responses import JSONResponse
from app.models.pdf import UploadResponse
from app.services.pdfStorage import handle_pdf_upload, PDFProcessingError
from app.core.logger import logger

router = APIRouter()

@router.post(
    "/upload",
    response_model=UploadResponse,
    summary="Upload a PDF and extract text from it"
)
async def upload_pdf(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        logger.warning("Upload rejected: unsupported file type.")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Only PDF files are accepted")

    try:
        doc_id = await handle_pdf_upload(file)
        return UploadResponse(document_id=doc_id, message="PDF uploaded and processed successfully")
    except PDFProcessingError as e:
        logger.error(f"PDF processing failed: {str(e)}")
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=str(e))
    except Exception as e:
        logger.error(f"Unexpected error in PDF upload: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")
