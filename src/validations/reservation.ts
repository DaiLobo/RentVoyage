"use client";

import { useTranslation } from "next-i18next";
import { z } from "zod";

export const useFormReservation = () => {
  const { t } = useTranslation("stays");

  return z.object({
    startEndDate: z
      .object({
        from: z
          .date({ required_error: t("validation.start-date-required") })
          .refine((date) => date !== null, {
            message: t("validation.start-date-required")
          }),

        to: z
          .date({ required_error: t("validation.end-date-required") })
          .refine((date) => date !== null, {
            message: t("validation.end-date-required")
          })
      })
      .refine((data) => data.from < data.to, {
        message: "A data inicial deve ser anterior à data final",
        path: ["to"]
      }),
    guests: z
      .number({ required_error: t("validation.guests-required") })
      .positive({ message: "Escolha um valor" })
  });
};
