// export type SignupFormType = {
//   firstName: string;
//   lastName: string;
//   birthDate: Date | null;
//   fullAddress: string;
//   contactNumber: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
// };

import { Database } from "./database.types";

export type SignupFormType = Pick<
  Database["public"]["Tables"]["profiles"]["Insert"],
  | "first_name"
  | "last_name"
  | "birth_date"
  | "sex"
  | "province_id"
  | "city_id"
  | "barangay_id"
  | "email"
  | "contact_number"
> & {
  password: string;
  confirmPassword: string;
};

export type UserSex = Database["public"]["Enums"]["sex"];

export type EmbeddingResponse = {
  embedding: number[];
  model_version: string;
};
