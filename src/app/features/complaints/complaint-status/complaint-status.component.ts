import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { ComplaintService } from '../../../core/services/complaint.service';

@Component({
  selector: 'app-complaint-status',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './complaint-status.component.html',
  styleUrls: ['./complaint-status.component.css'],
})
export class ComplaintStatusComponent {
  statusForm: FormGroup;
  complaintDetails: any = null;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private complaintService: ComplaintService
  ) {
    this.statusForm = this.fb.group({
      complaintId: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }

  checkStatus() {
    if (this.statusForm.valid) {
      this.loading = true;
      this.error = '';
      this.complaintDetails = null;

      this.complaintService
        .getComplaintStatus(this.statusForm.value.complaintId)
        .subscribe({
          next: (data) => {
            this.complaintDetails = data;
            this.loading = false;
          },
          error: (error) => {
            this.error = 'Complaint not found';
            this.loading = false;
            console.error('Error fetching complaint:', error);
          },
        });
    }
  }

  resetForm() {
    this.statusForm.reset();
    this.complaintDetails = null;
    this.error = '';
  }

  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      OPEN: 'status-open',
      IN_PROGRESS: 'status-pending',
      RESOLVED: 'status-resolved',
      CLOSED: 'status-closed',
    };
    return statusMap[status] || '';
  }

  formatStatus(status: string): string {
    return status.replace('_', ' ');
  }
}
