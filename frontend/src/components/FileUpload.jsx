import { useRef, useState, useEffect } from "react";
import { CloudArrowUpIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Document, Page, pdfjs } from "react-pdf";

// Set workerSrc dynamically for pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function FileUpload({ onUpload }) {
  const inputRef = useRef();
  const [file, setFile] = useState(null);         // File object for preview
  const [fileName, setFileName] = useState(null); // Filename to display
  const [error, setError] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  const resetFile = () => {
    setFile(null);
    setFileName(null);
    setNumPages(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = null;
  };

  const validateAndUpload = async (selectedFile) => {
    if (!selectedFile) return;
    if (selectedFile.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      resetFile();
      return;
    }
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10MB limit.");
      resetFile();
      return;
    }
    setError(null);
    setFile(selectedFile);
    setFileName(selectedFile.name);
    setUploading(true);
    try {
      await onUpload(selectedFile);
    } catch {
      setError("Upload failed, please try again.");
      resetFile();
    }
    setUploading(false);
  };

  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    validateAndUpload(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    validateAndUpload(droppedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!dragging) setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const onDocumentLoadSuccess = ({ numPages: nextNumPages }) => {
    setNumPages(nextNumPages);
  };

  return (
    <div
      className={`glassmorphism cursor-pointer max-w-md mx-auto p-6 flex flex-col items-center border-2 border-transparent
      transition-all duration-300 rounded-2xl
      ${dragging ? "border-indigo-400 shadow-lg" : "border-transparent"}
      relative select-none`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => inputRef.current && inputRef.current.click()}
      aria-label="Drop or click to upload a PDF file"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") inputRef.current.click();
      }}
    >
      {!file && !uploading && (
        <>
          <CloudArrowUpIcon className="w-16 h-16 text-indigo-500 mb-4" />
          <p className="text-indigo-200 font-semibold mb-1">
            Drag & Drop your PDF here
          </p>
          <p className="text-sm text-indigo-300">or click to browse files</p>
          <p className="mt-2 text-xs text-indigo-300">
            Supported format: PDF only (max 10MB)
          </p>
        </>
      )}

      {uploading && (
        <p className="text-indigo-300 italic text-lg font-semibold">Uploading...</p>
      )}

      {file && (
        <div className="w-full flex flex-col items-center space-y-3">
          {/* PDF preview */}
          <div className="w-full border border-gray-300 rounded-md shadow-sm bg-white p-2">
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={<div className="text-center p-4 text-gray-500">Loading preview...</div>}
              className="flex justify-center"
            >
              <Page pageNumber={1} width={280} />
            </Document>
          </div>
          {/* Filename & Remove */}
          <div className="bg-indigo-700 bg-opacity-70 rounded-lg px-6 py-3 flex items-center space-x-4 w-full justify-between select-text">
            <span className="truncate text-white font-medium">{fileName}</span>
            <button
              type="button"
              aria-label="Remove uploaded file"
              title="Remove file"
              className="text-indigo-300 hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                resetFile();
              }}
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept="application/pdf"
        onChange={onFileChange}
        disabled={uploading}
      />

      {error && (
        <p className="mt-3 text-red-400 text-sm font-semibold">{error}</p>
      )}
    </div>
  );
}
