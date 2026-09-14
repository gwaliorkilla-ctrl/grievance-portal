import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { 
  Complaint, 
  ComplaintFilters, 
  PaginatedComplaintsResponse, 
  ComplaintCreateResponse 
} from '../../shared/models/complaint.type';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/complaints';
  registerComplaint(formData: FormData): Observable<ComplaintCreateResponse> {
    return this.http.post<ComplaintCreateResponse>(this.apiUrl, formData);
  }

  getComplaints(filters: ComplaintFilters = {}): Observable<PaginatedComplaintsResponse> {
    let params = new HttpParams();
    
    if (filters.page) params = params.set('page', filters.page.toString());
    if (filters.limit) params = params.set('limit', filters.limit.toString());
    if (filters.fromDate) params = params.set('fromDate', filters.fromDate);
    if (filters.toDate) params = params.set('toDate', filters.toDate);
    if (filters.type) params = params.set('type', filters.type);

    return this.http.get<PaginatedComplaintsResponse>(this.apiUrl, { params });
  }
  getComplaintById(id: string): Observable<Complaint> {
    return this.http.get<Complaint>(`${this.apiUrl}/${id}`);
  }
  deleteComplaint(id: string): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(`${this.apiUrl}/${id}`);
  }
}