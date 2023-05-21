import { object, string, TypeOf } from "zod";

export const loginSchema = {
  body: object({
    email: string({
      required_error: "email is required",
    }).email("Not a valid email"),
    password: string({
      required_error: "password is requir ed",
    })
      .min(6, "password must be at least 6 characters"),
  }), 
};

export type LoginBody = TypeOf<typeof loginSchema.body>;