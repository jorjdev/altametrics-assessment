import { configureStore } from "@reduxjs/toolkit";
import documentReducer from "./slices/documentsSlices";

export default configureStore({
  reducer: documentReducer,
});
