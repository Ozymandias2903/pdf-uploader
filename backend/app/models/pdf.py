from pydantic import BaseModel, Field
from typing import Optional

class UploadResponse(BaseModel):
    document_id: str = Field(..., description="ID of the uploaded PDF document")
    message: str = Field(..., description="Upload status message")


class QuestionRequest(BaseModel):
    document_id: str = Field(..., description="ID of the PDF document being queried")
    question: str = Field(..., description="User's question about the PDF content")


class AnswerResponse(BaseModel):
    answer: Optional[str] = Field(None, description="Answer to the user's question")
    success: bool = Field(..., description="Whether an answer was found")
