import { configureStore } from "@reduxjs/toolkit";
import documentReducer from "../redux/slices/billingsSlice";

export default configureStore({
  reducer: documentReducer,
});
