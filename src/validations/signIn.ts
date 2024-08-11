"use client";

import { z } from "zod";

export const login = z.object({
  email: z.string().max(50),
  password: z
    .string()
    .min(6, {
      message: "Senha deve conter no mínimo 6 caracteres.",
    })
    .max(20),
});
