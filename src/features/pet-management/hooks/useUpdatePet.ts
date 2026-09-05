import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import updatePet from "../api/updatePet";
import { PetUpdateRecord } from "../types";

export default function useUpdatePet(petId: string) {
  const { control, reset, handleSubmit } = useForm<PetUpdateRecord>();

  const mutation = useMutation({
    mutationFn: (petData: PetUpdateRecord) => updatePet(petId, petData),
    onSuccess: () => {
      console.log(`${petId} - Pet updated successfully`);
    },
    onError: (error) => {
      console.error(`${petId} - Failed to update pet:`, error);
    },
  });

  return {
    control,
    reset,

    handleSubmit,
    submit: mutation.mutate,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
  };
}
