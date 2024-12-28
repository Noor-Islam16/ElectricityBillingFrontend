import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComplaintService {
  private apiUrl = 'http://localhost:8080/api/complaints';

  constructor(private http: HttpClient) {}

  registerComplaint(complaint: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, complaint);
  }

  getComplaintStatus(complaintId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/status/${complaintId}`);
  }

  getComplaints(consumerId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/view?consumerId=${consumerId}`);
  }
}
