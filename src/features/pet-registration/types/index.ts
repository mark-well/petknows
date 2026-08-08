import { Database } from "@/shared/types/database.types";
import { useRegisterPet } from "../hooks/useRegisterPet";

export type SelectListType = {
  key: string;
  value: string;
};

export type RegisterPetForm = {
  id: string;
  petName: string;
  petType: string;
  ownerId: string;
  statusId: string;
  placeOfRegistrationId: string;
  avatarUrl: string;
  embedding: string;
};

export type PetRegistrationStepProp = {
  registerPet: ReturnType<typeof useRegisterPet>;
};

export type PetInsertRecord = Database["public"]["Tables"]["pets"]["Insert"];

export enum PetStatus {
  registered = "registered",
  missing = "missing",
}
