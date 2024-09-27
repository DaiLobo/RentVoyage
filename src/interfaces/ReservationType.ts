export interface ReservationType {
  id?: string;
  userId?: string;
  propertyId?: string;
  startDate?: Date | null;
  endDate?: Date | null;
  startEndDate: {
    from: Date | null;
    to: Date | null;
  };
  totalPrice?: number;
  guests: number;
}

export interface ReservationFormType {
  startEndDate: {
    from: Date | null;
    to: Date | null;
  };
  guests: number;
}
