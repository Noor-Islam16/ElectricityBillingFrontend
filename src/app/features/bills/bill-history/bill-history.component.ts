import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BillService } from '../../../core/services/bill.service';
import { AuthService } from '../../../core/authentication/auth.service';

@Component({
  selector: 'app-bill-history',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './bill-history.component.html',
  styleUrls: ['./bill-history.component.css'],
})
export class BillHistoryComponent implements OnInit {
  billHistory: any[] = [];
  displayedColumns: string[] = [
    'billId',
    'billDate',
    'dueDate',
    'amount',
    'status',
  ];
  loading = true;
  error = '';

  constructor(
    private billService: BillService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user && user.customerId) {
      this.loadBillHistory(user.customerId);
    } else {
      this.error = 'User information not found';
      this.loading = false;
    }
  }

  loadBillHistory(consumerId: number) {
    this.billService.getBillHistory(consumerId).subscribe({
      next: (data) => {
        this.billHistory = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load bill history';
        this.loading = false;
        console.error('Error loading bill history:', error);
      },
    });
  }
}
