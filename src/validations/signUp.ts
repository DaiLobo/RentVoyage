"use client";

import { useTranslation } from "next-i18next";
import { z } from "zod";

export const useFormRegister = () => {
  const { t } = useTranslation("register");

  return z.object({
    email: z.string().max(50),
    password: z
      .string()
      .min(6, {
        message: t("errors-field.min")
      })
      .max(20)
      .refine((value) => /[A-Z]/.test(value), {
        message: t("errors-field.noUppercase")
      })
      .refine((value) => /[0-9]/.test(value), {
        message: t("errors-field.number")
      })
      .refine((value) => /[^a-zA-Z0-9]/.test(value), {
        message: t("errors-field.special-caracter")
      })
  });
};
