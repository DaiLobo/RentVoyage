import { Dispatch, SetStateAction } from "react";

import { PropertyType } from "./PropertyType";

export interface SearchTypes {
  localization: string;
  startDate: string | null;
  endDate: string | null;
  guests?: number;
  minPrice?: number;
  maxPrice?: number;
  setFilteredHits: Dispatch<SetStateAction<PropertyType[]>>;
}

export interface SearchValuesTypes {
  localization: string;
  startEndDate: {
    from: Date | null;
    to: Date | null;
  };
  guests: number;
}
