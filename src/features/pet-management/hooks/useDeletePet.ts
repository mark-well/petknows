import { useMutation } from "@tanstack/react-query";
import deletePets from "../api/deletePets";

export default function useDeletePet() {
  return useMutation({
    mutationFn: (petIds: Set<string>) => deletePets(petIds),
  });
}
