import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BillService } from '../../../core/services/bill.service';

@Component({
  selector: 'app-pay-bill',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './pay-bill.component.html',
  styleUrls: ['./pay-bill.component.css'],
})
export class PayBillComponent implements OnInit {
  paymentForm: FormGroup;
  loading = false;
  error = '';
  billDetails: any;
  billId: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private billService: BillService
  ) {
    this.paymentForm = this.fb.group({
      cardNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{16}$')],
      ],
      cardHolderName: ['', [Validators.required, Validators.minLength(3)]],
      expiryDate: [
        '',
        [
          Validators.required,
          Validators.pattern('^(0[1-9]|1[0-2])/([0-9]{2})$'),
        ],
      ],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
    });
  }

  ngOnInit() {
    this.billId = Number(this.route.snapshot.params['billId']);
    this.getBillDetails(this.billId);
  }

  getBillDetails(billId: number) {
    this.billService.getBillDetails(billId).subscribe({
      next: (data) => {
        this.billDetails = data;
      },
      error: (error) => {
        this.error = 'Failed to load bill details';
        console.error('Error:', error);
      },
    });
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      this.loading = true;

      const paymentData = {
        amountPaid: this.billDetails.dueAmount,
        paymentMethod: 'CARD',
      };

      this.billService.processBillPayment(this.billId, paymentData).subscribe({
        next: (response) => {
          console.log('Payment successful:', response);
          this.router.navigate(['/bills/payment-confirmation'], {
            state: { transaction: response },
          });
        },
        error: (error) => {
          console.error('Payment error:', error);
          this.error = 'Payment failed: ' + (error.error || error.message);
          this.loading = false;
        },
      });
    }
  }
}
