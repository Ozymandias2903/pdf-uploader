import pdfplumber
from bson.objectid import ObjectId
from ..db import documents_collection

def extract_text_from_pdf(file_path: str) -> str:
    text = ""
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
    return text

def save_pdf_text_to_db(text: str) -> str:
    result = documents_collection.insert_one({"text": text})
    return str(result.inserted_id)

def get_document_text_by_id(doc_id: str) -> str:
    doc = documents_collection.find_one({"_id": ObjectId(doc_id)})
    if doc:
        return doc.get("text", "")
    return None
