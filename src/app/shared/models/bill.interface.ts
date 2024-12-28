// bill.interface.ts
export interface Bill {
  billId: number;
  consumerId: number;
  dueAmount: number;
  payableAmount: number;
  billDate: Date;
  dueDate: Date;
  status: string;
}
