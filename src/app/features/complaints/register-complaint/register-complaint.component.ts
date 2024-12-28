// register-complaint.component.ts
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
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/authentication/auth.service';
import { ComplaintService } from '../../../core/services/complaint.service';

@Component({
  selector: 'app-register-complaint',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './register-complaint.component.html',
  styleUrls: ['./register-complaint.component.css'],
})
export class RegisterComplaintComponent {
  complaintForm: FormGroup;
  complaintTypes = [
    'Billing Related',
    'Voltage Related',
    'Supply Related',
    'Meter Related',
    'Other',
  ];
  loading = false;
  error = '';
  success = '';

  constructor(
    private fb: FormBuilder,
    private complaintService: ComplaintService,
    private authService: AuthService
  ) {
    this.complaintForm = this.fb.group({
      category: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      contactPerson: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.complaintForm.valid) {
      this.loading = true;
      this.error = '';
      this.success = '';

      const user = this.authService.getCurrentUser();
      const complaintData = {
        ...this.complaintForm.value,
        consumerId: user.customerId,
      };

      this.complaintService.registerComplaint(complaintData).subscribe({
        next: () => {
          this.success = 'Complaint registered successfully!';
          this.complaintForm.reset();
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Failed to register complaint';
          this.loading = false;
        },
      });
    }
  }
}
