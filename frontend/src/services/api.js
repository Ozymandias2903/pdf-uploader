import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const uploadPdf = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return axios.post(`${API_URL}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const askQuestion = async (document_id, question) => {
  return axios.post(`${API_URL}/ask`, { document_id, question });
};
