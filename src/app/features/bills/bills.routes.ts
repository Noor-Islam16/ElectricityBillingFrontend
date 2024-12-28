import { Routes } from '@angular/router';
import { ViewBillsComponent } from './view-bills/view-bills.component';
import { BillHistoryComponent } from './bill-history/bill-history.component';
import { PayBillComponent } from './pay-bill/pay-bill.component';

export const BILLS_ROUTES: Routes = [
  { path: 'view', component: ViewBillsComponent },
  { path: 'history', component: BillHistoryComponent },
  { path: 'pay/:billId', component: PayBillComponent },
];
