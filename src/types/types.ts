export interface FetchedDocument {
  type: string;
  id: number;
  amount_formatted: string;
  issued_at: Date;
  contact_name: string;
  contact_phone: string;
  due_at: Date;
  document_number: string;
  status: string;
  contact_email: string;
  contact_tax_number: string;
  created_at: Date;
  updated_at: Date;
  category: {
    name: string;
  };
  contact_address: string;
}
export interface ResourceMetadata {
  current_page?: number;
  last_page?: number;
  per_page?: number;
  total_elements?: number;
}

export interface FetchDocumentsResponse {
  data: FetchedDocument[];
  meta: ResourceMetadata;
}

export interface Parameters {
  page?: number;
  limit?: number;
  search: string;
}

export interface RootState {
  documents: FetchDocumentsResponse;
  status: string;
  error: string;
}
