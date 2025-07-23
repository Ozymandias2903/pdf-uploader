import { createSlice } from "@reduxjs/toolkit";

const pdfSlice = createSlice({
  name: "pdf",
  initialState: {
    documentId: null,
    uploading: false,
    uploadError: null,
  },
  reducers: {
    setDocumentId: (state, action) => {
      state.documentId = action.payload;
    },
    setUploading: (state, action) => {
      state.uploading = action.payload;
    },
    setUploadError: (state, action) => {
      state.uploadError = action.payload;
    },
    resetPdf: (state) => {
      state.documentId = null;
      state.uploadError = null;
      state.uploading = false;
    },
  },
});

export const { setDocumentId, setUploading, setUploadError, resetPdf } = pdfSlice.actions;
export default pdfSlice.reducer;
