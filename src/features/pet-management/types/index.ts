import { Database } from "@/shared/types/database.types";

export type PetUpdateRecord = Pick<
  Database["public"]["Tables"]["pets"]["Update"],
  "name" | "pet_type" | "breed" | "color" | "description"
>;
