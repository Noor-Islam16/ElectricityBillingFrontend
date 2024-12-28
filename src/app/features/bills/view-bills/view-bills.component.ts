import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BillService } from '../../../core/services/bill.service';
import { AuthService } from '../../../core/authentication/auth.service';

@Component({
  selector: 'app-view-bills',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './view-bills.component.html',
  styleUrls: ['./view-bills.component.css'],
})
export class ViewBillsComponent implements OnInit {
  bills: any[] = [];
  displayedColumns: string[] = [
    'billId',
    'billDate',
    'dueDate',
    'amount',
    'status',
    'actions',
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
      this.loadBills(user.customerId);
    } else {
      this.error = 'User information not found';
      this.loading = false;
    }
  }

  loadBills(consumerId: number) {
    this.billService.getBills(consumerId).subscribe({
      next: (data) => {
        this.bills = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load bills';
        this.loading = false;
        console.error('Error loading bills:', error);
      },
    });
  }
}
