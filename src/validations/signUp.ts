"use client";

import { z } from "zod";

export const register = z.object({
  email: z.string().max(50),
  password: z
    .string()
    .min(6, {
      message: "Senha deve conter no mínimo 6 caracteres.",
    })
    .max(20)
    .refine((value) => /[A-Z]/.test(value), {
      message: "A senha deve ter pelo menos uma letra maiúscula",
    })
    .refine((value) => /[0-9]/.test(value), {
      message: "A senha deve ter pelo menos um número",
    })
    .refine((value) => /[^a-zA-Z0-9]/.test(value), {
      message: "A senha deve ter pelo menos um caractere especial",
    }),
});
