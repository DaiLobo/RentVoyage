export interface SearchTypes {
  localization: string;
  startDate: string | null;
  endDate: string | null;
  guests?: number;
}

export interface SearchValuesTypes {
  localization: string;
  startDate: Date | null;
  endDate: Date | null;
  startEndDate: {
    from: Date | null;
    to: Date | null;
  };
  guests?: number;
}
