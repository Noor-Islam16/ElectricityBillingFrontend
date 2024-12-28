import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-payment-confirmation',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, // Make sure RouterModule is imported
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './payment-confirmation.component.html',
  styleUrls: ['./payment-confirmation.component.css'],
})
export class PaymentConfirmationComponent {
  transaction: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.transaction = navigation?.extras?.state?.['transaction'];
    if (!this.transaction) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit() {}

  downloadReceipt() {
    const receiptContent = `
Payment Receipt
--------------------------
Transaction ID: ${this.transaction.transactionId}
Amount Paid: ₹${this.transaction.amountPaid}
Date: ${new Date(this.transaction.paymentDate).toLocaleString()}
Payment Method: Card Payment
--------------------------
   `;

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `receipt_${this.transaction.transactionId}.txt`;
    link.click();
    window.URL.revokeObjectURL(url);
  }
}
