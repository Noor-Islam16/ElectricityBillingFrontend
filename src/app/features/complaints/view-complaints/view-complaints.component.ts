import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';
import { ComplaintService } from '../../../core/services/complaint.service';
import { AuthService } from '../../../core/authentication/auth.service';

@Component({
  selector: 'app-view-complaints',
  templateUrl: './view-complaints.component.html',
  styleUrls: ['./view-complaints.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatProgressSpinnerModule,
    DatePipe,
  ],
})
export class ViewComplaintsComponent implements OnInit {
  complaints: any[] = [];
  displayedColumns = [
    'complaintId',
    'category',
    'description',
    'status',
    'complaintDate',
  ];
  loading = false;
  error = '';

  constructor(
    private complaintService: ComplaintService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user?.customerId) {
      this.loadComplaints(user.customerId);
    }
  }

  private loadComplaints(consumerId: number) {
    this.loading = true;
    this.complaintService.getComplaints(consumerId).subscribe({
      next: (data) => {
        this.complaints = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load complaints';
        this.loading = false;
      },
    });
  }

  getStatusClass(status: string): string {
    return status.toLowerCase();
  }
}
