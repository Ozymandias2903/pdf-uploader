from fastapi import APIRouter, HTTPException, status
from app.models.pdf import QuestionRequest, AnswerResponse
from app.db.repositories import DocumentRepository
from app.core.logger import logger

router = APIRouter()

@router.post("/ask", response_model=AnswerResponse, summary="Ask a question about uploaded PDF content")
async def ask_question(request: QuestionRequest):
    document_repo = DocumentRepository()
    doc = await document_repo.find_by_id(request.document_id)
    if not doc:
        logger.warning(f"Document {request.document_id} not found for question")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Document not found")

    # Placeholder logic for answer - integrate AI here!
    # For now, just echo question & truncated text snippet

    text = doc.get("text", "")
    if not text:
        return AnswerResponse(answer=None, success=False)

    # Here you would send (request.question + text) to your AI model and get a response
    # For demonstration, we just return a simple substring response
    snippet = text[:250].replace("\n", " ")
    answer = f"Based on your document, here is a preview: {snippet} ... (AI integration coming soon)"
    return AnswerResponse(answer=answer, success=True)
