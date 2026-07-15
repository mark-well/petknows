export type SelectListType = {
  key: string;
  value: string;
};

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
