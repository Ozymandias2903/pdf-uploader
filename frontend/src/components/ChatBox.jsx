import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, setLoading, setError } from "../slices/chatSlice";
import { askQuestion } from "../services/api";

export default function ChatBox() {
  const dispatch = useDispatch();
  const { messages, loading } = useSelector((state) => state.chat);
  const { documentId } = useSelector((state) => state.pdf);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    dispatch(addMessage({ role: "user", text: input.trim() }));
    dispatch(setLoading(true));
    try {
      const response = await askQuestion(documentId, input.trim());
      dispatch(addMessage({ role: "bot", text: response.data.answer }));
    } catch {
      dispatch(addMessage({ role: "bot", text: "Error getting answer." }));
    }
    dispatch(setLoading(false));
    setInput("");
  };

  return (
    <div className="bg-white mt-8 rounded-xl shadow p-6 max-w-2xl mx-auto">
      <div className="h-80 overflow-y-auto custom-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex my-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`px-4 py-2 rounded-lg max-w-xs break-words ${msg.role === "user" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-900"}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start my-2">
            <div className="px-4 py-2 rounded-lg max-w-xs bg-gray-200 text-gray-900 animate-pulse">Thinking...</div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex mt-4">
        <input
          className="flex-grow border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ask something about your PDF..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
          type="text"
        />
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-r hover:bg-blue-700 disabled:opacity-50 transition"
          type="submit"
          disabled={loading || !input.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
}
