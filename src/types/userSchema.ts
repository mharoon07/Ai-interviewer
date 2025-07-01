import { z } from "zod";
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
export const passwordSchema = z
  .string()
  .regex(
    passwordRegex,
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)"
  )
  .min(8, "Password must be at least 8 characters long");
export const userSchema = z
  .object({
    email: z.string().email("Invalid email address").trim(),
    password: passwordSchema,
    confirmpassword: z.string(),
    role: z.string(),
    name: z.string().min(3, "Atleast 3 letter name"),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords do not match",
    path: ["confirmpasword"],
  });
export type UserSchema = z.infer<typeof userSchema>;
