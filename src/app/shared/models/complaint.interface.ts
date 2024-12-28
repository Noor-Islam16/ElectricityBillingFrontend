// complaint.interface.ts
export interface Complaint {
  complaintId: number;
  consumerId: number;
  category: string;
  description: string;
  status: string;
  contactPerson: string;
  complaintDate: Date;
}
