export interface UCPackage {
  id: string;
  name: string;
  baseUC: number;
  bonusUC: number;
  totalUC: number;
  pricePKR: number;
  badge?: string;
  description: string;
  popular?: boolean;
}

export type PaymentMethodType = 'jazzcash' | 'easypaisa';

export type OrderStatus = 'pending' | 'verified' | 'processing' | 'completed' | 'cancelled';

export interface Order {
  orderId: string;
  pubgPlayerId: string;
  playerNickname?: string;
  packageId: string;
  packageName: string;
  totalUC: number;
  amountPKR: number;
  whatsappNumber: string;
  paymentMethod: PaymentMethodType;
  transactionId: string;
  screenshotUrl?: string;
  createdAt: string;
  status: OrderStatus;
  statusNotes?: string;
}

export interface SupportInquiry {
  id: string;
  name: string;
  whatsapp: string;
  subject: string;
  message: string;
  createdAt: string;
}
