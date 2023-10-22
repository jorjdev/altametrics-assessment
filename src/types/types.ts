export interface FetchedDocument {
  type: string;
  id: number;
  amount: string;
  payee: string;
  date: Date;
  documentNumber: string;
  status: string;
}

export interface Parameters {
  page?: number;
  limit?: number;
  documentId?: number;
  search: string;
}

export interface RootState {
  documents: FetchedDocument[];
  document: FetchedDocument;
  status: string;
  error: string;
}
