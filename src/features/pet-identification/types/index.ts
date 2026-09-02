import getIdentifiedPets from "../services/getIdentifiedPets";

export type PetMatch = {
  id: string;
  name: string;
  distance: number;
  confidence: number;
};

export type IdentifyResponse = {
  found: boolean;
  message: string;
  top_matches: PetMatch[] | null;
};

export type Pet = Awaited<ReturnType<typeof getIdentifiedPets>>[number];
export type CombinedPetMatch = Pet & PetMatch;
