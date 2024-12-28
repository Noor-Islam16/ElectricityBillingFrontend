// payment-request-dto.interface.ts
export interface PaymentRequestDTO {
  billId: number;
  cardNumber: string;
  cardHolderName: string;
  expiryDate: string;
  cvv: string;
  amount: number;
}
