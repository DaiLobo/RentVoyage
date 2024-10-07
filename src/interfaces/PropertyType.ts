import { ReservationType } from "./ReservationType";

export interface PropertyType {
  id?: string;
  objectID?: string;
  uidUser?: string;
  name: string;
  address: string;
  propertyType: string;
  description?: string;
  images?: File[] | null;
  price: number;
  capacity: number;
  reservations?: ReservationType[];
}
