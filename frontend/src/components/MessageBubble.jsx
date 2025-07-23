export default function MessageBubble({ isUser, text }) {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} my-1`}>
      <div
        className={`px-4 py-2 rounded-lg max-w-xs whitespace-pre-wrap ${
          isUser ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
