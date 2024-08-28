import { ClassValue, clsx } from "clsx";
import { setDate } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const updateDatePart = (month: Date, newDay: Date): Date => {
  return setDate(month, newDay.getDate());
};
