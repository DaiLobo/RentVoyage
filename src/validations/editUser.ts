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
      required_error: "Name is required",
      invalid_type_error: "Name must be a string"
    }),
    lastName: z.string().optional(),
    email: z.string().email().max(50),
    profileImage: z
      .any()
      .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported."
      )
      .optional(),
    phone: z.string(),
    birthDate: z.date(),
    address: z.string().optional(),
    gender: z.string().optional()
  });
};
