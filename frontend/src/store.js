import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./slices/chatSlice";
import pdfReducer from "./slices/pdfSlice";

const store = configureStore({
  reducer: {
    chat: chatReducer,
    pdf: pdfReducer,
  },
});
export default store;
