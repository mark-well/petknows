import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import updateUserAddress from "../api/updateUserAddress";
import { AddressFormType } from "../types";

export default function useUpdateUserAddress() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<AddressFormType>();

  const updateMutation = useMutation({
    mutationFn: ({ userId, updatedAddress }: { userId: string; updatedAddress: AddressFormType }) =>
      updateUserAddress(userId, updatedAddress),
  });

  return {
    control,
    handleSubmit,
    inputHasChanged: isDirty,
    reset,
    updateMutation,
  };
}
