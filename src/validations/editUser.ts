"use client";

import { useTranslation } from "next-i18next";
import { z } from "zod";

export const useFormEdit = () => {
  const { t } = useTranslation("profile");

  return z.object({
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string"
    }),
    lastName: z.string().optional(),
    email: z.string().email().max(50),
    profileImage: z.string().optional(),
    phone: z.string(),
    birthDate: z.date(),
    address: z.string().optional(),
    gender: z.string().optional()
  });
};
