import { Parameters,FetchDocumentsResponse } from "../types/types";
import axios from "../config/axios";

export const fetchDocuments = async (params: Parameters) => {
  return await axios.get<FetchDocumentsResponse>("documents", {
    params
  });
};
