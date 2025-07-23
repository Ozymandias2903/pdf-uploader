import { CloudArrowUpIcon, CheckCircleIcon, ChatBubbleLeftEllipsisIcon, BoltIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import FileUpload from '../components/FileUpload';
import ChatBox from '../components/ChatBox';

export default function Home() {
  const { documentId } = useSelector(state => state.pdf);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col">
      {/* Header / Hero */}
      <header className="py-12 text-center px-4 max-w-4xl mx-auto select-none">
        <h1 className="text-5xl font-extrabold text-indigo-700 mb-4">PDF Q&amp;A Chatbot</h1>
        <p className="text-xl text-indigo-900 max-w-2xl mx-auto">
          Upload your PDF and get instant, AI-powered answers from your documents.
        </p>
      </header>

      {/* Upload Card */}
      <main className="flex-grow flex flex-col items-center px-4">
        <div className="bg-white shadow-xl rounded-2xl p-10 mt-6 max-w-xl w-full text-center glassmorphism">
          <CloudArrowUpIcon className="w-20 h-20 mx-auto mb-6 text-indigo-400" />
          <h2 className="text-3xl font-semibold mb-2">Upload Your PDF</h2>
          <p className="text-gray-600 mb-8">
            Drag & drop or click to select a PDF file to begin. Supported files: PDF only, up to 10MB.
          </p>

          <FileUpload />

          {/* Quick Start Steps */}
          <div className="mt-10">
            <ul className="flex justify-around text-gray-600 space-x-6 select-none">
              <li className="flex flex-col items-center space-y-2">
                <CheckCircleIcon className="w-8 h-8 text-green-500" />
                <span className="font-semibold">Upload</span>
              </li>
              <li className="flex flex-col items-center space-y-2">
                <ChatBubbleLeftEllipsisIcon className="w-8 h-8 text-blue-500" />
                <span className="font-semibold">Ask</span>
              </li>
              <li className="flex flex-col items-center space-y-2">
                <BoltIcon className="w-8 h-8 text-yellow-500" />
                <span className="font-semibold">Get Answers</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Demo Preview */}
        <div className="mt-10 bg-indigo-50 rounded-xl p-8 max-w-lg w-full shadow text-center select-none">
          <h3 className="font-semibold text-indigo-700 text-xl mb-4">How it works</h3>
          <div className="flex flex-col gap-3 max-w-md mx-auto">
            <div className="self-end bg-blue-100 text-blue-900 rounded-lg px-5 py-3 max-w-xs whitespace-pre-wrap shadow">
              Who is the author of this document?
            </div>
            <div className="self-start bg-white rounded-lg px-5 py-3 max-w-xs whitespace-pre-wrap shadow">
              The document was written by Jane Doe.
            </div>
          </div>
          <button
            type="button"
            className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
            onClick={() => alert("Please upload a PDF to try the chat!")}
          >
            Try Demo
          </button>
        </div>

        {/* Chatbox appears once PDF uploaded */}
        {documentId && (
          <div className="w-full max-w-3xl mt-12 mb-12 px-4">
            <ChatBox />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-indigo-900 text-indigo-300 text-center py-6 mt-auto select-none">
        &copy; 2025 PDF Q&A Chatbot. Powered by AI.
      </footer>
    </div>
  );
}
