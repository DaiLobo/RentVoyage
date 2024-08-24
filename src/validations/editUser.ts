"use client";

import { useTranslation } from "next-i18next";
import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp"
];

export const useFormEdit = () => {
  const { t } = useTranslation("profile");

  return z.object({
    name: z.string({
      required_error: t("validation.name"),
      invalid_type_error: "Name must be a string"
    }),
    lastName: z.string().optional(),
    email: z.string().email().max(50),
    profileImage: z
      .any()
      .refine(
        (file) => file?.size <= MAX_FILE_SIZE,
        `${t("validation.max-size-img")}`
      )
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        t("validation.format-accept-img")
      )
      .optional(),
    phone: z.string(),
    birthDate: z.date(),
    address: z.string().optional(),
    gender: z.string().optional()
  });
};
