import { Routes } from '@angular/router';
import { AuthGuard } from './core/authentication/auth.guard';
import { CustomerDashboardComponent } from './features/dashboard/customer-dashboard/customer-dashboard.component';
import { ViewBillsComponent } from './features/bills/view-bills/view-bills.component';
import { BillHistoryComponent } from './features/bills/bill-history/bill-history.component';
import { PayBillComponent } from './features/bills/pay-bill/pay-bill.component';
import { RegisterComplaintComponent } from './features/complaints/register-complaint/register-complaint.component';
import { ComplaintStatusComponent } from './features/complaints/complaint-status/complaint-status.component';
import { ViewComplaintsComponent } from './features/complaints/view-complaints/view-complaints.component';
import { PaymentConfirmationComponent } from './features/bills/payment-confirmation/payment-confirmation.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'dashboard',
    component: CustomerDashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'bills/view',
    component: ViewBillsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'bills/history',
    component: BillHistoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'bills/pay/:billId',
    component: PayBillComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'complaints/register',
    component: RegisterComplaintComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'complaints/view',
    component: ViewComplaintsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'complaints/status',
    component: ComplaintStatusComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'bills/payment-confirmation',
    component: PaymentConfirmationComponent,
    canActivate: [AuthGuard],
  },
];
