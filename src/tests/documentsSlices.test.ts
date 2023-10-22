import { fetchDocumentsThunk } from "../config/redux/slices/documentsSlices";
import {
  FetchDocumentsResponse,
  FetchedDocument,
  Parameters,
} from "../types/types";
import { beforeEach, expect, test } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import documentsSlice from "../config/redux/slices/documentsSlices";
import moment from "moment";

let store: any;
const mockResponse: FetchedDocument[] = [
  {
    type: "invoice",
    id: 1234,
    amount_formatted: "$612",
    issued_at: moment("2023-09-29T00:15:44+01:00").toDate(),
    contact_name: "TestName",
    contact_phone: "+14842989274",
    due_at: moment("2023-10-29T00:15:44+01:00").toDate(),
    document_number: "12345678",
    contact_email: "test@test.com",
    contact_tax_number: "12312512",
    created_at: moment("2023-10-29T00:15:44+01:00").toDate(),
    updated_at: moment("2023-10-29T00:15:44+01:00").toDate(),
    category: {
      name: "category_test",
    },
    contact_address: "Address_Test Test",
    status: "cancelled",
  },
];
beforeEach(() => {
  store = configureStore({
    reducer: {
      documents: documentsSlice,
    },
  });
});

test("documentsSlice reducer should handle fetchDocumentsThunk.fulfilled", () => {
  const prevState = {
    documents: {
      data: [],
      meta: {},
    } as FetchDocumentsResponse,
    status: "idle",
    error: "",
  };

  const action = {
    type: fetchDocumentsThunk.fulfilled.type,
    payload: mockResponse,
  };

  const nextState = documentsSlice(prevState, action);

  expect(nextState.status).toBe("succeeded");
  expect(nextState.documents).toEqual(mockResponse);
});

test("documentsSlice reducer should handle fetchDocumentsThunk.rejected", () => {
  const prevState = {
    documents: {
      data: [],
      meta: {},
    },
    status: "idle",
    error: "",
  };

  const errorPayload = "An error occurred";

  const action = {
    type: fetchDocumentsThunk.rejected.type,
    error: errorPayload,
  };

  const nextState = documentsSlice(prevState, action);

  expect(nextState.status).toBe("failed");
  expect(nextState.error).toEqual(errorPayload);
});
