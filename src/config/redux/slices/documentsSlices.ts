import { createSlice, createAsyncThunk, Slice } from "@reduxjs/toolkit";
import { fetchDocuments } from "../../../services/services";
import {
  Parameters,
  FetchDocumentsResponse,
} from "../../../types/types";

const initialState = {
  documents: {
    data: [],
    meta: {},
  } as FetchDocumentsResponse,
  status: "idle",
  error: "",
};

export const fetchDocumentsThunk = createAsyncThunk<
  any,
  // should be FetchDocumentsRespose but Typescript throws exception. will investigate.
  Parameters
>("documents/fetchDocuments", async (params) => {
  const { data } = await fetchDocuments(params);
  return data;
});

const documentsSlice: Slice = createSlice({
  name: "documents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocumentsThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDocumentsThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.documents = action.payload;
      })
      .addCase(fetchDocumentsThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });
  },
});
export default documentsSlice.reducer;
