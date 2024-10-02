export interface ReservationType {
  id?: string;
  userId?: string;
  propertyId: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  guests: number;
}

export interface ReservationFormType {
  startEndDate: {
    from: Date | null;
    to: Date | null;
  };
  guests: number;
}
