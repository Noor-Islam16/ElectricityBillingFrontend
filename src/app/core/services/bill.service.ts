import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getBills(consumerId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/bills/view?consumerId=${consumerId}`);
  }

  getBillHistory(consumerId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/bills/history/${consumerId}`);
  }

  // Update this method to use the correct endpoint
  getBillDetails(billId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/payments/bill/${billId}`);
  }

  processBillPayment(billId: number, paymentData: any): Observable<any> {
    // Using URLSearchParams to send as request parameters
    const params = new URLSearchParams({
      billId: billId.toString(),
      amountPaid: paymentData.amountPaid.toString(),
      paymentMethod: 'CARD',
    });

    return this.http.post(
      `${this.apiUrl}/payments/process?${params.toString()}`,
      {}
    );
  }
}
