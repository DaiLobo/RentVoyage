export interface ReservationType {
  id?: string;
  userId?: string;
  propertyId?: string;
  startDate: string;
  endDate: string;
  totalPrice?: number;
  numberGuest: number;
}
