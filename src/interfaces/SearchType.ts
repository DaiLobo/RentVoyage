export interface SearchTypes {
  localization: string;
  startDate: string | null;
  endDate: string | null;
  guests?: number;
}

export interface SearchValuesTypes {
  localization: string;
  startEndDate: {
    from: Date | null;
    to: Date | null;
  };
  guests: number;
}
