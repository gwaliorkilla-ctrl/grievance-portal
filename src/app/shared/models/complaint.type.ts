export interface Complaint {
  id: string;
  complainant_name: string;
  mobile_no: string;
  complaint_type: string;
  complaint_subtype: string;
  title: string;
  description: string;
  document_url?: string;
  created_at?: string;
}

export interface ComplaintFilters {
  page?: number;
  limit?: number;
  fromDate?: string;
  toDate?: string;
  type?: string;
}

export interface PaginatedComplaintsResponse {
  data: Complaint[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalRecords: number;
  };
}

export interface ComplaintCreateResponse {
  message: string;
  complaint: Complaint;
}