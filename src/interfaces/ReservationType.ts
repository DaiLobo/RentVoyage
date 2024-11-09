import { PropertyType } from "./PropertyType";

export interface ReservationType {
  id: string;
  userId: string;
  propertyId: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  guests: number;
  userName?: string;
}

export interface ReservationFormType {
  startEndDate: {
    from: Date | null;
    to: Date | null;
  };
  guests: number;
}

export interface ReservationRegisterType {
  propertyId: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  guests: number;
}

export interface ReservationByUserType {
  id: string;
  userId: string;
  propertyId: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  guests: number;
  property: PropertyType;
}
