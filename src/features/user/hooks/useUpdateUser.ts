import { useAuth } from "@/providers/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import updateUserDetails from "../services/updateUserDetails";
import { UpdateUserRecord } from "../types";

export default function useUpdateUser() {
  const { userProfile } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<UpdateUserRecord>({
    defaultValues: {
      first_name: userProfile?.first_name,
      last_name: userProfile?.last_name,
      contact_number: userProfile?.contact_number,
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ user_id, updatedData }: { user_id: string; updatedData: UpdateUserRecord }) =>
      updateUserDetails(user_id, updatedData),
  });

  return {
    control,
    handleSubmit,
    inputHasChanged: isDirty,
    updateMutation,
  };
}
