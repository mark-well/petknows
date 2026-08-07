import { Database } from "@/shared/types/database.types";

export type SelectListType = {
  key: string;
  value: string;
};

export type PetRegistrationForm = {
  petName?: string;
  petSpeciesId?: string;
  ownerId?: string;
  statusId?: string;
  placeOfRegistrationId?: string;
  avatarUrl?: string;
  embedding?: number[];
};

export type RegisterPetForm = {
  petName: string;
  petSpeciesId: string;
  ownerId: string;
  statusId: string;
  placeOfRegistrationId: string;
};

export type PetInsertRecord = Database["public"]["Tables"]["pets"]["Insert"];

export enum PetStatus {
  registered = "registered",
  missing = "missing",
}
