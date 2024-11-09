import { useTranslation } from "next-i18next";

const convertFirebaseDateToJSDate = (
  firebaseDate:
    | {
        seconds: number;
        nanoseconds: number;
      }
    | undefined
): Date | undefined => {
  if (firebaseDate) {
    return new Date(firebaseDate.seconds * 1000);
  }
  return undefined;
};

/**
 * Converte to yyyy-mm-dd
 * @param dateString
 * @returns string
 */
function formatDate(dateString: string | Date | null): string {
  if (!dateString) {
    return "";
  }

  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

/**
 * Convert from string to object of date
 * @param dateString
 * @returns
 */
const parseDate = (dateString: string | null) => {
  if (!dateString) return null;
  const [year, month, day] = dateString.split("-");
  return new Date(Number(year), Number(month) - 1, Number(day));
};

const parseTimeStampDate = (date: string | Date) => {
  if (!date) return "";

  const { i18n } = useTranslation();
  const language = i18n.language || "pt-BR";

  return new Date(date).toLocaleDateString(language, {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
};

// Formato da data: dom., 2 de fev. de 2025
function formatLocalizedDate(date: Date | null) {
  if (!date) return "dom., 2 de fev. de 2025";

  const { i18n } = useTranslation("pt-BR");

  return new Intl.DateTimeFormat(i18n.language, {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(new Date(date));
}

const formatDateToBR = (date: Date) => {
  if (!date) return "";

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(date);
};

/**
 * Generate a query to search for date intervals and number guests
 * @param values
 * @param updateGuests
 * @param local
 * @returns
 */
function generateQueryString(
  values: { startDate?: Date | null; endDate?: Date | null },
  updateGuests: number | null,
  local: string,
  minPrice?: number | null,
  maxPrice?: number | null
) {
  const query = new URLSearchParams({
    localization: local,
    checkin: values?.startDate ? formatDate(`${values.startDate}`) : "",
    checkout: values?.endDate ? formatDate(`${values.endDate}`) : "",
    guests: updateGuests ? updateGuests.toString() : "",
    minPrice: minPrice ? minPrice.toString() : "",
    maxPrice: maxPrice ? maxPrice.toString() : ""
  });

  return query.toString();
}

export {
  convertFirebaseDateToJSDate,
  formatDate,
  parseDate,
  parseTimeStampDate,
  formatLocalizedDate,
  formatDateToBR,
  generateQueryString
};
