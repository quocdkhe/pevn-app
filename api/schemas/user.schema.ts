import z from "zod";

export const userRegistrationSchema = z
  .object({
    email: z.email(),
    name: z.string().min(6),
    password: z.string().min(5),
  })
  .strict();

export const userLoginSchema = z
  .object({
    email: z.email(),
    password: z.string().min(5),
  })
  .strict();

export const userUpdateSchema = z
  .object({
    name: z.string().min(6),
    password: z.string().min(5).optional(),
  })
  .strict();

export type UserUpdate = z.infer<typeof userUpdateSchema>;
export type UserRegistration = z.infer<typeof userRegistrationSchema>;
export type UserLogin = z.infer<typeof userLoginSchema>;
