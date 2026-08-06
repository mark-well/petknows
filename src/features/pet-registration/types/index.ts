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
