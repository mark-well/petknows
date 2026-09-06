import { Database } from "@/shared/types/database.types";

export type UserUpdateRecord = Pick<
  Database["public"]["Tables"]["profiles"]["Update"],
  "first_name" | "last_name" | "contact_number"
>;

export type AddressFormType = {
  provinceId: string;
  cityId: string;
  barangayId: string;
};

export type UpdateUserRecord = Pick<
  Database["public"]["Tables"]["profiles"]["Update"],
  "first_name" | "last_name" | "birth_date" | "email" | "contact_number" | "sex"
>;
