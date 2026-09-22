import getPetVaccinationRecords from "@/features/pet-vaccination/api/getPetVaccinationRecords";
import { useQuery } from "@tanstack/react-query";

export default function useVaccination(petId: string) {
  const { data, isPending } = useQuery({
    queryKey: ["petVaccine", petId],
    queryFn: () => getPetVaccinationRecords(petId!),
    enabled: Boolean(petId),
  });

  return {
    vaccineRecords: data,
    isPending,
  };
}
