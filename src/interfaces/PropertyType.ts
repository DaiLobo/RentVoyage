import { PropertyTypeEnum } from "@/utils/list";

export interface PropertyType {
  uid?: string;
  uidUser?: string;
  name: string;
  address: string;
  propertyType: string;
  description?: string;
  images?: string[];
}
