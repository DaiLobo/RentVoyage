import { PropertyTypeEnum } from "@/utils/list";

import { ReservationType } from "./ReservationType";

export interface PropertyType {
  id?: string;
  objectID?: string;
  uidUser?: string;
  name: string;
  address: string;
  propertyType: keyof typeof PropertyTypeEnum;
  description?: string;
  images?: File[] | null;
  price: number;
  capacity: number;
  reservations?: ReservationType[];
}
