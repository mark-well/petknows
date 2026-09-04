export type SignupFormType = {
  firstName: string;
  lastName: string;
  birthDate: Date | null;
  fullAddress: string;
  contactNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type EmbeddingResponse = {
  embedding: number[];
  model_version: string;
};
