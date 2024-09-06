"use client";

import { useTranslation } from "next-i18next";
import { z } from "zod";

export const useRegisterProperty = () => {
  const { t } = useTranslation("property");

  return z.object({
    name: z.string({
      required_error: t("validation.name"),
      invalid_type_error: "Name must be a string"
    }),
    address: z.string(),
    propertyType: z.string(),
    description: z.string(),
    // images: z.array(z.instanceof(File))
    price: z.preprocess(
      (val) => Number(val),
      z.number().positive({
        message: t("validation.number")
      })
    ),
    capacity: z.preprocess(
      (val) => Number(val),
      z.number().positive({
        message: t("validation.number")
      })
    )
  });
};
