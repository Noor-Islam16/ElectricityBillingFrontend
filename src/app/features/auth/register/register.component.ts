import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/authentication/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
  ],
})
export class RegisterComponent {
  hidePassword = true;
  hideConfirmPassword = true;
  registerForm: FormGroup;
  titles: string[] = ['Mr', 'Mrs', 'Ms', 'Dr'];
  countryCodes: string[] = ['+91', '+1', '+44', '+61'];
  error: string = '';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        consumerId: [
          '',
          [Validators.required, Validators.pattern('^[0-9]{13}$')],
        ],
        billNumber: [
          '',
          [Validators.required, Validators.pattern('^[0-9]{5}$')],
        ],
        title: ['', Validators.required],
        customerName: ['', [Validators.required, Validators.maxLength(50)]],
        email: ['', [Validators.required, Validators.email]],
        countryCode: ['+91', Validators.required],
        mobileNumber: [
          '',
          [Validators.required, Validators.pattern('^[0-9]{10}$')],
        ],
        userId: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(20),
          ],
        ],
        password: ['', [Validators.required, Validators.maxLength(30)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: this.passwordMatchValidator.bind(this),
      }
    );
  }

  // Make this a class method
  passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    return password.value === confirmPassword.value
      ? null
      : { passwordMismatch: true };
  }

  // Rest of your component code remains the same
  onSubmit(): void {
    if (this.registerForm.valid) {
      this.loading = true;

      const formData = {
        ...this.registerForm.value,
        mobileNumber:
          this.registerForm.value.countryCode +
          this.registerForm.value.mobileNumber,
        status: 'Active',
      };

      delete formData.countryCode;
      delete formData.confirmPassword;

      console.log('Sending registration data:', formData);

      this.authService.register(formData).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          this.router.navigate(['/auth/login']);
        },
        error: (error: any) => {
          console.error('Registration error:', error);
          this.error = error.error || 'Registration failed';
          this.loading = false;
        },
      });
    }
  }

  onReset(): void {
    this.registerForm.reset({
      countryCode: '+91',
    });
    this.error = '';
  }
}
