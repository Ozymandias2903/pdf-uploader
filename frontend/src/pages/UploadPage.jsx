import { useNavigate } from "react-router-dom";
import FileUpload from "../components/FileUpload";

export default function UploadPage() {
  const navigate = useNavigate();

  async function handleUpload(file) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();

      // Navigate to chat page with documentId
      navigate(`/chat/${data.document_id}`);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-100 to-indigo-200 p-6">
      <header className="max-w-3xl w-full text-center mb-10 select-none">
        <h1 className="text-5xl font-extrabold text-indigo-700 mb-4">
          PDF Q&amp;A Chatbot
        </h1>
        <p className="text-xl text-indigo-900 max-w-xl mx-auto mb-2">
          Upload your PDF and get instant, AI-powered answers about its content.
        </p>
        <p className="text-indigo-700 max-w-md mx-auto">
          Simply upload your document to get started. Supported files: PDF only, up to 10MB.
        </p>
      </header>

      <div className="bg-white p-10 rounded-xl shadow-xl max-w-md w-full glassmorphism">
        <FileUpload onUpload={handleUpload} />
      </div>
    </div>
  );
}
