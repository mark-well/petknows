import { Database } from "@/shared/types/database.types";

export type PetUpdateRecord = Pick<
  Database["public"]["Tables"]["pets"]["Update"],
  "name" | "pet_type" | "breed" | "color" | "description" | "status"
>;

export type PetStatues = Database["public"]["Enums"]["pet_status"];
