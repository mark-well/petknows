import { EmbeddingResponse } from "@/shared/types";
import { Database } from "@/shared/types/database.types";
import { useRegisterPet } from "../hooks/useRegisterPet";
import { uploadPetImage } from "../services/uploadPetImage";

export type SelectListType = {
  key: string;
  value: string;
};

export type RegisterPetForm = {
  id: string;
  petName: string;
  petType: string;
  breed: string;
  color: string;
  description: string;
  user_id: string;
  statusId: string;
  placeOfRegistrationId: string;
  avatarUrl: string;
  embedding: string;
};

export type PetRegistrationStepProp = {
  registerPet: ReturnType<typeof useRegisterPet>;
};

export type PetInsertRecord = Database["public"]["Tables"]["pets"]["Insert"];
export type PetImageInsertRecord = Database["public"]["Tables"]["pet_images"]["Insert"];

export enum PetStatus {
  registered = "registered",
  missing = "missing",
}

export type UploadedImages = {
  uploadedImage: Awaited<ReturnType<typeof uploadPetImage>>;
  embedding: EmbeddingResponse;
};
