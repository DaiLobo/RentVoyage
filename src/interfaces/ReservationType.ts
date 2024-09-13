export interface ReservationType {
  userId?: string;
  propertyId?: string;
  startDate: string;
  endDate: string;
  totalPrice?: number;
  numberGuest: number;
}
