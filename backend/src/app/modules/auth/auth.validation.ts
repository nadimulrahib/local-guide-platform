import z from "zod/v3";

export const registerValidation = z.object({
  body: z.object({
    name: z.string().min(2),

    email: z.string().email({
      message: "Please enter a valid email address",
    }),

    password: z.string().min(6),

    role: z.enum(["GUIDE", "TOURIST"]),
  }),
});

export const loginValidation = z.object({
  body: z.object({
    email: z.string().email({
      message: "Please enter a valid email address",
    }),

    password: z.string(),
  }),
});
