import { object, string } from "yup";

export const addressSchema = object({
  name: string().required(),
  surname: string().required(),
  email: string().email().required(),
  phone: string().min(9).max(9).required(),
});
