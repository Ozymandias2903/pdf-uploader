import { useParams, useNavigate } from "react-router-dom";
import ChatBox from "../components/ChatBox";
import { useEffect } from "react";

export default function ChatPage() {
  const { documentId } = useParams();
  const navigate = useNavigate();

  // Redirect back to upload if no documentId is provided
  useEffect(() => {
    if (!documentId) {
      navigate("/");
    }
  }, [documentId, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-indigo-50 to-blue-100 p-6">
      <h2 className="text-3xl font-semibold text-indigo-700 mb-8">
        Chat with your Document
      </h2>
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg p-6">
        <ChatBox documentId={documentId} />
      </div>
    </div>
  );
}
