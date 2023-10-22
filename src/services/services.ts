import { FetchedDocument, Parameters } from "../types/types";
import axios from "../config/axios";

export const fetchDocuments = async (params: Parameters) => {
  return await axios.get<FetchedDocument[]>("documents", {
    params,
  });
};

export const fetchDocumentById = async (params: Parameters) => {
  return await axios.get<FetchedDocument>("documents/" + params.documentId, {
    params,
  });
};
