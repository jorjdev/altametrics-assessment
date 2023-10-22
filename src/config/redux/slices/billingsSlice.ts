import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDocuments, fetchDocumentById } from "../../../services/services";
import { Parameters, FetchedDocument } from "../../../types/types";

const initialState = {
  documents: [] as FetchedDocument[],
  document: {} as FetchedDocument,
  status: "idle",
  error: "",
};

export const fetchDocumentsThunk = createAsyncThunk<
  FetchedDocument[],
  Parameters
>("documents/fetchDocuments", async (params) => {
  const response = await fetchDocuments(params);
  return response.data;
});

export const fetchDocumentsByIdThunk = createAsyncThunk<
  FetchedDocument,
  Parameters
>("documents/fetchDocumentById", async (params) => {
  const response = await fetchDocumentById(params);
  return response.data;
});

const documentsSlice = createSlice({
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
      })
      .addCase(fetchDocumentsByIdThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDocumentsByIdThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.document = action.payload;
      })
      .addCase(fetchDocumentsByIdThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export default documentsSlice.reducer;
