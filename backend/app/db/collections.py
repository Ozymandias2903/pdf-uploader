from fastapi import Request

def get_documents_collection(request: Request):
    return request.app.mongodb["pdfUploads"].documents
